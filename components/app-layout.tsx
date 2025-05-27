"use client"

import type * as React from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AppLayoutProps {
  children: React.ReactNode
}

const user = {
  name: "Juan",
  lastName: "Pérez",
  email: "juan.perez@delyaqui.com.mx",
  role: "admin",
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const { toast } = useToast()

  const handleLogout = async () => { 
    try {
      //await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión correctamente",
        variant: "destructive",
      })
    }
  }
 
  return (
    <div className="flex h-screen bg-gray-100">
      <MainSidebar user={user} onLogout={handleLogout}/>
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 shadow-sm">
          <div className="hidden md:block">
            
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {user.name ? `${user.name} ${user.lastName || ""}` : user.email}
              </span>
              {user.role === "admin" && (
                <Badge variant="secondary" className="text-xs">
                  Admin
                </Badge>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
              Cerrar Sesión
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
