'use client'

import FireworksCanvas, {
  FireworksCanvasHandle,
} from '@/components/FireworksCanvas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useRef } from 'react'
import { useFormState } from 'react-dom'
import { logIn } from './actions'

export default function LoginPage() {
  const [state, dispatch] = useFormState(logIn, null)

  const fireworksRef = useRef<FireworksCanvasHandle>(null)
  const buttonRef = useRef<HTMLButtonElement>(null) // 로그인 버튼에 대한 Ref
  const containerRef = useRef<HTMLDivElement>(null) // 컨테이너에 대한 Ref

  if (fireworksRef.current && containerRef.current) {
    const containerRect = containerRef.current.getBoundingClientRect()

    const x = containerRect.width / 2 // 컨테이너의 중앙 x 좌표
    const y = containerRect.height - 10 // 컨테이너 하단 근처 y 좌표

    // Step 1: Immediately create 1 pop
    fireworksRef.current.createFireworkAt(x, y, 1)

    // Step 2: After 1 second, create 2 pops
    setTimeout(() => {
      fireworksRef.current?.createFireworkAt(x, y, 2)
    }, 1000)

    // Step 3: After 2 seconds, create 50 pops
    setTimeout(() => {
      fireworksRef.current?.createFireworkAt(x, y, 10)
    }, 1500)

    setTimeout(() => {
      fireworksRef.current?.createFireworkAt(x, y, 20)
    }, 2500)

    setTimeout(() => {
      fireworksRef.current?.createFireworkAt(x, y, 30)
    }, 2700)

    setTimeout(() => {
      fireworksRef.current?.createFireworkAt(x, y, 40)
    }, 3000)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <div
        className="relative flex h-full w-full max-w-[600px] flex-col items-center justify-center rounded bg-white p-8 shadow-lg"
        ref={containerRef} // 컨테이너에 Ref 할당
      >
        <FireworksCanvas ref={fireworksRef} />

        <Image
          src="/image/gdg_icon.svg"
          alt="gdg_icon"
          width={248}
          height={144}
        />
        <form className="flex w-[280px] flex-col gap-20" action={dispatch}>
          <div className="flex flex-col gap-4">
            <Input type="text" placeholder="학번" name="studentId" required />
            <Input
              type="password"
              placeholder="비밀번호"
              name="password"
              required
            />
            {state?.fieldErrors && (
              <p className="text-red-500">
                {state?.fieldErrors.studentId || state?.fieldErrors.password}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400"
            ref={buttonRef}
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}
