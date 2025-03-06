"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
} from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleItem = (title: string) => {
    setOpenItems((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-brand-brown">
      <div className="flex h-16 items-center justify-center border-b border-brand-brown/10">
        <Link href="/dashboard">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Iyplqwe2PCDj3xPhqZ19VfqFKAmBV.png"
            alt="Del Yaqui Logo"
            width={600}
            height={600}
            className="h-16 w-auto"
            priority
          />
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.subItems ? (
                <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-white hover:bg-white/10",
                        pathname.startsWith(item.href) && "bg-white/10",
                      )}
                    >
                      <span className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </span>
                      {openItems.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.href}
                        variant="ghost"
                        asChild
                        className={cn(
                          "w-full justify-start pl-9 text-sm text-white/70 hover:bg-white/10 hover:text-white",
                          pathname === subItem.href && "bg-white/10 text-white",
                        )}
                      >
                        <Link href={subItem.href}>
                          <subItem.icon className="mr-2 h-3.5 w-3.5" />
                          {subItem.title}
                        </Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start text-white hover:bg-white/10",
                    pathname === item.href && "bg-white/10",
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      <div className="hidden md:block h-full">
        <SidebarContent />
      </div>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-brand-brown">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

