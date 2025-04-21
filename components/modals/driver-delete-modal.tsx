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
import type { Driver } from "@/app/dashboard/operation/drivers/columns"

interface DriverDeleteModalProps {
  driver: Driver | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DriverDeleteModal({ driver, isOpen, onClose, onConfirm }: DriverDeleteModalProps) {
  if (!driver) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar al repartidor "{driver.name}"? Esta acción no se puede deshacer.
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
