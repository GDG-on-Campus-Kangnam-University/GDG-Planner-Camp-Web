'use client'

import FireworksCanvas, {
  FireworksCanvasHandle,
} from '@/components/FireworksCanvas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useFormStatus } from 'react-dom' // Next.js 13에서 사용 가능
import { logIn } from './actions'

interface fieldErrors {
  studentId?: string[] | undefined
  password?: string[] | undefined
}

const LoginPage = () => {
  const [fieldErrors, setFieldErrors] = useState<fieldErrors | undefined>(
    undefined,
  )
  const [loginSuccess, setLoginSuccess] = useState(false)
  const fireworksRef = useRef<FireworksCanvasHandle>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSuccess = () => {
    setLoginSuccess(true)

    if (fireworksRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()

      const x = containerRect.width / 2
      const y = containerRect.height - 10

      // 애니메이션 단계별 트리거
      fireworksRef.current.createFireworkAt(x, y, 1)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 2)
      }, 1000)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 4)
      }, 1500)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 8)
      }, 2000)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 16)
      }, 2500)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 32)
      }, 2700)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 32)
      }, 3000)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 64)
      }, 3300)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 64)
      }, 3500)

      // 애니메이션 후 리다이렉트
      setTimeout(() => {
        router.push('/admin/product')
      }, 4500)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <div
        className="relative flex h-full w-full max-w-[600px] flex-col items-center justify-center gap-[200px] rounded bg-white p-8 shadow-lg"
        ref={containerRef}
      >
        <FireworksCanvas ref={fireworksRef} />

        <Image
          src="/image/gdg_icon.svg"
          alt="gdg_icon"
          width={248}
          height={144}
        />
        {!loginSuccess && (
          <form
            className="flex w-[280px] flex-col gap-20"
            action={async (formData) => {
              const result = await logIn(formData)
              if (result.success) {
                handleSuccess()
              } else {
                setFieldErrors(result.fieldErrors)
              }
            }}
          >
            <div className="flex flex-col gap-4">
              <Input type="text" placeholder="학번" name="studentId" required />
              <Input
                type="password"
                placeholder="비밀번호"
                name="password"
                required
              />
              {fieldErrors && (
                <p className="text-red-500">
                  {fieldErrors.studentId?.[0] || fieldErrors.password?.[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        )}
      </div>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-400"
      disabled={pending} // 로그인 진행 중 버튼 비활성화
    >
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  )
}

export default LoginPage
