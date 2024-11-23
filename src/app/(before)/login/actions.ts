'use server'

import db from '@/lib/db'
import getSession, { UserRole } from '@/lib/sessions'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const formSchema = z.object({
  studentId: z.string().nonempty('학번을 입력해주세요.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
})

export async function logIn(formData: FormData) {
  const data = {
    studentId: formData.get('studentId'),
    password: formData.get('password'),
  }

  const result = formSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    }
  } else {
    const { studentId, password } = result.data

    // studentId를 정수로 변환
    const parsedStudentId = parseInt(studentId, 10)
    if (isNaN(parsedStudentId)) {
      return {
        success: false,
        fieldErrors: {
          studentId: ['학번은 숫자여야 합니다.'],
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
        success: false,
        fieldErrors: {
          studentId: ['사용자를 찾을 수 없습니다.'],
          password: [],
        },
      }
    }

    // 비밀번호 비교
    const ok = await bcrypt.compare(password, user.password ?? 'xxxx')

    if (ok) {
      const session = await getSession()
      session.user = {
        id: user.user_id,
        role: (user.role as string).toLowerCase() as UserRole,
      }
      await session.save()
      return { success: true } // 리다이렉트 대신 성공 상태 반환
    } else {
      return {
        success: false,
        fieldErrors: {
          password: ['비밀번호가 틀렸습니다.'],
          studentId: [],
        },
      }
    }
  }
}
