'use client'

import { Popcorn } from "@/components/Popcorn/Popcorn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { handleSubmit, watch } = useForm<{
    studentId: string,
    password: string
  }>({
    defaultValues: {
      studentId: '',
      password: ''
    }
  })

  const onSubmit = () => {
    console.log('submit')
  }
  
  return (
    <div className="flex w-full h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center justify-center gap-[469.8px] bg-white max-w-[600px] w-full h-full">
        <Image src='/image/gdg_icon.svg' alt="gdg_icon" width={248} height={144}/>
        <form className="flex w-[280px] flex-col gap-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Input type="text" placeholder="학번"/>
            <Input type="password" placeholder="비밀번호"/>
          </div>
          <Button type="submit" disabled={!watch} className="w-full bg-blue-500 hover:bg-blue-400">로그인</Button>
        </form>
      </div>
    </div>
  )
}