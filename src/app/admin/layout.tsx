import { AppSidebar } from '@/components/SideBar/SideBar'
import { SidebarProvider } from '@/components/ui/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <AppSidebar />
        {children}
      </div>
    </SidebarProvider>
  )
}

export default Layout
