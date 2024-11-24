'use client'

import { User } from '@prisma/client'
import React from 'react'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

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

export const TeamChart: React.FC<{ salesData: SalesData; user: User }> = ({
  salesData,
  user,
}) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={salesData.teams.sort((a, b) => b.revenue - a.revenue)}>
        <XAxis dataKey="team_name" hide />
        <YAxis domain={[0, 'auto']} tick={{ fontSize: 12 }} />
        <Bar dataKey="revenue" barSize={80} radius={[4, 4, 4, 4]}>
          {salesData.teams.map((entry, index) => (
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
