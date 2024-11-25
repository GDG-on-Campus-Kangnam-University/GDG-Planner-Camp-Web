import db from '@/lib/db'
import getSession from '@/lib/sessions'
import { notFound } from 'next/navigation'

export async function getUser() {
  const session = await getSession()
  if (session.user?.id) {
    const user = await db.user.findUnique({
      where: {
        user_id: session.user?.id,
      },
    })
    if (user) {
      return user
    }
  }
  notFound()
}
