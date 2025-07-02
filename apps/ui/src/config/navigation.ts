// src/config/navigation.ts
import {
  FiHome,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { BiSolidBolt } from 'react-icons/bi'

export interface LinkItemProps {
  name: string
  icon: IconType
  href: string
  requiresAuth?: boolean
}

// パブリックリンク
export const publicLinks: LinkItemProps[] = [
  { name: 'ホーム', icon: FiHome, href: '/home' },
]

// ゲストリンク（未認証ユーザー向け）
export const guestLinks: LinkItemProps[] = []

// 認証済みユーザー向けのリンク
export const authenticatedLinks: LinkItemProps[] = [
  { name: 'サンプル', icon: BiSolidBolt, href: '/sample', requiresAuth: true },
]

// 認証状態に応じたリンクを取得
export const getNavigationLinks = (isAuthenticated: boolean): LinkItemProps[] => {
  return [
    ...publicLinks,
    ...(isAuthenticated ? authenticatedLinks : guestLinks)
  ]
}