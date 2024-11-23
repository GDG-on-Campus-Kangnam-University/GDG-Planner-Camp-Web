'use server'

import db from '@/lib/db'
import getSession from '@/lib/sessions'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  studentId: z.string({
    required_error: 'StudentId is required',
  }),
  password: z.string({
    required_error: 'Password is required',
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
          studentId: ['올바르지 않은 학번입니다.'],
          password: [],
        },
      }
    }

    const user = await db.user.findUnique({
      where: {
        user_id: parsedStudentId,
      },
      select: {
        user_id: true,
        password: true,
      },
    })

    if (!user) {
      return {
        fieldErrors: {
          studentId: ['등록되지 않은 사용자입니다.'],
          password: [],
        },
      }
    }

    const ok = await bcrypt.compare(password, user.password ?? 'xxxx')

    if (ok) {
      const session = await getSession()
      session.id = user.user_id
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
