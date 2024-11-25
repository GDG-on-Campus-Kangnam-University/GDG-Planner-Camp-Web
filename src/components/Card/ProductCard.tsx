import { ProductStatus } from '@prisma/client'
import Image from 'next/image'

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
  return (
    <div className="flex flex-col gap-2">
      <Image src={product.picture} alt="상품 이미지" width={197} height={236} />
      <div className="flex flex-col gap-1 px-2">
        <p className="text-xs font-normal text-[#A8A8A8]">
          {product.team?.name}
        </p>
        <p className="font-semibold">{product.name}</p>
      </div>
    </div>
  )
}
