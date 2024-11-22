import { ProductStatus } from "@/api/product/model"
import GDGLogo from "../../../../../public/images/GDG_Logo.png"
import Image from "next/image"
import { AdminProductCard, ProductCard } from "@/components/Card/ProductCard"
import { Building2, ChartColumnBig, ChevronRight, ChevronsUpDown, Lightbulb, User } from "lucide-react"

const data = {
  name: "신홍기",
  balance: 100000,
  user_id: 202204133
}
const products = [
  {
    picture: GDGLogo,
    name: "상품 1",
    description: "상품 1 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 2",
    description: "상품 2 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 3",
    description: "상품 3 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 4",
    description: "상품 4 설명",
    status: ProductStatus.SOLD_OUT,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 1",
    description: "상품 1 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 2",
    description: "상품 2 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 3",
    description: "상품 3 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 4",
    description: "상품 4 설명",
    status: ProductStatus.SOLD_OUT,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 1",
    description: "상품 1 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 2",
    description: "상품 2 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 3",
    description: "상품 3 설명",
    status: ProductStatus.SELLING,
    team_name: "GDG",
    price: 10000,
    rate: 1
  },
  {
    picture: GDGLogo,
    name: "상품 4",
    description: "상품 4 설명",
    status: ProductStatus.SOLD_OUT,
    team_name: "GDG",
    price: 10000,
    rate: 1
  }
]

const AdminHomePage = () => {
  return <section className="flex flex-col h-screen">
    <header className="flex px-9 py-6">
      <Image src={GDGLogo} alt="GDG 로고 이미지" width={70} height={40} />
    </header>
    <hr />
    <div className="flex flex-row h-full">
      <nav className="flex flex-col gap-2 p-2 w-[240px] text-[#334155] justify-between border-r border-[#E2E8F0]">
        <div>
          <h2 className="font-normal text-[#A8A8A8] text-xs px-2 py-1.5">Feature</h2>
          <ol>
            <li className="flex flex-row justify-between items-center px-2 py-1.5">
              <div className="flex flex-row items-center gap-2">
                <Lightbulb size={16} />
                <span className="text-sm">프로덕트</span>
              </div>
              <ChevronRight size={16} />
            </li>
            <li className="flex flex-row justify-between items-center px-2 py-1.5">
              <div className="flex flex-row items-center gap-2">
                <User size={16} />
                <span className="text-sm">사용자</span>
              </div>
              <ChevronRight size={16} />
            </li>
            <li className="flex flex-row justify-between items-center px-2 py-1.5">
              <div className="flex flex-row items-center gap-2">
                <Building2 size={16} />
                <span className="text-sm">팀</span>
              </div>
              <ChevronRight size={16} />
            </li>
            <li className="flex flex-row justify-between items-center px-2 py-1.5">
              <div className="flex flex-row items-center gap-2">
                <ChartColumnBig size={16} />
                <span className="text-sm">통계</span>
              </div>
              <ChevronRight size={16} />
            </li>
          </ol>
        </div>
        <div className="p-2 flex flex-row justify-between items-center gap-2">
          <div className="p-2 flex flex-col">
            <p className="font-semibold text-sm text-ellipsis">{data.name}</p>
            <span className="font-normal text-xs text-ellipsis text-[#334155]">{data.user_id}</span>
          </div>
          <ChevronsUpDown size={16} />
        </div>
      </nav>
      <main className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-[600]">프로덕트</h1>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm font-normal text-[#64748B]">Home</span>
          <ChevronRight size={16} />
          <span className="text-sm font-normal">프로덕트</span>
          </div>
        <div className="flex flex-wrap gap-x-1.5 gap-y-6 items-start">
        {products.map((product, index) => {
          return <AdminProductCard key={index} {...product} />
        })}
        </div>
      </main>
    </div>
  </section>
}

export default AdminHomePage