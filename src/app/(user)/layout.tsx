import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GDGLogo from '../../../public/images/GDG_Logo.png'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-50">
      <div className="min-h-screen w-[600px] bg-white">
        <Link href="/product">
          <header className="fixed flex bg-white px-6 py-4">
            <Image src={GDGLogo} alt="GDG 로고 이미지" width={46} height={27} />
          </header>
        </Link>
        <div className="mt-16">{children}</div>
      </div>
    </div>
  )
}

export default UserLayout
