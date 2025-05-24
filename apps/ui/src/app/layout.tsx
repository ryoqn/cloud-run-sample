import { Sidebar } from '@/components/layout/Sidebar'
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
          <Sidebar>{children}</Sidebar>
        </Provider>
      </body>
    </html>
  )
}
