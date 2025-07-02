'use client'

import { useAuth } from '@/contexts'
import { Box, Container, Heading, VStack, Text, Button } from '@chakra-ui/react'

export default function HomePage() {
  const { user, loading, logout } = useAuth()

  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('🏠 HomePage: Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>読み込み中...</Text>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>認証が必要です</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack gap={6} align="stretch">
        <Heading size="lg">ホームページ</Heading>
        
        <Box 
          p={6} 
          border="1px solid" 
          borderColor="gray.200"
          borderRadius="lg"
          bg="white"
          boxShadow="sm"
        >
          <VStack align="start" gap={4}>
            <Heading size="md">プロフィール情報</Heading>
            <VStack align="start" gap={2} width="100%">
              <Text fontSize="md">
                <Text as="span" fontWeight="bold">表示名:</Text>{' '}
                <Text as="span">{user.displayName || '未設定'}</Text>
              </Text>
              <Text fontSize="md">
                <Text as="span" fontWeight="bold">メールアドレス:</Text>{' '}
                <Text as="span">{user.email}</Text>
              </Text>
              <Text fontSize="md">
                <Text as="span" fontWeight="bold">電話番号:</Text>{' '}
                <Text as="span">{user.phoneNumber || '未設定'}</Text>
              </Text>
              <Text fontSize="md">
                <Text as="span" fontWeight="bold">認証状態:</Text>{' '}
                <Text 
                  as="span" 
                  color={user.emailVerified ? 'green.600' : 'orange.600'}
                  fontWeight="medium"
                >
                  {user.emailVerified ? '認証済み' : '未認証'}
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Box>

        <Box>
          <Text 
            mb={4} 
            fontSize="lg" 
            fontWeight="medium"
          >
            認証に成功しました！🎉
          </Text>
          <Button 
            colorPalette="red" 
            onClick={handleSignOut}
            size="lg"
          >
            サインアウト
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}