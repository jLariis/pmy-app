import { Home, Settings, BarChart3, PieChart, Package } from "lucide-react"

export interface NavItem {
    title: string
    href: string
    icon: React.ElementType,
    roles?: string[]
}

export const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Ingresos",
      href: "/ingresos",
      icon: BarChart3,
    },
    {
      title: "Gastos",
      href: "/gastos",
      icon: PieChart,
    },
    {
      title: "Sucursales",
      href: "/sucursales",
      icon: Package,
    },
    {
      title: "Configuración",
      href: "/configuracion",
      icon: Settings,
    },
]