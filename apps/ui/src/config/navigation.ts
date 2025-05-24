// src/config/navigation.ts
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { AiFillProfile } from 'react-icons/ai'
import { BiSolidBolt } from 'react-icons/bi'

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
}

export const sidebarLinks: Array<LinkItemProps> = [
  { name: 'ホーム', icon: FiHome, href: '/home' },
  { name: 'サインイン', icon: FiSettings, href: '/signin' },
  { name: 'サンプル', icon: BiSolidBolt, href: '/sample' },
]
