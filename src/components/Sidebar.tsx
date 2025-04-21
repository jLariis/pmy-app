import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { Users, Briefcase, Truck, BarChart2, DollarSign, FileText, ChevronDown, ChevronRight } from "lucide-react"
import type React from "react" // Added import for React

interface MenuItem {
  name: string
  icon: React.ReactNode
  path: string
  subItems?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { name: "Administración", icon: <Users />, path: "/dashboard/administration" },
  { name: "Operación", icon: <Briefcase />, path: "/dashboard/operation" },
  { name: "Mantenimiento de Vehículos", icon: <Truck />, path: "/dashboard/vehicle-maintenance" },
  { name: "Reportes Gerenciales", icon: <BarChart2 />, path: "/dashboard/reports" },
  { name: "Nómina", icon: <DollarSign />, path: "/dashboard/payroll" },
  { name: "Facturas", icon: <FileText />, path: "/dashboard/invoices" },
]

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSubMenu = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const renderMenuItem = (item: MenuItem) => (
    <li key={item.name}>
      <Link
        to={item.path}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {item.icon}
        <span className="ml-3">{item.name}</span>
        {item.subItems && (
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleSubMenu(item.name)
            }}
            className="ml-auto"
          >
            {expandedItems.includes(item.name) ? <ChevronDown /> : <ChevronRight />}
          </button>
        )}
      </Link>
      {item.subItems && expandedItems.includes(item.name) && (
        <ul className="pl-4 mt-2 space-y-2">{item.subItems.map((subItem) => renderMenuItem(subItem))}</ul>
      )}
    </li>
  )

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">{menuItems.map(renderMenuItem)}</ul>
      </div>
    </aside>
  )
}
