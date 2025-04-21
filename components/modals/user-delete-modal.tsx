"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

interface UserDeleteModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function UserDeleteModal({ user, isOpen, onClose, onConfirm }: UserDeleteModalProps) {
  if (!user) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de eliminar este usuario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El usuario <strong>{user.name}</strong> será eliminado permanentemente del
            sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
