'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts'
import { UnifiedAuthForm } from '@/components/auth/UnifiedAuthForm'
import { Center, Spinner, Box } from '@chakra-ui/react'

export default function SignInPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/home')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" />
          <Box mt={4}>認証状態を確認中...</Box>
        </Box>
      </Center>
    )
  }

  // 認証済みの場合（リダイレクト中）
  if (user) {
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" />
          <Box mt={4}>ホームページに移動中...</Box>
        </Box>
      </Center>
    )
  }

  return <UnifiedAuthForm />
}