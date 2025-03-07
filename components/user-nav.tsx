"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, HelpCircle, Bell, LogOut, UserCog, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserNav() {
  const [notifications] = useState(3) // Example notification count

  return (
    <div className="flex items-center gap-4">
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
              >
                {notifications}
              </Badge>
            )}
            <span className="sr-only">Notificaciones</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-80 overflow-auto">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Nuevo envío asignado</p>
                <p className="text-xs text-muted-foreground">Se ha asignado un nuevo envío a la ruta Norte</p>
                <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Actualización de sistema</p>
                <p className="text-xs text-muted-foreground">El sistema se actualizará esta noche a las 22:00</p>
                <p className="text-xs text-muted-foreground">Hace 2 horas</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Reporte mensual disponible</p>
                <p className="text-xs text-muted-foreground">El reporte de operaciones de mayo está disponible</p>
                <p className="text-xs text-muted-foreground">Hace 1 día</p>
              </div>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer justify-center font-medium text-brand-brown">
            Ver todas las notificaciones
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-brand-brown/20">
              <AvatarImage src="/avatars/01.png" alt="@usuario" />
              <AvatarFallback className="bg-brand-brown text-white">JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Juan Doe</p>
              <p className="text-xs leading-none text-muted-foreground">juan@delyaqui.com</p>
              <div className="mt-1.5">
                <Badge
                  variant="outline"
                  className="text-[10px] bg-brand-brown/10 text-brand-brown border-brand-brown/20"
                >
                  Administrador
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <UserCog className="mr-2 h-4 w-4" />
              <span>Preferencias</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>Roles y Permisos</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ayuda y Soporte</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Link href="/login">
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}