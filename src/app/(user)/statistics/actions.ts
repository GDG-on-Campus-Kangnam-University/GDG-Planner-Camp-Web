// actions/getTeamSales.ts

import db from '@/lib/db'

export interface TeamSales {
  team_id: string
  name: string
  revenue: number
  purchase_total: number
  total_sales: number
  rank: number
}

export async function getTeamSales(): Promise<TeamSales[]> {
  // 모든 팀 가져오기
  const teams = await db.team.findMany({
    select: {
      team_id: true,
      name: true,
      revenue: true,
    },
  })

  // 모든 구매 기록 가져오기
  const purchases = await db.purchase.findMany({
    select: {
      quantity: true,
      model: {
        select: {
          price: true,
          product: {
            select: {
              team_id: true,
            },
          },
        },
      },
    },
  })

  // 팀별 매출액 계산
  const teamSalesMap: { [key: string]: number } = {}

  purchases.forEach((purchase) => {
    const team_id = purchase.model.product?.team_id
    if (!team_id) return

    const total = purchase.quantity * purchase.model.price
    teamSalesMap[team_id] = (teamSalesMap[team_id] || 0) + total
  })

  // 최종 데이터 구성
  const teamsWithTotalSales: TeamSales[] = teams.map((team) => {
    const purchase_total = teamSalesMap[team.team_id] || 0
    const total_sales = team.revenue + purchase_total
    return {
      team_id: team.team_id,
      name: team.name,
      revenue: team.revenue,
      purchase_total,
      total_sales,
      rank: 0, // 초기값 설정
    }
  })

  // 총 매출액 기준으로 정렬 및 순위 설정
  teamsWithTotalSales.sort((a, b) => b.total_sales - a.total_sales)
  teamsWithTotalSales.forEach((team, index) => {
    team.rank = index + 1
  })

  return teamsWithTotalSales
}
