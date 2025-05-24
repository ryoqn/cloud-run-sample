'use client'

import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import { GoogleSignInForm } from '@/components/features/auth/GoogleSignIn/GoogleSignIn'
import { useEffect } from 'react'
import { handleRedirectResult } from '@/lib/firebase/auth'
import { redirect } from 'next/navigation'

export default function SignupPage() {
  useEffect(() => {
    const handleAuth = async () => {
      const user = await handleRedirectResult()
      if (user) {
        redirect('/home')
      } else {
        console.log('No user signed in')
      }
    }
    handleAuth()
  }, [])
  return (
    <Container
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" maxWidth="400px">
        <VStack align="stretch">
          <Heading size="lg">Sign In</Heading>
          <GoogleSignInForm />
        </VStack>
      </Box>
    </Container>
  )
}
