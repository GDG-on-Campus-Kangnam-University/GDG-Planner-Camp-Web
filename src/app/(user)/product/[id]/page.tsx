// app/product/[id]/page.tsx 또는 pages/product/[id].tsx
import { getUser } from '@/app/login/actions'
import MarkdownRenderer from '@/components/Markdown/MarkdownRender'
import ProductModal from '@/components/Modal/ProductModalControl'
import Image from 'next/image'
import { getModels, getProduct } from './actions'

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const product = await getProduct(id)
  const model = await getModels(id)
  const user = await getUser()

  return (
    <div className="flex flex-col justify-center gap-2 bg-white pb-16">
      <Image
        src={product?.picture ?? ''}
        alt="empty"
        width={600}
        height={633}
        className="w-full"
      />

      <div className="flex border-b border-b-slate-100">
        <p className="px-4 py-2 text-[16px]">{product?.team?.name}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p className="text-[36px] font-bold">{product?.name}</p>
        <MarkdownRenderer markdownContent={product?.description ?? ''} />
      </div>

      <ProductModal model={model} user={user} />
    </div>
  )
}

export default ProductDetailPage
