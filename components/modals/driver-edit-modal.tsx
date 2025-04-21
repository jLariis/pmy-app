"use client"

import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Driver } from "@/app/dashboard/operation/drivers/columns"

interface DriverEditModalProps {
  driver: Driver | null
  isOpen: boolean
  onClose: () => void
  onSave: (driver: Driver) => void
  routes: { id: string; name: string }[]
}

export function DriverEditModal({ driver, isOpen, onClose, onSave, routes }: DriverEditModalProps) {
  const [editedDriver, setEditedDriver] = useState<Driver | null>(null)

  useEffect(() => {
    if (driver) {
      setEditedDriver({ ...driver })
    }
  }, [driver])

  if (!editedDriver) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Repartidor</DialogTitle>
          <DialogDescription>Modifica los detalles del repartidor seleccionado.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Nombre:
            </Label>
            <Input
              id="edit-name"
              value={editedDriver.name}
              onChange={(e) => setEditedDriver({ ...editedDriver, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-license" className="text-right">
              Número de Licencia:
            </Label>
            <Input
              id="edit-license"
              value={editedDriver.licenseNumber}
              onChange={(e) => setEditedDriver({ ...editedDriver, licenseNumber: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-phone" className="text-right">
              Teléfono:
            </Label>
            <Input
              id="edit-phone"
              value={editedDriver.phoneNumber}
              onChange={(e) => setEditedDriver({ ...editedDriver, phoneNumber: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-route" className="text-right">
              Ruta Asignada:
            </Label>
            <Select
              value={editedDriver.route}
              onValueChange={(value) => setEditedDriver({ ...editedDriver, route: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar ruta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                {routes.map((route) => (
                  <SelectItem key={route.id} value={route.name}>
                    {route.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-status" className="text-right">
              Estado:
            </Label>
            <Select
              value={editedDriver.status}
              onValueChange={(value) => setEditedDriver({ ...editedDriver, status: value as "active" | "inactive" })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(editedDriver)}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
