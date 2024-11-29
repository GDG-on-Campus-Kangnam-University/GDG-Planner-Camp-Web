import { getInitialProducts } from '@/app/(user)/product/actions'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await getInitialProducts()
  return NextResponse.json(products)
}
