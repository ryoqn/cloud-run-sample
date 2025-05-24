'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts'
import { Center, Spinner, Box } from '@chakra-ui/react'

export default function RootPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // 認証済みユーザーはホームページにリダイレクト
        router.replace('/home')
      } else {
        // 未認証ユーザーはサインインページにリダイレクト
        router.replace('/signin')
      }
    }
  }, [user, loading, router])

  return (
    <Center height="100vh">
      <Box textAlign="center">
        <Spinner size="xl" />
        <Box mt={4}>
          {loading ? 'アプリケーションを起動中...' : 'ページを移動中...'}
        </Box>
      </Box>
    </Center>
  )
}