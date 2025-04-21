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
import { Edit, Trash } from "lucide-react"
import type { Route } from "@/app/dashboard/operation/routes/columns"

interface RouteViewModalProps {
  route: Route | null
  isOpen: boolean
  onClose: () => void
  onEdit: (route: Route) => void
  onDelete: (route: Route) => void
}

export function RouteViewModal({ route, isOpen, onClose, onEdit, onDelete }: RouteViewModalProps) {
  if (!route) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles de la Ruta</DialogTitle>
          <DialogDescription>Información detallada sobre la ruta seleccionada.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">ID:</Label>
            <div className="col-span-3">{route.id}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Nombre:</Label>
            <div className="col-span-3">{route.name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Áreas:</Label>
            <div className="col-span-3">{route.areas}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Códigos Postales:</Label>
            <div className="col-span-3">{route.zipCodes}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Repartidor:</Label>
            <div className="col-span-3">{route.driver}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Envíos:</Label>
            <div className="col-span-3">{route.shipments}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Estado:</Label>
            <div className="col-span-3">
              <Badge variant={route.status === "active" ? "success" : "destructive"}>
                {route.status === "active" ? "Activa" : "Inactiva"}
              </Badge>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(route)}>
              <Edit className="mr-2 h-4 w-4" /> Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(route)}>
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
