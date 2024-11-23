'use client'

import React, { useRef } from 'react'
import FireworksCanvas, {
  FireworksCanvasHandle,
} from '@/components/FireworksCanvas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const {
    handleSubmit,
    watch,
    setError,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    studentId: string
    password: string
  }>({
    defaultValues: {
      studentId: '',
      password: '',
    },
  })

  const fireworksRef = useRef<FireworksCanvasHandle>(null)
  const buttonRef = useRef<HTMLButtonElement>(null) // 로그인 버튼에 대한 Ref
  const containerRef = useRef<HTMLDivElement>(null) // 컨테이너에 대한 Ref

  const onSubmit = async (data: { studentId: string; password: string }) => {
    // 로그인 API 호출 주석 처리
    /*
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: data.studentId,
          password: data.password
        })
      });

      if (response.ok) {
        const result = await response.json();
        const { token, user } = result;

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', token);

        // 로그인 버튼의 위치를 기준으로 폭죽 생성
        if (buttonRef.current && fireworksRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          const container = buttonRef.current.parentElement;
          if (!container) return;
          const containerRect = container.getBoundingClientRect();

          const x = buttonRect.left + buttonRef.current.offsetWidth / 2 - containerRect.left;
          const y = buttonRect.top + buttonRef.current.offsetHeight / 2 - containerRect.top;

          fireworksRef.current.createFireworkAt(x, y, 50);
        }

        // 폭죽이 실행될 시간을 준 후 리디렉션
        setTimeout(() => {
          if (user.role === 'ADMIN') {
            router.push('/admin/home');  // ADMIN이면 /admin/home으로 이동
          } else {
            router.push('/user/home');   // ADMIN이 아니면 /user/home으로 이동
          }
        }, 1000); // 1초 후 리디렉션
      } else {
        const errorData = await response.json();
        console.error('로그인 실패:', errorData.message);
        reset();

        if (errorData.message === '비밀번호가 올바르지 않습니다.') {
          setError('password', { message: '비밀번호가 틀렸습니다.' });
        } else if (errorData.message === '존재하지 않는 사용자입니다.') {
          setError('studentId', { message: '등록되지 않은 학번입니다.' });
        } else {
          setError('password', { message: errorData.message || '로그인에 실패했습니다.' });
        }
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
    */

    // 테스트용: 로그인 버튼 클릭 시 폭죽 애니메이션 트리거
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
        fireworksRef.current?.createFireworkAt(x, y, 30)
      }, 2700)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 40)
      }, 3000)

      setTimeout(() => {
        fireworksRef.current?.createFireworkAt(x, y, 40)
      }, 3000)
    }

    // 리디렉션 주석 처리 또는 제거 (테스트 시 필요없음)
    /*
    setTimeout(() => {
      router.push('/user/home'); // 임의의 경로로 이동하거나 주석 처리
    }, 1000);
    */
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <div
        className="relative flex h-full w-full max-w-[600px] flex-col items-center justify-center rounded bg-white p-8 shadow-lg"
        ref={containerRef} // 컨테이너에 Ref 할당
      >
        {/* FireworksCanvas 컴포넌트 추가 */}
        <FireworksCanvas ref={fireworksRef} />

        {/* 로그인 폼 */}
        <Image
          src="/image/gdg_icon.svg"
          alt="gdg_icon"
          width={248}
          height={144}
        />
        <form
          className="mt-8 flex w-[280px] flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="학번"
              {...register('studentId', { required: '학번을 입력해주세요' })}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              {...register('password', { required: '비밀번호를 입력해주세요' })}
            />
            {errors.studentId && (
              <p className="text-red-500">{errors.studentId.message}</p>
            )}
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!watch('studentId') || !watch('password')}
            className="w-full bg-blue-500 hover:bg-blue-400"
            ref={buttonRef} // 로그인 버튼에 Ref 할당
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}
