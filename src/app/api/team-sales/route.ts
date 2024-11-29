import { getTeamSales } from '@/app/(user)/statistics/actions'
import { NextResponse } from 'next/server'

export async function GET() {
  const teams = await getTeamSales()
  return NextResponse.json(teams)
}
