"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, Briefcase, Truck, BarChart2, DollarSign, FileText, UserPlus, ShieldCheck, Building2, Package, Route, Wrench, History, CreditCard, Activity, Users2, Receipt, ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sidebarItems = [
  {
    title: "Administración",
    icon: Users,
    href: "/dashboard/administration",
    subItems: [
      { title: "Usuarios", href: "/dashboard/administration/users", icon: UserPlus },
      { title: "Roles", href: "/dashboard/administration/roles", icon: ShieldCheck },
      { title: "Sucursales", href: "/dashboard/administration/branches", icon: Building2 },
    ],
  },
  {
    title: "Operación",
    icon: Briefcase,
    href: "/dashboard/operation",
    subItems: [
      { title: "Envíos", href: "/dashboard/operation/shipments", icon: Package },
      { title: "Rutas", href: "/dashboard/operation/routes", icon: Route },
      { title: "Repartidores", href: "/dashboard/operation/drivers", icon: Users },
      { title: "Portal Repartidor", href: "/driver", icon: Truck },
    ],
  },
  {
    title: "Mantenimiento de Vehículos",
    icon: Truck,
    href: "/dashboard/vehicle-maintenance",
    subItems: [
      { title: "Programación", href: "/dashboard/vehicle-maintenance/schedule", icon: Wrench },
      { title: "Historial", href: "/dashboard/vehicle-maintenance/history", icon: History },
    ],
  },
  {
    title: "Reportes Gerenciales",
    icon: BarChart2,
    href: "/dashboard/reports",
    subItems: [
      { title: "Ventas", href: "/dashboard/reports/sales", icon: CreditCard },
      { title: "Operaciones", href: "/dashboard/reports/operations", icon: Activity },
    ],
  },
  {
    title: "Nómina",
    icon: DollarSign,
    href: "/dashboard/payroll",
    subItems: [
      { title: "Empleados", href: "/dashboard/payroll/employees", icon: Users2 },
      { title: "Pagos", href: "/dashboard/payroll/payments", icon: Receipt },
    ],
  },
  {
    title: "Facturas",
    icon: FileText,
    href: "/dashboard/invoices",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Initialize expanded items based on current path
  useEffect(() => {
    const currentPath = pathname
    const shouldExpand = sidebarItems
      .filter(item => item.subItems && currentPath.startsWith(item.href))
      .map(item => item.title)
    
    setExpandedItems(shouldExpand)
  }, [pathname])

  const toggleItem = (title: string) => {
    setExpandedItems((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title]
    )
  }

  const DesktopSidebar = () => (
    <ShadcnSidebar 
      className="hidden md:flex border-r border-border bg-brand-brown text-white"
      variant="sidebar"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-brand-brown/20 py-4">
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Iyplqwe2PCDj3xPhqZ19VfqFKAmBV.png"
              alt="Del Yaqui Logo"
              width={150}
              height={150}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((item) => (
          <SidebarGroup key={item.title} className="px-2 py-1">
            {item.subItems ? (
              <>
                <SidebarGroupLabel 
                  onClick={() => toggleItem(item.title)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-white/10",
                    pathname.startsWith(item.href) && "bg-white/10"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  {expandedItems.includes(item.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </SidebarGroupLabel>
                {expandedItems.includes(item.title) && (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === subItem.href}
                            className={cn(
                              "text-white/70 hover:bg-white/10 hover:text-white",
                              pathname === subItem.href && "bg-white/10 text-white"
                            )}
                          >
                            <Link href={subItem.href}>
                              <subItem.icon className="mr-2 h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "text-white hover:bg-white/10",
                      pathname === item.href && "bg-white/10"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-brand-brown/20 p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 bg-brand-orange">
            <AvatarFallback className="text-white">JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">Juan Doe</p>
            <p className="text-xs text-white/60">Administrador</p>
          </div>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )

  const MobileSidebar = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden fixed top-4 left-4 z-50">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-brand-brown w-[280px]">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b border-brand-brown/20">
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Iyplqwe2PCDj3xPhqZ19VfqFKAmBV.png"
                alt="Del Yaqui Logo"
                width={150}
                height={150}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2 px-4">
            {sidebarItems.map((item) => (
              <div key={item.title} className="py-1">
                {item.subItems ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleItem(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-white hover:bg-white/10",
                        pathname.startsWith(item.href) && "bg-white/10"
                      )}
                    >
                      <span className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </span>
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.title) && (
                      <div className="ml-4 space-y-1 pl-4 border-l border-brand-brown/20">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white",
                              pathname === subItem.href && "bg-white/10 text-white"
                            )}
                          >
                            <subItem.icon className="mr-2 h-3.5 w-3.5" />
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-white hover:bg-white/10",
                      pathname === item.href && "bg-white/10"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-brand-brown/20 p-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 bg-brand-orange">
                <AvatarFallback className="text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">Juan Doe</p>
                <p className="text-xs text-white/60">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <SidebarProvider>
      <DesktopSidebar />
      <MobileSidebar />
    </SidebarProvider>
  )
}