"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, LogOut, Menu, Package, PieChart, Settings, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { User } from "@/lib/types"
import { navItems } from "@/lib/constants"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

interface MainSidebarProps {
  user: User
  onLogout: () => void
}

export function MainSidebar({user, onLogout}: MainSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false) 

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileOpen(false)
  }

  // Renderizado condicional para evitar errores de hidratación
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Botón de menú móvil */}
      <div className="flex md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)} className="mr-2">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </div>

      {/* Sidebar móvil */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[280px] border-r">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo Del Yaqui" width={40} height={40} />
                <span className="text-lg font-semibold">Del Yaqui</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>
            <div className="flex-1 px-2 py-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn("justify-start w-full", pathname === item.href ? "font-medium" : "")}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Button>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar escritorio */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-background">
        <div className="flex flex-col flex-1">
          <div className="flex justify-center items-center py-6">
            <Image src="/logo.png" alt="Logo Del Yaqui" width={160} height={160} />
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon  // <- esto es clave

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("justify-start w-full", isActive ? "font-medium" : "")}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <Icon className="h-5 w-5" /> {/* aquí usamos el icono */}
                    <span className="ml-2">{item.title}</span>
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
