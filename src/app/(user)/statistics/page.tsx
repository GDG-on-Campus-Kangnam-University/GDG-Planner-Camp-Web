import UserDepositCard from '@/components/Card/UserDepositCard'
import { TeamChart } from '@/components/Chart/TeamChart'
import db from '@/lib/db'
import { User } from '@prisma/client'
import { getUser } from '../product/page'

export async function getTeamList(user: User) {
  const Team = await db.team.findMany({
    select: {
      team_id: true,
      name: true,
      revenue: true,
      settings: {
        select: {
          blurred: true,
        },
      },
    },
  })
  const formatTeam = Team.map((team, index) => {
    return {
      ...team,
      rank: index + 1,
      blurred: team.settings?.blurred || true,
    }
  })

  return {
    total_sales: Team.filter((team) => team.team_id === user.team_id).reduce(
      (acc, cur) => acc + cur.revenue,
      0,
    ),
    teams: formatTeam,
  }
}

const UserStatisticsPage = async () => {
  const user = await getUser()
  const team = await getTeamList(user)

  user.balance = team.total_sales

  return (
    <section className="flex flex-col">
      <hr />
      <UserDepositCard user={user} />
      <main className="flex h-full flex-col">
        <h1 className="p-6 font-[600]">Overview</h1>
        <TeamChart salesData={team} user={user} />
      </main>
    </section>
  )
}

export default UserStatisticsPage
