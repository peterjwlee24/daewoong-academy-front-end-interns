import './globals.css'
import Loading from '@/components/Loading'
import NavBar from '../components/NavBar/NavBar'
import { Roboto } from 'next/font/google'
import Providers from '@/lib/providers'
import { Suspense } from 'react'
import AuthProviders from '@/components/Auth/AuthProviders'
import ErrorBoundary from '@/components/Error/ErrorBoundary'

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Daewoong Academy',
  description:
    'Daewoong Academy is a platform to teach students with high quality free education.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Suspense
            fallback={
              <Loading loadingDescription="Loading....If this takes longer than expected, please refresh the webpage on the top left corner!" />
            }
          >
            <AuthProviders>
              <NavBar
                zIndex={children?.props?.childProp?.segment === 'subject' ? 9 : 10}
              />
              <ErrorBoundary>{children}</ErrorBoundary>
            </AuthProviders>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
