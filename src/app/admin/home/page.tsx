// pages/Home.tsx
'use client'

import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'
import { Product } from '@/components/Table/Product'
import { AppSidebar } from '@/components/SideBar/SideBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from '@/components/Table/User'

import { useState } from 'react'
import { TableDemo } from '@/components/Table/Table'

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('프로덕트')

  return (
    <div className="flex w-screen">
      <AppSidebar onSelect={setSelectedItem} />
      <div className="flex w-full flex-col gap-7 px-6 py-3">
        <BreadcrumbDemo selectedItem={selectedItem} />
        <div className="flex">
          <h1 className="flex-1 text-[24px] font-semibold">{selectedItem}</h1>
          <Button className="w-40 bg-blue-500 px-3 hover:bg-blue-400">
            <p className="text-sm">추가하기</p>
          </Button>
        </div>
        <Input type="text" placeholder="ID 검색" className="w-96" />
        {/* {selectedItem === '프로덕트' && <Product />}
        {selectedItem === '사용자' && <User />} */}
        <TableDemo selectedItem={selectedItem} />
      </div>
    </div>
  )
}
