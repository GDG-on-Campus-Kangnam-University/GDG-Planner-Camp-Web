import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'
import { DataTable } from '@/components/Table/DataTable'
import { userColumns, UserTable } from '@/components/Table/UserColumn'
import { Button } from '@/components/ui/button'
import db from '@/lib/db'

async function getData(): Promise<UserTable[]> {
  const users = await db.user.findMany({
    select: {
      user_id: true,
      name: true,
      team_id: true,
      role: true,
      balance: true,
    },
  })

  return users.map((user) => ({
    id: user.user_id.toString(),
    name: user.name,
    team_id: user.team_id,
    role: user.role as 'admin' | 'user',
    balance: user.balance,
  }))
}

const page = async () => {
  const data = await getData()

  return (
    <div className="flex w-full flex-col gap-7 px-6 py-3">
      <BreadcrumbDemo />
      <div className="flex">
        <h1 className="flex-1 text-[24px] font-semibold">사용자</h1>
        <Button className="w-40 bg-blue-500 px-3 hover:bg-blue-400">
          <p className="text-sm">추가하기</p>
        </Button>
      </div>
      <DataTable columns={userColumns} data={data} />
    </div>
  )
}

export default page
