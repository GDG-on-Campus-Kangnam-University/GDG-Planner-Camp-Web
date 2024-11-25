'use client'

import SnowfallCanvas from '@/components/SnowfallCanvas'
import { Button } from '@/components/ui/button'
import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
  ClockIcon, // BadgeCheckIcon 대체
  PencilIcon,
  PresentationChartLineIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid' // Heroicons 추가
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface EventItem {
  time: string
  title: string
  description: string[]
  icon: JSX.Element
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const timetableRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [showTimetable, setShowTimetable] = useState(false)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  const events: EventItem[] = [
    {
      time: '10:00',
      title: '참여자 등록, 참가자 자리 안내',
      description: ['운영진 및 TF 10:00까지 집합'],
      icon: <ClockIcon className="mr-2 h-5 w-5 text-green-700" />,
    },
    {
      time: '10:10',
      title: 'PM 특강',
      description: ['제품 관리 기본 개념 세션 진행'],
      icon: <AcademicCapIcon className="mr-2 h-5 w-5 text-green-700" />,
    },
    {
      time: '11:00',
      title: '팀 빌딩',
      description: ['팀 빌딩 & 아이스 브레이킹 진행'],
      icon: <UserGroupIcon className="mr-2 h-5 w-5 text-green-700" />,
    },
    {
      time: '11:30',
      title: '점심 식사',
      description: ['중식 제공'],
      icon: <CheckCircleIcon className="mr-2 h-5 w-5 text-green-700" />, // BadgeCheckIcon 대체
    },
    {
      time: '12:30',
      title: '아이데이션',
      description: ['아이디어 탐색 및 구체화, 비즈니스 모델 설계'],
      icon: <PencilIcon className="mr-2 h-5 w-5 text-green-700" />,
    },
    {
      time: '15:00',
      title: '서비스 발표',
      description: [],
      icon: (
        <PresentationChartLineIcon className="mr-2 h-5 w-5 text-green-700" />
      ),
    },
    {
      time: '16:30',
      title: '우수자 시상',
      description: ['참가자들의 투표 & 게임 진행'],
      icon: <TrophyIcon className="mr-2 h-5 w-5 text-green-700" />,
    },
    {
      time: '16:50',
      title: '뒷정리',
      description: [],
      icon: <ArchiveBoxIcon className="mr-2 h-5 w-5 text-green-700" />,
    },
  ]

  // 카운트다운 타이머 설정
  useEffect(() => {
    const targetDate = new Date('2024-11-30T10:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft('00시 00분 00초')
        clearInterval(intervalId)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      // const totalHours = days * 24 + hours

      // const formattedTime = [
      //   totalHours.toString().padStart(2, '0'),
      //   minutes.toString().padStart(2, '0'),
      //   seconds.toString().padStart(2, '0'),
      // ].join(':')

      setTimeLeft(
        days.toString().padStart(2, '0') +
          '일 ' +
          hours.toString().padStart(2, '0') +
          '시 ' +
          minutes.toString().padStart(2, '0') +
          '분 ' +
          seconds.toString().padStart(2, '0') +
          '초 ',
      )
    }

    updateCountdown()
    const intervalId = setInterval(updateCountdown, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const eventRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    eventRefs.current = eventRefs.current.slice(0, events.length)

    const observers = eventRefs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...prev, index])
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect()
      })
    }
  }, [events.length])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const scrollFraction = scrollTop / (scrollHeight - clientHeight)

      console.log(
        `scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}, scrollFraction: ${scrollFraction}`,
      )
      console.log(scrollFraction)
      if (scrollFraction > 0.1) {
        setShowTimetable(true)
      } else {
        setShowTimetable(false)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleArrowClick = () => {
    console.log('Arrow clicked, scrolling to timetable')
    timetableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // setShowTimetable(true)
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-slate-100">
      <div
        ref={containerRef}
        className="no-scrollbar g-12 relative z-10 flex h-full w-full max-w-[600px] flex-col items-center justify-start gap-8 overflow-y-scroll rounded bg-white p-8 shadow-lg"
      >
        <SnowfallCanvas containerRef={containerRef} />
        <div className="flex min-h-screen flex-col justify-between py-32">
          <div className="relative z-20 mt-20 flex flex-col items-center gap-14">
            <Image
              src="/image/gdg_icon.svg"
              alt="gdg_icon"
              width={208}
              height={104}
            />
            <div className="flex flex-col items-center gap-2 bg-white p-4">
              <h1 className="text-2xl font-bold">
                제목은 IT 기획캠프로 하겠습니다.
              </h1>
              <p className="pb-8 text-xl">그런데, 이제 PM을 곁들인</p>

              <h1 className="text-2xl font-bold">GDG X IT 기획캠프</h1>
              <p className="mt-2 text-xl font-bold">선착순 모집중!</p>
              <p className="mt-2 text-xl">{timeLeft}후 시작</p>
            </div>
            <div
              className={`relative z-20 mt-10 w-[280px] flex-col gap-3 ${timeLeft == '00:00:00' ? 'flex' : 'hidden'}`}
            >
              <Link href="/admin/product">
                <Button className="w-full bg-blue-500 py-2 text-white hover:bg-blue-400">
                  관리자 로그인
                </Button>
              </Link>
              <Link href="/product">
                <Button className="w-full bg-blue-500 py-2 text-white hover:bg-blue-400">
                  사용자 로그인
                </Button>
              </Link>
            </div>
          </div>
          <div
            onClick={handleArrowClick}
            className="z-20 -translate-x-1/2 transform animate-float cursor-pointer"
            aria-label="타임테이블로 스크롤"
          >
            <Image
              src="/image/arrow.png"
              alt="화살표 이미지"
              width={150}
              height={150}
              className="h-auto w-full"
            />
          </div>
        </div>
        <div
          ref={timetableRef} // 타임테이블 섹션 참조 추가
          className={`relative z-20 w-full transition-opacity duration-700 ${
            showTimetable ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div>
            <h2 className="mb-6 text-center text-2xl font-semibold">
              타임테이블
            </h2>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center text-green-700">
                      {event.icon}
                      <p className="text-base font-bold">{event.time}</p>
                    </div>
                    <div
                      ref={(el) => {
                        eventRefs.current[index] = el
                      }}
                      className={`transform rounded-lg bg-green-50 p-4 shadow-sm transition-opacity duration-700 ${
                        visibleItems.includes(index)
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      }`}
                    >
                      <p className="text-base font-semibold">{event.title}</p>
                      {event.description.map((desc, descIndex) => (
                        <p key={descIndex} className="mt-1">
                          {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Link target="_blank" href="https://forms.gle/D8VQnaCvFCgcb6Tj7">
            <Button className="w-full bg-blue-500 py-2 text-white hover:bg-blue-400">
              지금 바로 신청하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
