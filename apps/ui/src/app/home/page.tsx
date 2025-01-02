'use client'

import { useAuth } from '@/lib/firebase/useAuth'
import React from 'react'

export default function AboutPage() {
  const auth = useAuth()
  auth.user?.displayName
  return !auth.loading ? (
    <div>
      <h1>Your Profile</h1>
      <p>{auth.user?.displayName}</p>
      <p>{auth.user?.email}</p>
      <p>{auth.user?.phoneNumber}</p>
    </div>
  ) : (
    <div>
      <h1>Now Loading...</h1>
    </div>
  )
}
