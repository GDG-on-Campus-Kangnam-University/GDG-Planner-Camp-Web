interface Team {
  team_id: number;
  team_name: string;
  revenue: number;
  rank: number;
  blurred: boolean;
}

interface SalesData {
  total_sales: number;
  teams: Team[];
}