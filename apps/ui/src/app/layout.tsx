import { AuthProvider } from '@/contexts'
import { AuthLayoutManager } from '@/components/auth/AuthLayoutManager'
import { Provider } from '@/components/ui/provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <AuthLayoutManager>
              {children}
            </AuthLayoutManager>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}