import UserDepositCard from '@/components/Card/UserDepositCard'
import { TeamChart } from '@/components/Chart/TeamChart'
import { getUser } from '../actions'
import { getTeamList } from './actions'

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
