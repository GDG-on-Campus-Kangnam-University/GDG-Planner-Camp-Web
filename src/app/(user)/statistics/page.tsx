'use client'

import { getUser } from '@/app/login/actions'
import UserDepositCard from '@/components/Card/UserDepositCard'
import { TeamChart } from '@/components/Chart/TeamChart'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const StatisticsPage = () => {
  const { data: teams, error } = useSWR('/api/team-sales', fetcher, {
    refreshInterval: 10000, // Revalidate every 10 seconds
  })

  const [user, setUser] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getUser().then(setUser)
  }, [])

  if (error) return <div>Failed to load</div>
  if (!teams || !user) return <div>Loading...</div>

  // Find the user's team
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const userTeam = teams.find((team) => team.team_id === user.team_id)

  return (
    <section className="flex flex-col gap-6">
      <UserDepositCard user={user} userTeam={userTeam} />
      <hr />
      <main className="flex h-full flex-col p-8">
        <h1 className="p-6 font-[600]">Overview</h1>
        <TeamChart salesData={teams} user={user} />
      </main>
    </section>
  )
}

export default StatisticsPage
