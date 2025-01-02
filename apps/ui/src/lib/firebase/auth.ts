import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { auth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider)
  } catch (error) {
    console.error('Error signing in with Google', error)
    throw error
  }
}

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth)
    return result?.user || null
  } catch (error) {
    console.error('Error handling redirect:', error)
    throw error
  }
}

export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out', error)
    throw error
  }
}
