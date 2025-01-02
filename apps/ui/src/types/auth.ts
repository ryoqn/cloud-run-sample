import type { User } from './user'

export type AuthState = {
  user: User | null
  loading: boolean
  error: Error | null
}
