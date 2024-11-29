// components/Chart/TeamChart.tsx

'use client'

import { User } from '@prisma/client'
import React from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, YAxis } from 'recharts'

interface TeamSales {
  team_id: string
  name: string
  revenue: number
  purchase_total: number
  total_sales: number
  rank: number
}

export const TeamChart: React.FC<{ salesData: TeamSales[]; user: User }> = ({
  salesData,
  user,
}) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={salesData}>
        {/* <XAxis dataKey="name" /> */}
        <YAxis domain={[0, 'auto']} tick={{ fontSize: 12 }} />
        <Bar dataKey="total_sales" barSize={80} radius={[4, 4, 4, 4]}>
          {salesData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.team_id === user.team_id ? '#4285F4' : '#0F172A'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
