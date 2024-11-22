'use client'

import { UserData } from "@/api/product/model";
import { ProductCard } from "@/components/Card/ProductCard";
import { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

const UserHomePage = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [balance, setBalance] = useState({ prev: 0, cur: 0 });

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number).replace("₩", "₩ ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data: UserData = await res.json();

        setData(data);  
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // data가 변경되면 balance를 업데이트
  useEffect(() => {
    if (data) {
      setBalance({ prev: data.balance, cur: data.balance });
    }
  }, [data]);  // data가 바뀔 때마다 실행

  const props = useSpring({
    number: balance.cur,
    from: { number: balance.prev },
    reset: true,
    reverse: balance.cur < 0,
  });

  // data가 로드되지 않으면 로딩 메시지를 표시
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col">
      <hr />
      <nav className="flex flex-col gap-2 px-4 py-6">
        <h2 className="font-normal text-[#A8A8A8]">어서오세요, {data.user_name}님!</h2>
        <h2 className="font-[700] text-2xl">잔액</h2>
        <h1 className="font-[700] text-5xl h-[80px] flex justify-center items-center">
          <animated.span>
            {props.number.to((n: number) => formatNumber(Math.floor(n)))}
          </animated.span>
        </h1>
      </nav>
      <main className="grid grid-cols-3 gap-x-1.5 gap-y-6">
        {data.products.map((product: any, index: number) => {
          return <ProductCard key={index} {...product} />;
        })}
      </main>
    </section>
  );
};

export default UserHomePage;