'use client'

import GDGLogo from "../../../../../public/images/GDG_Logo.png"
import { ProductCard } from "@/components/Card/ProductCard"
import { ProductStatus } from "@/api/product/model"
import { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"

const data = {
  name: "신홍기",
  balance: 100000
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
  }
]

const UserHomePage = () => {
  const [balance, setBalance] = useState({ prev: data.balance, cur: data.balance });

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number).replace("₩", "₩ ");
  }

  const props = useSpring({
    number: balance.cur,
    from: { number: balance.prev },
    reset: true,
    reverse: balance.cur < 0, 
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setBalance((prevBalance) => ({
        prev: prevBalance.cur,
        cur: prevBalance.cur * 2,
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, []); 

  return <section className="flex flex-col">
    <hr />
    <nav className="flex flex-col gap-2 px-4 py-6">
      <h2 className="font-normal text-[#A8A8A8]">어서오세요, {data.name}님!</h2>
      <h2 className="font-[700] text-2xl">잔액</h2>
      <h1 className="font-[700] text-5xl h-[80px] flex justify-center items-center">
        <animated.span>
          {props.number.to(n => formatNumber(Math.floor(n)))}
        </animated.span>
      </h1>
    </nav>
    <main className="grid grid-cols-3 gap-x-1.5 gap-y-6">
      {products.map((product, index) => {
        return <ProductCard key={index} {...product} />
      })}
    </main>
  </section>
}

export default UserHomePage