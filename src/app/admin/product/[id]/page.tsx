import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'
import { DataTable } from '@/components/Table/DataTable'
import { productColumns, ProductTable } from '@/components/Table/ProductColumn'
import { Button } from '@/components/ui/button'
import db from '@/lib/db'

async function getData(): Promise<ProductTable[]> {
  const products = await db.product.findMany({
    select: {
      product_id: true,
      name: true,
      team_id: true,
      status: true,
      team: {
        select: { revenue: true },
      },
    },
  })

  return products.map((product) => ({
    id: product.product_id,
    name: product.name,
    team_id: product.team_id,
    status: product.status as 'selling' | 'sold_out' | 'waiting',
    revenue: product.team ? product.team.revenue : 0,
  }))
}

const page = async () => {
  const data = await getData()

  return (
    <div className="flex w-full flex-col gap-7 px-6 py-3">
      <BreadcrumbDemo />
      <div className="flex">
        <h1 className="flex-1 text-[24px] font-semibold">프로덕트 상세</h1>
        <Button className="w-40 bg-blue-500 px-3 hover:bg-blue-400">
          <p className="text-sm">추가하기</p>
        </Button>
      </div>
      <DataTable columns={productColumns} data={data} />
    </div>
  )
}

export default page
