"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, Package, CheckCircle, Map, LogOut } from "lucide-react"
import Link from "next/link"

interface DriverNavProps {
  driverName: string
  driverRoute: string
  driverAvatar: string
}

export function DriverNav({ driverName, driverRoute, driverAvatar }: DriverNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-brand-brown text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Menú del Repartidor</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 bg-brand-orange">
              <AvatarFallback>{driverAvatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{driverName}</p>
              <p className="text-sm opacity-80">{driverRoute}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start text-white" onClick={() => setOpen(false)}>
              <Package className="mr-2 h-5 w-5" />
              Mis Entregas
            </Button>
            <Button variant="ghost" className="justify-start text-white" onClick={() => setOpen(false)}>
              <CheckCircle className="mr-2 h-5 w-5" />
              Completadas
            </Button>
            <Button variant="ghost" className="justify-start text-white" onClick={() => setOpen(false)}>
              <Map className="mr-2 h-5 w-5" />
              Ver Mapa
            </Button>
          </nav>
          <div className="mt-auto">
            <Link href="/login">
              <Button variant="ghost" className="justify-start text-white w-full">
                <LogOut className="mr-2 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
