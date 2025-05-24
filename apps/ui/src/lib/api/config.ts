import { auth } from '@/lib/firebase/config'

/**
 * API接続用の共通設定
 * 環境に応じてAPIのベースURLを切り替える
 */

// 環境に応じたAPIのベースURLを取得
export const getApiBaseUrl = () => {
  // 次の条件のいずれかに当てはまる場合は開発環境とみなす
  // 1. NODE_ENVがdevelopment
  // 2. ホスト名がlocalhostを含む
  // 3. window.location.hostname（クライアント側でのみ有効）がlocalhostを含む
  if (
    process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname.includes('127.0.0.1')))
  ) {
    // 開発環境またはローカルエミュレータ環境ではlocalhost:8080に直接アクセス
    return 'http://localhost:8080'
  }

  // 本番環境では相対パスを使用（Firebaseホスティングのリライトルールが機能）
  return ''
}

/**
 * 認証トークンを付与してAPIリクエストを行うユーティリティ関数
 * Firebase Authのトークンをヘッダーに付与
 */
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // 現在のユーザーを取得
  const user = auth.currentUser

  // デフォルトのヘッダー
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  // ユーザーが認証済みの場合、トークンをヘッダーに追加
  if (user) {
    try {
      const token = await user.getIdToken()
      headers['Authorization'] = `Bearer ${token}`
    } catch (error) {
      console.error('Error getting token:', error)
    }
  }

  // リクエストオプションを合成
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  }

  return fetch(url, fetchOptions)
}
