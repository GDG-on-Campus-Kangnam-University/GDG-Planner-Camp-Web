// components/Chart/TeamChart.tsx

'use client'

import { User } from '@prisma/client'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

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
  // total_sales가 0이 아닌 데이터만 필터링
  const filteredData = salesData.filter((entry) => entry.total_sales > 0)

  return (
    <div style={{ width: '100%', height: 600, overflowX: 'auto' }}>
      <ResponsiveContainer width={filteredData.length * 80} height="100%">
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis domain={[0, 'auto']} tick={{ fontSize: 12 }} />
          <Tooltip />

          <Bar dataKey="total_sales" barSize={50} radius={[4, 4, 0, 0]}>
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.team_id === user.team_id ? '#4285F4' : '#0F172A'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
