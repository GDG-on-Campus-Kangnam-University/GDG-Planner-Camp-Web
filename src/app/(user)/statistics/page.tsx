// app/statistics/page.tsx

import { getUser } from '@/app/login/actions'
import UserDepositCard from '@/components/Card/UserDepositCard'
import { TeamChart } from '@/components/Chart/TeamChart'
import { getTeamSales } from './actions'

const UserStatisticsPage = async () => {
  const user = await getUser()
  const teams = await getTeamSales()

  // 사용자의 팀 정보 가져오기
  const userTeam = teams.find((team) => team.team_id === user.team_id)

  console.log(userTeam)
  return (
    <section className="flex flex-col gap-6">
      <UserDepositCard user={user} userTeam={userTeam} />
      <hr />
      <main className="flex h-full flex-col">
        <h1 className="p-6 font-[600]">Overview</h1>
        <TeamChart salesData={teams} user={user} />
      </main>
    </section>
  )
}

export default UserStatisticsPage
