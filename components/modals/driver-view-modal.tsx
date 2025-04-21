"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Trash } from "lucide-react"
import type { Driver } from "@/app/dashboard/operation/drivers/columns"

interface DriverViewModalProps {
  driver: Driver | null
  isOpen: boolean
  onClose: () => void
  onEdit: (driver: Driver) => void
  onDelete: (driver: Driver) => void
}

export function DriverViewModal({ driver, isOpen, onClose, onEdit, onDelete }: DriverViewModalProps) {
  if (!driver) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Repartidor</DialogTitle>
          <DialogDescription>Información detallada sobre el repartidor seleccionado.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {driver.avatar ||
                driver.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{driver.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {driver.id}</p>
            <Badge variant={driver.status === "active" ? "success" : "destructive"} className="mt-1">
              {driver.status === "active" ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Número de Licencia:</Label>
            <div className="col-span-3">{driver.licenseNumber}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Teléfono:</Label>
            <div className="col-span-3">{driver.phoneNumber}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Ruta Asignada:</Label>
            <div className="col-span-3">
              {driver.route === "Sin asignar" ? (
                <span className="text-muted-foreground">Sin asignar</span>
              ) : (
                driver.route
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Envíos Activos:</Label>
            <div className="col-span-3">{driver.activeDeliveries}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Completados Hoy:</Label>
            <div className="col-span-3">{driver.completedToday}</div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(driver)}>
              <Edit className="mr-2 h-4 w-4" /> Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(driver)}>
              <Trash className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          </div>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
