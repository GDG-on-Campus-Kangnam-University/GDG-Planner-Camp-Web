interface Team {
  team_id: string
  name: string
  revenue: number
  rank: number
  blurred: boolean
}

interface SalesData {
  total_sales: number
  teams: Team[]
}
