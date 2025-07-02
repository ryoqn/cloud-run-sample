'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Input,
  Button,
  Link,
  Flex
} from '@chakra-ui/react'
import { RiGoogleFill, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts'

interface FormData {
  email: string
  password: string
}

export const UnifiedAuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn, signUp, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      await signInWithGoogle()
    } catch (error: any) {
      setError('Googleサインインに失敗しました。')
      console.error('Google sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError('')

      if (isSignUp) {
        await signUp(data.email, data.password)
      } else {
        await signIn(data.email, data.password)
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('このメールアドレスは登録されていません。')
          break
        case 'auth/wrong-password':
          setError('パスワードが正しくありません。')
          break
        case 'auth/email-already-in-use':
          setError('このメールアドレスは既に使用されています。')
          break
        case 'auth/weak-password':
          setError('パスワードは6文字以上で設定してください。')
          break
        case 'auth/invalid-email':
          setError('有効なメールアドレスを入力してください。')
          break
        case 'auth/invalid-credential':
          setError('メールアドレスまたはパスワードが正しくありません。')
          break
        default:
          setError(isSignUp ? 'アカウント作成に失敗しました。' : 'サインインに失敗しました。')
      }
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    reset()
  }

  return (
    <Container
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={8}
    >
      <Box 
        width="100%" 
        maxWidth="400px"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.200"
      >
        <VStack align="stretch" gap={6}>
          <VStack gap={2}>
            <Heading 
              size="lg" 
              textAlign="center"
            >
              {isSignUp ? 'アカウント作成' : 'サインイン'}
            </Heading>
            <Text 
              textAlign="center" 
              fontSize="md"
            >
              {isSignUp 
                ? 'アカウントを作成してサービスを利用開始' 
                : 'アカウントにサインインしてください'
              }
            </Text>
          </VStack>

          {error && (
            <Box
              bg="red.50"
              border="1px solid"
              borderColor="red.300"
              borderRadius="md"
              p={4}
            >
              <Text color="red.700" fontSize="sm" fontWeight="medium">
                {error}
              </Text>
            </Box>
          )}

          <Button
            onClick={handleGoogleSignIn}
            colorPalette="red"
            variant="outline"
            disabled={loading}
            size="lg"
          >
            <RiGoogleFill />
            Googleアカウントで{isSignUp ? '登録' : 'サインイン'}
          </Button>

          <Flex align="center" gap={4}>
            <Box flex={1} height="1px" bg="gray.300" />
            <Text 
              fontSize="sm" 
              whiteSpace="nowrap" 
              fontWeight="medium"
            >
              または
            </Text>
            <Box flex={1} height="1px" bg="gray.300" />
          </Flex>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack align="stretch" gap={4}>
              <Box>
                <Input
                  {...register('email', {
                    required: 'メールアドレスを入力してください',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '有効なメールアドレスを入力してください'
                    }
                  })}
                  type="email"
                  placeholder="メールアドレス"
                  size="lg"
                />
                {errors.email && (
                  <Text color="red.600" fontSize="sm" mt={1} fontWeight="medium">
                    {errors.email.message}
                  </Text>
                )}
              </Box>

              <Box>
                <Box position="relative">
                  <Input
                    {...register('password', {
                      required: 'パスワードを入力してください',
                      minLength: {
                        value: 6,
                        message: 'パスワードは6文字以上で入力してください'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="パスワード"
                    size="lg"
                    pr="12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    position="absolute"
                    right="1"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </Button>
                </Box>
                {errors.password && (
                  <Text color="red.600" fontSize="sm" mt={1} fontWeight="medium">
                    {errors.password.message}
                  </Text>
                )}
              </Box>

              <Button
                type="submit"
                colorPalette="teal"
                size="lg"
                disabled={loading}
              >
                {isSignUp ? 'アカウント作成' : 'サインイン'}
              </Button>
            </VStack>
          </form>

          <Box textAlign="center">
            <Text 
              mb={2} 
              fontSize="sm"
            >
              {isSignUp ? 'すでにアカウントをお持ちですか？' : 'アカウントをお持ちでない方は'}
            </Text>
            <Link
              color="teal.600"
              fontWeight="medium"
              onClick={toggleMode}
              cursor="pointer"
            >
              {isSignUp ? 'サインインする' : 'アカウントを作成する'}
            </Link>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}