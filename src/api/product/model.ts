import { LargeNumberLike } from "crypto";
import { StaticImageData } from "next/image";

export enum ProductStatus {
  SELLING = "판매중",
  SOLD_OUT = "품절",
  WAITING = "판매대기"
}

export interface Product {
  picture: StaticImageData
  name: string
  description: string
  status: ProductStatus
  team_name: string
  price: number
  rate: number
}

export interface ProductResult {
  status: number
  result: Product[]
}

