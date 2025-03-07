"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  Briefcase,
  Truck,
  BarChart2,
  DollarSign,
  FileText,
  UserPlus,
  ShieldCheck,
  Building2,
  Package,
  Route,
  Wrench,
  History,
  CreditCard,
  Activity,
  Users2,
  Receipt,
  ChevronDown,
  ChevronRight,
  Menu,
  Home,
  Settings,
  LogOut,
} from "lucide-react"
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
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

export function AppSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  useEffect(() => {
    const currentPath = pathname
    const shouldExpand = sidebarItems
      .filter((item) => item.subItems && currentPath.startsWith(item.href))
      .map((item) => item.title)

    setExpandedItems(shouldExpand)
  }, [pathname])

  const toggleItem = (title: string) => {
    setExpandedItems((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  return (
    <ShadcnSidebar className="bg-brand-brown text-white">
      <SidebarHeader className="py-3 px-2">
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Iyplqwe2PCDj3xPhqZ19VfqFKAmBV.png"
              alt="Del Yaqui Logo"
              width={250}
              height={250}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {sidebarItems.map((item) => (
          <SidebarGroup key={item.title} className="mb-0.5">
            {item.subItems ? (
              <>
                <SidebarGroupLabel
                  onClick={() => toggleItem(item.title)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 w-full",
                    pathname.startsWith(item.href) && "bg-white/20 text-white font-semibold",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                  {expandedItems.includes(item.title) ? (
                    <ChevronDown className="h-4 w-4 text-white/70 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-white/70 shrink-0" />
                  )}
                </SidebarGroupLabel>
                {expandedItems.includes(item.title) && (
                  <SidebarGroupContent>
                    <SidebarMenu className="mt-0.5">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.href} className="px-3">
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === subItem.href}
                            className={cn(
                              "text-white/80 hover:bg-white/10 hover:text-white w-full rounded-md py-1.5",
                              pathname === subItem.href && "bg-white/20 text-white font-medium",
                            )}
                          >
                            <Link href={subItem.href} className="flex items-center gap-2 px-3">
                              <subItem.icon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{subItem.title}</span>
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
                <SidebarMenuItem className="px-3">
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "text-white hover:bg-white/10 w-full rounded-md py-1.5",
                      pathname === item.href && "bg-white/20 font-medium",
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2 px-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 bg-brand-orange">
            <AvatarFallback className="text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Juan Doe</p>
            <p className="text-xs text-white/70 truncate">Administrador</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Configuración</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Cerrar sesión</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  )
}

// Mobile sidebar component
export function MobileSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Initialize expanded items based on current path
  useEffect(() => {
    const currentPath = pathname
    const shouldExpand = sidebarItems
      .filter((item) => item.subItems && currentPath.startsWith(item.href))
      .map((item) => item.title)

    setExpandedItems(shouldExpand)
  }, [pathname])

  const toggleItem = (title: string) => {
    setExpandedItems((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px] bg-brand-brown text-white">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center">
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
          <div className="flex-1 overflow-auto py-2 px-4">
            {sidebarItems.map((item) => (
              <div key={item.title} className="py-1">
                {item.subItems ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleItem(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10",
                        pathname.startsWith(item.href) && "bg-white/20 text-white font-semibold",
                      )}
                    >
                      <span className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </span>
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4 text-white/70" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-white/70" />
                      )}
                    </button>
                    {expandedItems.includes(item.title) && (
                      <div className="ml-4 space-y-1 pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center rounded-md px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white w-full",
                              pathname === subItem.href && "bg-white/20 text-white font-medium",
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
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10",
                      pathname === item.href && "bg-white/20 font-semibold",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 bg-brand-orange">
                <AvatarFallback className="text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">Juan Doe</p>
                <p className="text-xs text-white/70">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Main Sidebar component that combines desktop and mobile versions
export function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  )
}

