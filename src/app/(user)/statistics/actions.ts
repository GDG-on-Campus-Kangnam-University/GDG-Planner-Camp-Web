import db from '@/lib/db'
import { User } from '@prisma/client'

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
