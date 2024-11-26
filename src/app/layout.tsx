import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistNotoSansKR = localFont({
  src: '../../public/fonts/NotoSansKR.ttf',
  variable: '--font-geist-NotoSansKR',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'IT PM Camp: On Kangnam',
  description:
    '학생들이 보다 쉽게 기획을 배우고 실제 프로덕트 매니징에 대한 깊은 이해를 가지도록 제품 관리부터 시장검증까지 돕습니다.',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={`${geistNotoSansKR.variable} h-screen antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
