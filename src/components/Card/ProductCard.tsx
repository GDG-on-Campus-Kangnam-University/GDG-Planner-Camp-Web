'use client'

import { Product } from "@/api/product/model";
import Image from "next/image";

export const ProductCard = (product: Product) => {
  return (
    <div className="flex gap-2 flex-col">
      <Image src={product.picture} alt="상품 이미지" width={197} height={236} />
      <div className="flex flex-col gap-1 px-2">
        <p className="font-normal text-[#A8A8A8] text-xs">{product.team_name}</p>
        <p className="font-semibold">{product.name}</p>
      </div>
    </div>
  )
}
export const AdminProductCard = (product: Product) => {
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number).replace("₩", "");
  }

  return (
    <div className="flex gap-2 flex-col w-[200px] h-[236px]">
      <Image src={product.picture} alt="상품 이미지" width={197} height={236} />
      <div className="flex flex-col gap-1 px-2">
        <p className="font-normal text-[#A8A8A8] text-xs">{product.team_name}</p>
        <p className="font-semibold">{product.name}</p>
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm font-medium">{formatNumber(product.price)}원</span>
          <span className="font-medium text-sm text-[#EA4335]">{product.rate}등</span>
        </div>
      </div>
    </div>
  )
}