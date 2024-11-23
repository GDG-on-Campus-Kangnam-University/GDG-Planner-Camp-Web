// actions.ts
'use server'

import db from '@/lib/db'
import getSession, { UserRole } from '@/lib/sessions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  studentId: z.string({
    required_error: '학번을 입력해주세요.',
  }),
  password: z.string({
    required_error: '비밀번호를 입력해주세요.',
  }),
})

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    studentId: formData.get('studentId'),
    password: formData.get('password'),
  }

  const result = formSchema.safeParse(data)

  if (!result.success) {
    return result.error.flatten()
  } else {
    const { studentId, password } = result.data

    // studentId를 정수로 변환
    const parsedStudentId = parseInt(studentId, 10)
    if (isNaN(parsedStudentId)) {
      return {
        fieldErrors: {
          studentId: ['StudentId must be a valid number.'],
          password: [],
        },
      }
    }

    // 사용자 조회 시 역할 정보도 가져오기
    const user = await db.user.findUnique({
      where: {
        user_id: parsedStudentId,
      },
      select: {
        user_id: true,
        password: true,
        role: true, // 역할 정보 추가
      },
    })

    if (!user) {
      return {
        fieldErrors: {
          studentId: ['User not found.'],
          password: [],
        },
      }
    }

    // 비밀번호 비교
    // const ok = await bcrypt.compare(password, user.password ?? 'xxxx')
    const ok = password == user.password

    if (ok) {
      const session = await getSession()
      session.user = {
        id: user.user_id,
        role: (user.role as string).toLowerCase() as UserRole,
      }
      await session.save()
      redirect('/')
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호가 틀렸습니다.'],
          studentId: [],
        },
      }
    }
  }
}
