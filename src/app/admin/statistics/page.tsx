import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'
import { DataTable } from '@/components/Table/DataTable'
import { columns, ProductTable } from '@/components/Table/ProductColumn'
import { Button } from '@/components/ui/button'

async function getData(): Promise<ProductTable[]> {
  // Fetch data from your API here.
  return [
    {
      id: '00124124',
      name: '테스트용',
      team_id: '24941 ',
      status: 'selling',
      revenue: 12412414,
    },
    {
      id: '2144124',
      name: '테스트용',
      team_id: '24941 ',
      status: 'selling',
      revenue: 12412414,
    },
    {
      id: '1241441',
      name: '테스트용',
      team_id: '24941 ',
      status: 'selling',
      revenue: 12412414,
    },
    // ...
  ]
}

const page = async () => {
  const data = await getData()

  return (
    <div className="flex w-full flex-col gap-7 px-6 py-3">
      <BreadcrumbDemo />
      <div className="flex">
        <h1 className="flex-1 text-[24px] font-semibold">프로덕트</h1>
        <Button className="w-40 bg-blue-500 px-3 hover:bg-blue-400">
          <p className="text-sm">추가하기</p>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default page
