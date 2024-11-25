import getSession from '@/lib/sessions'
import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

const LogoutComponent = () => {
  const logOut = async () => {
    'use server'
    const session = await getSession()
    await session.destroy()
    redirect('/')
  }
  return (
    <form action={logOut}>
      <button>
        <LogOut />
      </button>
    </form>
  )
}

export default LogoutComponent
