'use client'

import { TeamChart } from '@/components/Chart/TeamChart'
import { useEffect, useState } from 'react'

interface Team {
  team_id: number
  team_name: string
  revenue: number
  rank: number
  blurred: boolean
}

export interface SalesData {
  total_sales: number
  teams: Team[]
}

const data = {
  name: '신홍기',
  balance: 100000,
  user_id: 202204133,
  team_id: 1,
}
const TestSalesData: SalesData = {
  total_sales: 150000000, // 총 매출: 예시값
  teams: [
    {
      team_id: 1,
      team_name: 'Alpha Team',
      revenue: 40000000, // 매출액: 4천만 원
      rank: 1,
      blurred: true,
    },
    {
      team_id: 2,
      team_name: 'Beta Team',
      revenue: 35000000, // 매출액: 3천5백만 원
      rank: 2,
      blurred: true,
    },
    {
      team_id: 3,
      team_name: 'Gamma Team',
      revenue: 30000000, // 매출액: 3천만 원
      rank: 3,
      blurred: false, // 이 팀만 블러 처리되지 않음
    },
    {
      team_id: 4,
      team_name: 'Delta Team',
      revenue: 25000000, // 매출액: 2천5백만 원
      rank: 4,
      blurred: true,
    },
    {
      team_id: 5,
      team_name: 'Epsilon Team',
      revenue: 20000000, // 매출액: 2천만 원
      rank: 5,
      blurred: true,
    },
  ],
}

const UserStatisticsPage = () => {
  const [salesData, setSalesData] = useState<SalesData>(TestSalesData)

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    })
      .format(number)
      .replace('₩', '₩ ')
  }
  const myTeam = salesData.teams.find((team) => team.team_id === data.team_id)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSalesData((prevState) => ({
        ...prevState,
        teams: prevState.teams.map((team) =>
          team.team_id !== data.team_id
            ? { ...team, revenue: team.revenue + 30000000 }
            : team,
        ),
      }))
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="flex flex-col">
      <hr />
      <nav className="flex flex-col gap-2 px-4 py-6">
        <h2 className="font-normal text-[#A8A8A8]">
          어서오세요, {data.name}님!
        </h2>
        <h2 className="text-2xl font-[700]">팀 매출액</h2>
        <h1 className="flex h-[80px] items-center justify-center text-5xl font-[700]">
          {formatNumber(myTeam?.revenue as number)}
        </h1>
      </nav>
      <main className="flex h-full flex-col">
        <h1 className="p-6 font-[600]">Overview</h1>
        <TeamChart {...salesData} />
      </main>
    </section>
  )
}

export default UserStatisticsPage
