'use client'

import { Popcorn } from "@/components/Popcorn/Popcorn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const { handleSubmit, watch, setError, register, reset, formState: {errors} } = useForm<{
    studentId: string,
    password: string
  }>({
    defaultValues: {
      studentId: '',
      password: ''
    }
  })

  const onSubmit = async (data: { studentId: string, password: string }) => {
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

        // 토큰을 로컬 스토리지나 쿠키에 저장
        localStorage.setItem('token', token);

        // role에 따라 리디렉션
        if (user.role === 'ADMIN') {
          router.push('/admin/home');  // ADMIN이면 /admin/home으로 이동
        } else {
          router.push('/user/home');   // ADMIN이 아니면 /user/home으로 이동
        }
      } else {
        const errorData = await response.json();
        console.error('로그인 실패:', errorData.message);
        reset();
        
        if (errorData.error === '비밀번호가 올바르지 않습니다.') {
          setError('password', { message: '비밀번호가 틀렸습니다.' });
        } else if (errorData.error === '존재하지 않는 사용자입니다.') 
          setError('studentId', { message: '등록되지 않은 학번입니다.' });
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };
  
  return (
    <div className="flex w-full h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center justify-center gap-[469.8px] bg-white max-w-[600px] w-full h-full">
        <Image src='/image/gdg_logo.gif' alt="gdg_icon" width={248} height={144}/>
        <form className="flex w-[280px] flex-col gap-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Input type="text" placeholder="학번" {...register("studentId", { required: "학번을 입력해주세요" })}/>
            <Input type="password" placeholder="비밀번호" {...register("password", { required: "비밀번호를 입력해주세요" })}/>
            {errors.studentId && <p className="text-red-500">{errors.studentId.message}</p>}
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={!watch('studentId')||!watch('password')} className="w-full bg-blue-500 hover:bg-blue-400">로그인</Button>
        </form>
      </div>
    </div>
  )
}