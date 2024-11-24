import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'
import { DataTable } from '@/components/Table/DataTable'
import { teamColumns, TeamTable } from '@/components/Table/TeamColumn'
import { Button } from '@/components/ui/button'
import db from '@/lib/db'

async function getData(): Promise<TeamTable[]> {
  try {
    // 팀 데이터를 revenue 내림차순으로 가져옵니다.
    const teams = await db.team.findMany({
      orderBy: {
        revenue: 'desc',
      },
      select: {
        team_id: true,
        name: true,
        revenue: true,
        users: {
          select: {
            name: true,
          },
        },
      },
    })

    // 팀의 순위를 매기기 위해 revenue 기준으로 정렬된 상태이므로 인덱스를 사용하여 순위를 할당합니다.
    const teamTable: TeamTable[] = teams.map((team, index) => ({
      id: team.team_id,
      name: team.name,
      member: team.users.map((user) => user.name).join(', '),
      ranking: (index + 1).toString(), // 순위를 문자열로 변환
      revenue: team.revenue,
    }))

    return teamTable
  } catch (error) {
    console.error('Error fetching team data:', error)
    throw error
  }
}

const page = async () => {
  const data = await getData()

  return (
    <div className="flex w-full flex-col gap-7 px-6 py-3">
      <BreadcrumbDemo />
      <div className="flex">
        <h1 className="flex-1 text-[24px] font-semibold">팀</h1>
        <Button className="w-40 bg-blue-500 px-3 hover:bg-blue-400">
          <p className="text-sm">추가하기</p>
        </Button>
      </div>
      <DataTable columns={teamColumns} data={data} />
    </div>
  )
}

export default page
