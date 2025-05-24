'use client'

import { Button } from '@/components/ui/button'
import { RiGoogleFill } from 'react-icons/ri'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { Stack } from '@chakra-ui/react/stack'

export const GoogleSignInForm = () => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Error signing in with Google:', error)
      alert('Google サインイン中にエラーが発生しました。')
    }
  }

  return (
    <Stack gap="4" align="flex-start" maxW="sm">
      <Button onClick={handleSignIn} colorPalette="teal" type="submit">
        <RiGoogleFill /> Googleアカウントでサインイン
      </Button>
    </Stack>
  )
}
