"use client"

import * as React from "react"
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  IconSection,
  IconSettings
} from "@tabler/icons-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import checkAuthStatus from "@/utility/authStatus"


const { user } = await checkAuthStatus()
const { role } = user || { role: 'guest' }


const navMainItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: IconDashboard,
  },
]
console.log(role);
if (role === 'Admin') {
  navMainItems.push(
    {
      title: "Manage Doctors",
      url: "/dashboard/admin/manage-doctors",
      icon: IconSection
    },
    {
      title: "Manage Patients",
      url: "/dashboard/admin/manage-patients",
      icon: IconSection
    },
  )
}

const data = {
  user: {
    name: user?.name,
    email: user?.email,
    avatar: user?.imageUrl,
  },
  navMain: navMainItems,
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
