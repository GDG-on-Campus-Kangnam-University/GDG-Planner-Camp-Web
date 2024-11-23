'use client'

import { BuyModal } from '@/components/Modal/BuyModal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="flex h-full w-full max-w-[600px] flex-col justify-center gap-2 bg-white px-3">
        <Image
          src="/image/gdg_icon.svg"
          alt="empty"
          width={600}
          height={633}
          className="w-full"
        />
        <div className="flex border-b border-b-slate-100">
          <p className="px-4 py-2 text-[24px]">팀 이름</p>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <p className="text-[36px] font-bold">프로덕트 이름입니다.</p>
          <p className="text-[24px] font-bold">문제 정의 및 필요성</p>
          <p className="text-[16px] font-bold">
            상품 설명입니다.상품 설명입니다.상품 설명입니다.상품 설명입니다.
          </p>
          <hr className="border-slate-100" />
          <p className="text-[24px] font-bold">솔루션 소개</p>
          <p className="text-[16px] font-bold">
            상품 설명입니다.상품 설명입니다.상품 설명입니다.상품 설명입니다.
          </p>
          <hr className="border-slate-100" />
          <p className="text-[24px] font-bold">핵심 기능 및 특징</p>
          <p className="text-[16px] font-bold">
            상품 설명입니다.상품 설명입니다.상품 설명입니다.상품 설명입니다.
          </p>
        </div>
        <div className="bottom-1 flex items-start px-6 py-3">
          <Button
            type="submit"
            onClick={openModal}
            className="w-full bg-blue-500 hover:bg-blue-400"
          >
            제품 구매하기
          </Button>
        </div>
      </div>
      {isModalOpen && <BuyModal closeModal={closeModal} />}
    </div>
  )
}
