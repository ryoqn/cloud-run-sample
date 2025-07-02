import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { ClientRequest, IncomingMessage } from 'http'
import { initializeApp, cert } from 'firebase-admin/app'
import {
  verifyFirebaseToken,
  AuthenticatedRequest,
  logAuthConfig,
} from './middleware/firebase-auth'
import { attachGcpToken, AuthenticatedRequestWithToken } from './middleware/gcp'

const app = express()
const port = process.env.PORT || 8080
export const apiServerUrl =
  process.env.API_SERVER_URL || 'http://localhost:8000'

// Firebase Admin SDKの初期化
const initializeFirebaseAdmin = () => {
  try {
    if (process.env.FIREBASE_ADMIN_CREDENTIAL) {
      const credential = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL)
      initializeApp({
        credential: cert(credential),
      })
    } else {
      initializeApp()
      console.log('✅ Firebase Admin SDK initialized with default credentials.')
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error)
    process.exit(1)
  }
}

initializeFirebaseAdmin()

// 認証設定をログ出力（開発環境のみ）
if (process.env.NODE_ENV === 'development') {
  logAuthConfig()
}

// JSON parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// 環境変数に基づいてCORSミドルウェアを追加（開発環境のみ）
const isDevEnvironment =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

if (isDevEnvironment) {
  console.log('🌐 開発環境用のCORS設定を適用します')
  app.use(
    cors({
      origin: '*', // すべてのオリジンを許可
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  )
} else {
  console.log('🔒 本番環境: CORS設定を適用しません')
}

// 認証ミドルウェアを適用
app.use(verifyFirebaseToken)

// GCPトークンをリクエストに追加するミドルウェアを適用
app.use('/api/', attachGcpToken)

// APIサーバーへのプロキシ設定 - /api/パスのリクエストを転送
app.use(
  '/api/',
  createProxyMiddleware({
    target: apiServerUrl,
    pathRewrite: {
      '^/(.*)': '/api/$1',
    },
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: AuthenticatedRequestWithToken,
        res: express.Response,
      ) => {
        // Google Cloudの認証トークンをヘッダーに追加
        if (req.gcpToken) {
          proxyReq.setHeader('Authorization', `Bearer ${req.gcpToken}`)
        }

        // 認証されたユーザー情報をヘッダーに追加
        if (req.uid) {
          proxyReq.setHeader('X-User-ID', req.uid)
        }

        if (req.user) {
          proxyReq.setHeader('X-User-Email', req.user.email || '')
          proxyReq.setHeader('X-User-Name', req.user.name || '')

          // 管理者権限の情報も追加
          if (req.user.admin) {
            proxyReq.setHeader('X-User-Admin', 'true')
          }
        }

        // リクエストログ
        // if (process.env.NODE_ENV === "development") {
        console.log(
          `🔄 [${process.env.NODE_ENV || 'local'}] Proxying: ${req.method} ${req.originalUrl}`,
        )
        console.log(
          `📤 Target URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`,
        )
        console.log(
          `🔄 Proxying ${req.method} ${req.path} for user: ${req.uid || 'anonymous'}`,
        )
        // }
      },
      proxyRes: (
        proxyRes: IncomingMessage,
        req: AuthenticatedRequest,
        _: express.Response,
      ) => {
        // レスポンスログ
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `📤 Response ${proxyRes.statusCode} for ${req.method} ${req.path}`,
          )
        }
      },
      error: (err, req, res) => {
        console.error('🚨 Proxy error:', {
          error: err.message,
          url: req.url,
          method: req.method,
        })

        if (!('headersSent' in res)) {
          // res is net.Socket
          // Assumed not to come to this branch because WebSocket is not used.
          res.end()
          return
        }

        if (res.headersSent) {
          // When headers are already sent, destroy socket and end response to avoid ERR_HTTP_HEADERS_SENT.
          res.socket?.destroy()
          res.end()
        } else {
          // When headers are not sent, respond with 502 Bad Gateway.
          res.writeHead(502, {
            'Content-Type': 'text/plain',
          })
          res.end('Bad Gateway')
        }
      },
    },
  }),
)

// 404エラーハンドラ（最後に配置）
app.use('*', (req, res) => {
  console.log(`🔍 404 Not Found: ${req.originalUrl}`)
  res.status(404).json({
    error: 'Not Found',
    message:
      'The requested resource could not be found. Please check the URL and try again.',
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  })
})

// グローバルエラーハンドラ
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error('🚨 Unhandled error:', {
      error: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
    })

    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      })
    }
  },
)

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 BFF Server running on port ${port}`)
  console.log(`🔄 Proxying API requests to: ${apiServerUrl}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully')
  process.exit(0)
})
