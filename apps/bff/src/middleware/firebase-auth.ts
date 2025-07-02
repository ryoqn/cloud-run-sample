import { Request, Response, NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'
import { DecodedIdToken } from 'firebase-admin/auth'

// カスタムRequestインターフェース
export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken
  uid?: string
}

// Firebase Admin Auth エラーコードのマッピング
const AUTH_ERROR_CODES = {
  'auth/id-token-expired': 'Token expired',
  'auth/id-token-revoked': 'Token revoked',
  'auth/invalid-id-token': 'Invalid token',
  'auth/user-disabled': 'User disabled',
  'auth/user-not-found': 'User not found',
  'auth/argument-error': 'Invalid token format',
} as const

/**
 * Firebase認証エラーを適切なHTTPレスポンスに変換
 */
const handleAuthError = (error: any, res: Response): void => {
  const errorCode = error?.code
  const errorMessage =
    AUTH_ERROR_CODES[errorCode as keyof typeof AUTH_ERROR_CODES]

  console.error('Authentication error:', {
    code: errorCode,
    message: error?.message,
    stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
  })

  if (errorMessage) {
    const statusCode =
      errorCode === 'auth/user-disabled' || errorCode === 'auth/user-not-found'
        ? 403
        : 401
    res.status(statusCode).json({
      error: errorMessage,
      message: getErrorMessage(errorCode),
      code: errorCode,
    })
  } else {
    res.status(401).json({
      error: 'Authentication failed',
      message: 'Failed to authenticate request',
      code: 'auth/unknown-error',
    })
  }
}

/**
 * エラーコードに対応するユーザー向けメッセージを取得
 */
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/id-token-expired':
      return 'Authentication token has expired. Please sign in again.'
    case 'auth/id-token-revoked':
      return 'Authentication token has been revoked. Please sign in again.'
    case 'auth/invalid-id-token':
      return 'Invalid authentication token provided.'
    case 'auth/user-disabled':
      return 'User account has been disabled.'
    case 'auth/user-not-found':
      return 'User account not found.'
    case 'auth/argument-error':
      return 'Invalid token format provided.'
    default:
      return 'Authentication failed. Please try again.'
  }
}

/**
 * Authorizationヘッダーからトークンを抽出
 */
const extractToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
    return null
  }

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7) // 'Bearer '.length = 7
    return token.trim() || null
  }

  return null
}

/**
 * Firebase認証トークンを検証するミドルウェア
 * すべてのパスで認証が必要
 */
export const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Authorizationヘッダーからトークンを取得
    const token = extractToken(req.headers.authorization)

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No authentication token provided',
        code: 'auth/no-token',
      })
      return
    }

    // トークンを検証
    const decodedToken = await getAuth().verifyIdToken(token)

    // リクエストオブジェクトにユーザー情報を追加
    req.user = decodedToken
    req.uid = decodedToken.uid

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `✅ Authenticated user: ${decodedToken.uid} (${decodedToken.email})`,
      )
    }

    next()
  } catch (error) {
    handleAuthError(error, res)
  }
}

/**
 * 認証設定をログ出力（デバッグ用）
 */
export const logAuthConfig = (): void => {
  console.log('🔐 Authentication Configuration:')
  console.log('🔒 ALL paths require Firebase authentication')
  console.log(
    '⚠️ BFF is deployed with --allow-unauthenticated (public internet access)',
  )
  console.log('✅ Complete protection: Firebase auth required for any access')
  console.log('🌍 Environment:', process.env.NODE_ENV || 'development')
}
