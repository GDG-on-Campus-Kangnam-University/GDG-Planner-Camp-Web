import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'
import MarkdownRenderer from '@/components/Markdown/MarkdownRender'
import { Button } from '@/components/ui/button'
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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const product = await getProduct(id)

  return (
    <div className="flex w-full flex-col gap-7 px-6 py-3">
      <BreadcrumbDemo />
      <div className="flex">
        <h1 className="flex-1 text-[24px] font-semibold">프로덕트 상세</h1>
        <Button className="w-40 bg-blue-500 px-3 hover:bg-blue-400">
          <p className="text-sm">추가하기</p>
        </Button>
      </div>
      <Image
        src={product?.picture ?? ''}
        alt="empty"
        width={228}
        height={633}
      />
      <div className="flex border-b border-b-slate-100">
        <p className="px-4 py-2 text-[24px]">{product?.team?.name}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p className="text-[36px] font-bold">{product?.name}</p>
        <MarkdownRenderer markdownContent={product?.description ?? ''} />
      </div>
      {/* <DataTable columns={productColumns} data={data} /> */}
    </div>
  )
}

export default page
