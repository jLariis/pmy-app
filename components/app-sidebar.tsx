"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Home, LogOut, Package, PieChart, Settings } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // En una aplicación real, aquí se manejaría el cierre de sesión
    router.push("/login")
  }

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Ingresos",
      href: "/ingresos",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Gastos",
      href: "/gastos",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "Sucursales",
      href: "/sucursales",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Configuración",
      href: "/configuracion",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <Sidebar className="border-none" {...props}>
      <SidebarHeader className="flex items-center gap-2 p-4 bg-primary text-primary-foreground border-none">
        <Image src="/logo.png" alt="Logo Del Yaqui" width={40} height={40} />
        <span className="text-lg font-semibold text-primary-foreground">Del Yaqui</span>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-gray-900 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className={`text-gray-800 dark:text-gray-200 ${pathname === item.href ? "bg-secondary/20 text-primary font-medium" : "hover:bg-secondary/10"}`}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <span className={`${pathname === item.href ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
                    {item.icon}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Cerrar Sesión"
              className="text-gray-800 dark:text-gray-200 hover:bg-secondary/10"
            >
              <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
