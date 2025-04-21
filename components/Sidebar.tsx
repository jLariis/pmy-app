"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  Users,
  Briefcase,
  Truck,
  BarChart2,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronRight,
  Package,
  TruckIcon as TruckLoading,
  PenToolIcon as Tool,
  FileSpreadsheet,
  CreditCard,
  Receipt,
  Building,
  UserPlus,
  ShieldCheck,
} from "lucide-react"
import type React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MenuItem {
  name: string
  icon: React.ReactNode
  path: string
  subItems?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    name: "Administración",
    icon: <Users className="text-brand-brown" />,
    path: "/dashboard/administration",
    subItems: [
      { name: "Usuarios", icon: <UserPlus className="text-brand-brown" />, path: "/dashboard/administration/users" },
      { name: "Roles", icon: <ShieldCheck className="text-brand-brown" />, path: "/dashboard/administration/roles" },
      {
        name: "Sucursales",
        icon: <Building className="text-brand-brown" />,
        path: "/dashboard/administration/branches",
      },
    ],
  },
  {
    name: "Operación",
    icon: <Briefcase className="text-brand-brown" />,
    path: "/dashboard/operation",
    subItems: [
      { name: "Envíos", icon: <Package className="text-brand-brown" />, path: "/dashboard/operation/shipments" },
      { name: "Rutas", icon: <TruckLoading className="text-brand-brown" />, path: "/dashboard/operation/routes" },
    ],
  },
  {
    name: "Mantenimiento de Vehículos",
    icon: <Truck className="text-brand-brown" />,
    path: "/dashboard/vehicle-maintenance",
    subItems: [
      {
        name: "Programación",
        icon: <Tool className="text-brand-brown" />,
        path: "/dashboard/vehicle-maintenance/schedule",
      },
      {
        name: "Historial",
        icon: <FileSpreadsheet className="text-brand-brown" />,
        path: "/dashboard/vehicle-maintenance/history",
      },
    ],
  },
  {
    name: "Reportes Gerenciales",
    icon: <BarChart2 className="text-brand-brown" />,
    path: "/dashboard/reports",
    subItems: [
      { name: "Ventas", icon: <CreditCard className="text-brand-brown" />, path: "/dashboard/reports/sales" },
      {
        name: "Operaciones",
        icon: <TruckLoading className="text-brand-brown" />,
        path: "/dashboard/reports/operations",
      },
      { name: "Analítica", icon: <BarChart2 className="text-brand-brown" />, path: "/dashboard/analytics" },
    ],
  },
  {
    name: "Análisis de Ingresos",
    icon: <DollarSign className="text-brand-brown" />,
    path: "/dashboard/reports/ingresos",
  },
  {
    name: "Nómina",
    icon: <DollarSign className="text-brand-brown" />,
    path: "/dashboard/payroll",
    subItems: [
      { name: "Empleados", icon: <Users className="text-brand-brown" />, path: "/dashboard/payroll/employees" },
      { name: "Pagos", icon: <Receipt className="text-brand-brown" />, path: "/dashboard/payroll/payments" },
    ],
  },
  { name: "Facturas", icon: <FileText className="text-brand-brown" />, path: "/dashboard/invoices" },
]

export function Sidebar({ className = "" }: { className?: string }) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSubMenu = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const renderMenuItem = (item: MenuItem, isSubItem = false) => (
    <li key={item.path}>
      <Link
        href={item.path}
        className={`flex items-center p-2 text-brand-brown rounded-lg hover:bg-brand-yellow/10 group
          ${isSubItem ? "pl-10" : ""}`}
      >
        {item.icon}
        <span className="ml-3">{item.name}</span>
        {item.subItems && !isSubItem && (
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleSubMenu(item.name)
            }}
            className="ml-auto"
          >
            {expandedItems.includes(item.name) ? (
              <ChevronDown className="text-brand-brown" />
            ) : (
              <ChevronRight className="text-brand-brown" />
            )}
          </button>
        )}
      </Link>
      {item.subItems && expandedItems.includes(item.name) && (
        <ul className="mt-2">{item.subItems.map((subItem) => renderMenuItem(subItem, true))}</ul>
      )}
    </li>
  )

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0 ${className}`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
        <div className="flex justify-center mb-6">
          <Link href="/dashboard" className="flex flex-col items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Iyplqwe2PCDj3xPhqZ19VfqFKAmBV.png"
              alt="Del Yaqui Logo"
              width={150}
              height={150}
              priority
            />
          </Link>
        </div>
        <ul className="space-y-2 font-medium mb-6">{menuItems.map((item) => renderMenuItem(item))}</ul>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex items-center space-x-4">
            <Avatar className="bg-brand-orange">
              <AvatarFallback className="text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-brand-brown">Juan Doe</p>
              <p className="text-xs text-brand-brown/60">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
