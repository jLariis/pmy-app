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
import type { Route } from "@/app/dashboard/operation/routes/columns"

interface RouteDeleteModalProps {
  route: Route | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function RouteDeleteModal({ route, isOpen, onClose, onConfirm }: RouteDeleteModalProps) {
  if (!route) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar la ruta "{route.name}"? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
