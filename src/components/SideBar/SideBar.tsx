import {
  Building2,
  ChartColumnBig,
  ChevronRight,
  ChevronsUpDown,
  Lightbulb,
  User,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

// Menu items.
const items = [
  {
    title: '프로덕트',
    url: '/admin/product',
    icon: Lightbulb,
  },
  {
    title: '사용자',
    url: '/admin/user',
    icon: User,
  },
  {
    title: '팀',
    url: '/admin/team',
    icon: Building2,
  },
  {
    title: '통계',
    url: '/admin/statistics',
    icon: ChartColumnBig,
  },
]

const user = [
  {
    name: '신홍기',
    id: '202004073',
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Feature</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="flex-1">{item.title}</span>
                      <ChevronRight />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center gap-2 p-4">
        {user.map((user) => (
          <div className="flex flex-1 flex-col gap-0.5" key={user.id}>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs">{user.id}</p>
          </div>
        ))}

        <ChevronsUpDown />
      </SidebarFooter>
    </Sidebar>
  )
}
