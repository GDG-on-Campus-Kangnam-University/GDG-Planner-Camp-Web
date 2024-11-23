'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useFormState } from 'react-dom'
import { logIn } from './actions'

export default function LoginPage() {
  const [state, dispatch] = useFormState(logIn, null)

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <div className="flex h-full w-full max-w-[600px] flex-col items-center justify-center gap-[469.8px] bg-white">
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
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}
