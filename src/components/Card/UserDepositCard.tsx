'use client'

import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'

const UserDepositCard = ({ user }: { user: User }) => {
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    })
      .format(number)
      .replace('₩', '₩ ')
  }

  const [balance, setBalance] = useState({ prev: 0, cur: 0 })

  // user 변경되면 balance를 업데이트
  useEffect(() => {
    if (user) {
      setBalance({ prev: user.balance, cur: user.balance })
    }
  }, [user]) // data가 바뀔 때마다 실행

  const props = useSpring({
    number: balance.cur,
    from: { number: balance.prev },
    reset: true,
    reverse: balance.cur < 0,
  })

  // data가 로드되지 않으면 로딩 메시지를 표시
  if (!user) {
    return <div>사용자가 존재하지 않습니다...</div>
  }

  return (
    <nav className="flex flex-col gap-2 px-4 py-6">
      <h2 className="font-normal text-[#A8A8A8]">어서오세요, {user.name}님!</h2>
      <h2 className="text-2xl font-[700]">잔액</h2>
      <h1 className="flex h-[80px] items-center justify-center text-5xl font-[700]">
        <animated.span>
          {props.number.to((n: number) => formatNumber(Math.floor(n)))}
        </animated.span>
      </h1>
    </nav>
  )
}

export default UserDepositCard
