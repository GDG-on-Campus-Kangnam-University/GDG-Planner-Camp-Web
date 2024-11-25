// app/product/[id]/page.tsx 또는 pages/product/[id].tsx
import MarkdownRenderer from '@/components/Markdown/MarkdownRender'
import ProductModal from '@/components/Modal/ProductModalControl'
import db from '@/lib/db'
import Image from 'next/image'

async function getProduct(id: string) {
  const products = await db.product.findFirst({
    where: {
      product_id: id,
    },
    select: {
      product_id: true,
      name: true,
      picture: true,
      status: true,
      description: true,
      team: {
        select: {
          team_id: true,
          name: true,
        },
      },
    },
  })
  return products
}

async function getModels(id: string) {
  const model = await db.model.findFirst({
    where: { product_id: id },
    select: {
      model_id: true,
      name: true,
      price: true,
      total_count: true,
      description: true,
      product: true,
      product_id: true,
      purchases: true,
    },
  })
  return model ? [model] : []
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const product = await getProduct(id)
  const model = await getModels(id)

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
        <p className="px-4 py-2 text-[24px]">{product?.team?.name}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p className="text-[36px] font-bold">{product?.name}</p>
        <MarkdownRenderer markdownContent={product?.description ?? ''} />
      </div>
      <ProductModal model={model} />
    </div>
  )
}

export default ProductDetailPage
