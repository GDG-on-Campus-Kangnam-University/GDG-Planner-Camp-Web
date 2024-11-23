export enum ProductStatus {
  SELLING = '판매중',
  SOLD_OUT = '품절',
  WAITING = '판매대기',
}

export interface User {
  user_id: number
  password: string
  name: string
  balance: number
  role: string
  team_id: string | null
}
