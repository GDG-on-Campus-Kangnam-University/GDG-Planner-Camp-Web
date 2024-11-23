import Image from 'next/image'

interface ProductProps {
  name: string
  product_id: string
  picture: string
  status: string
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

// export const AdminProductCard = (product: ProductProps) => {
//   const formatNumber = (number: number) => {
//     return new Intl.NumberFormat('ko-KR', {
//       style: 'currency',
//       currency: 'KRW',
//     })
//       .format(number)
//       .replace('₩', '')
//   }

//   return (
//     <div className="flex h-[236px] w-[200px] flex-col gap-2">
//       <Image src={product.picture} alt="상품 이미지" width={197} height={236} />
//       <div className="flex flex-col gap-1 px-2">
//         <p className="text-xs font-normal text-[#A8A8A8]">
//           {product.team?.name}
//         </p>
//         <p className="font-semibold">{product.name}</p>
//         <div className="flex flex-row items-center justify-between">
//           <span className="text-sm font-medium">
//             {formatNumber(product.)}원
//           </span>
//           <span className="text-sm font-medium text-[#EA4335]">
//             {product.rate}등
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }
