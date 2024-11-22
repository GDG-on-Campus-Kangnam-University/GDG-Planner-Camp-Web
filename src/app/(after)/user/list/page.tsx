'use client'

import { BuyModal } from "@/components/Modal/BuyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ListPage () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-100 flex items-center h-screen justify-center">
      <div className="flex flex-col gap-2 w-full h-full  max-w-[600px] bg-white justify-center px-3">
        <div className="flex px-6 py-4 border-b-slate-100 border-b">
          <Image src='/image/gdg_icon.svg' alt="gdg_icon" width={46} height={27}/>
        </div>
        <Image src='/image/gdg_icon.svg' alt="empty" width={600} height={633} className="w-full"/>
        <div className="flex border-b-slate-100 border-b">
          <p className="text-[24px] py-2 px-4">팀 이름</p>
        </div>

        <div className="flex flex-col p-4 gap-4">
          <p className="text-[36px] font-bold">프로덕트 이름입니다.</p>
          <p className="text-[24px] font-bold">문제 정의 및 필요성</p>
          <p className="text-[16px] font-bold">상품 설명입니다.상품 설명입니다.상품 설명입니다.상품 설명입니다.</p>
          <hr className="border-slate-100"/>
          <p className="text-[24px] font-bold">솔루션 소개</p>
          <p className="text-[16px] font-bold">상품 설명입니다.상품 설명입니다.상품 설명입니다.상품 설명입니다.</p>
          <hr className="border-slate-100"/>
          <p className="text-[24px] font-bold">핵심 기능 및 특징</p>
          <p className="text-[16px] font-bold">상품 설명입니다.상품 설명입니다.상품 설명입니다.상품 설명입니다.</p>
        </div>
        <div className="flex px-6 py-3 items-start bottom-1 ">
          <Button type="submit" onClick={openModal} className="bg-blue-500 hover:bg-blue-400 w-full">제품 구매하기</Button>
        </div>
      </div>
      {isModalOpen && <BuyModal closeModal={closeModal}/>}
    </div>
  )
}