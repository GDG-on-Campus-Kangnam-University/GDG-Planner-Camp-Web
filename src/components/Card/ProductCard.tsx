import { ProductStatus } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface ProductProps {
  name: string
  product_id: string
  picture: string
  status: ProductStatus
  team: {
    name: string
    team_id: string
  } | null
}

export const ProductCard = (product: ProductProps) => {
  const isAvailable =
    product.status === ProductStatus.ONSALE ||
    product.status === ProductStatus.NEW

  const ProductContent = (
    <div className="relative flex flex-col gap-2">
      <div className="relative">
        <Image
          src={product.picture}
          alt="상품 이미지"
          width={197}
          height={236}
          className={`rounded-md ${!isAvailable ? 'opacity-60' : ''}`}
        />
        {/* 상태 배지 */}
        {!isAvailable && (
          <div
            className={`absolute left-2 top-2 rounded bg-gray-400 px-2 py-1 text-xs font-bold text-white`}
          >
            {product.status === ProductStatus.WAITING
              ? '판매 대기중'
              : '판매 종료'}
          </div>
        )}
        {product.status === ProductStatus.NEW && (
          <div
            className={`absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white`}
          >
            신상품
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 px-2">
        <p className="text-xs font-normal text-[#A8A8A8]">
          {product.team?.name}
        </p>
        <p className="font-semibold">{product.name}</p>
      </div>
    </div>
  )

  return isAvailable ? (
    <Link href={`/product/${product.product_id}`}>{ProductContent}</Link>
  ) : (
    <div className="cursor-not-allowed">{ProductContent}</div>
  )
}
