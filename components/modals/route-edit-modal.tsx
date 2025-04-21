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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Route } from "@/app/dashboard/operation/routes/columns"

interface RouteEditModalProps {
  route: Route | null
  isOpen: boolean
  onClose: () => void
  onSave: (route: Route) => void
  drivers: { id: string; name: string }[]
}

export function RouteEditModal({ route, isOpen, onClose, onSave, drivers }: RouteEditModalProps) {
  const [editedRoute, setEditedRoute] = useState<Route | null>(null)

  useEffect(() => {
    if (route) {
      setEditedRoute({ ...route })
    }
  }, [route])

  if (!editedRoute) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Ruta</DialogTitle>
          <DialogDescription>Modifica los detalles de la ruta seleccionada.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Nombre:
            </Label>
            <Input
              id="edit-name"
              value={editedRoute.name}
              onChange={(e) => setEditedRoute({ ...editedRoute, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-areas" className="text-right">
              Áreas:
            </Label>
            <Textarea
              id="edit-areas"
              value={editedRoute.areas}
              onChange={(e) => setEditedRoute({ ...editedRoute, areas: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-zipcodes" className="text-right">
              Códigos Postales:
            </Label>
            <Input
              id="edit-zipcodes"
              value={editedRoute.zipCodes}
              onChange={(e) => setEditedRoute({ ...editedRoute, zipCodes: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-driver" className="text-right">
              Repartidor:
            </Label>
            <Select
              value={editedRoute.driver}
              onValueChange={(value) => setEditedRoute({ ...editedRoute, driver: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar repartidor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                {drivers.map((driver) => (
                  <SelectItem key={driver.id} value={driver.name}>
                    {driver.name}
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
              value={editedRoute.status}
              onValueChange={(value) => setEditedRoute({ ...editedRoute, status: value as "active" | "inactive" })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activa</SelectItem>
                <SelectItem value="inactive">Inactiva</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(editedRoute)}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
