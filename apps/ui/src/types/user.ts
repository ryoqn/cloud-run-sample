type Provider = 'google' | 'email'

export type User = {
  id: string // firebase uid
  email: string
  displayName: string
  provider: Provider
  createdAt: Date
  updatedAt: Date
}
