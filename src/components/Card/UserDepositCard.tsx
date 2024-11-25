'use client'

import { TeamSales } from '@/app/(user)/statistics/actions'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'

interface UserDepositCardProps {
  user?: User
  userTeam?: TeamSales
}

const UserDepositCard = ({ user, userTeam }: UserDepositCardProps) => {
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    })
      .format(number)
      .replace('₩', '₩ ')
  }

  const [balance, setBalance] = useState({ prev: 0, cur: 0 })

  // 데이터 변경 시 balance를 업데이트
  useEffect(() => {
    if (userTeam) {
      setBalance({ prev: balance.cur, cur: userTeam.total_sales })
    } else if (user) {
      setBalance({ prev: balance.cur, cur: user.balance })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userTeam])

  const props = useSpring({
    number: balance.cur,
    from: { number: balance.prev },
    reset: true,
    reverse: balance.cur < 0,
  })

  // 데이터가 로드되지 않으면 로딩 메시지를 표시
  if (!user && !userTeam) {
    return <div>데이터를 불러오는 중입니다...</div>
  }

  return (
    <nav className="flex flex-col gap-2 px-4 py-6">
      <h2 className="font-normal text-[#A8A8A8]">
        {userTeam
          ? `현재 ${userTeam.rank}위를 하고 있어요`
          : user
            ? `어서오세요, ${user.name}님!`
            : null}
      </h2>
      <h2 className="text-2xl font-[700]">{userTeam ? '총 매출액' : '잔액'}</h2>
      <h1 className="flex h-[80px] items-center justify-center text-5xl font-[700]">
        <animated.span>
          {props.number.to((n: number) => formatNumber(Math.floor(n)))}
        </animated.span>
      </h1>
    </nav>
  )
}

export default UserDepositCard
