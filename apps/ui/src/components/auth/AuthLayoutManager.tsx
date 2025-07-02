'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts'
import { Sidebar } from '@/components/layout/Sidebar'
import { Box, Spinner, Center, Text } from '@chakra-ui/react'

interface AuthLayoutManagerProps {
  children: React.ReactNode
}

// 認証不要のパブリックルート
const PUBLIC_ROUTES = ['/signin', '/signup']

// サイドバー不要のルート（認証済みでも）
const NO_SIDEBAR_ROUTES = ['/signin', '/signup']

// パスを正規化する関数（末尾のスラッシュを除去）
const normalizePath = (path: string): string => {
  return path === '/' ? '/' : path.replace(/\/$/, '')
}

export const AuthLayoutManager: React.FC<AuthLayoutManagerProps> = ({ 
  children 
}) => {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // パスを正規化
  const normalizedPath = normalizePath(pathname)

  // useEffectをコンポーネントの最上位で呼び出し（React Hooksのルール遵守）
  useEffect(() => {
    // 認証が必要なページで未認証の場合のリダイレクト処理
    if (!loading && !user && !PUBLIC_ROUTES.includes(normalizedPath)) {
      router.replace('/signin')
    }
  }, [user, loading, normalizedPath, router])

  // 初期化中はローディング表示
  if (loading) {
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" />
          <Box mt={4}>アプリケーションを起動中...</Box>
        </Box>
      </Center>
    )
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(normalizedPath)
  const needsSidebar = user && !NO_SIDEBAR_ROUTES.includes(normalizedPath)

  // 認証不要なページの場合
  if (isPublicRoute) {
    return <>{children}</>
  }

  // 認証が必要だが未認証の場合（リダイレクト処理はuseEffectで実行）
  if (!user) {
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" />
          <Box mt={4}>サインインページに移動中...</Box>
        </Box>
      </Center>
    )
  }

  // 認証済みユーザー - サイドバーが必要な場合
  if (needsSidebar) {
    return <Sidebar>{children}</Sidebar>
  }

  // 認証済みユーザー - サイドバー不要な場合
  return <>{children}</>
}