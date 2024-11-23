'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = {
  name: "신홍기",
  balance: 100000,
  user_id: 202204133,
  team_id: 1
}

export const TeamChart = (salesData: SalesData) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={salesData.teams.sort((a, b) => b.revenue - a.revenue)}>
        <XAxis dataKey="team_name" hide />
        <YAxis domain={[0, 'auto']} tick={{ fontSize: 12 }} />
        <Bar dataKey="revenue" barSize={80} radius={[4, 4, 4, 4]}>
          {salesData.teams.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.team_id === data.team_id ? "#4285F4" : "#0F172A"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}