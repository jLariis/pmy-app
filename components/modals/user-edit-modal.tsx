"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  branch?: string
  lastLogin?: string
  avatar?: string
}

interface UserEditModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onSave: (user: User) => void
}

export function UserEditModal({ user, isOpen, onClose, onSave }: UserEditModalProps) {
  const [editedUser, setEditedUser] = useState<User | null>(user)

  // Actualizar el estado cuando cambia el usuario
  if (user && (!editedUser || user.id !== editedUser.id)) {
    setEditedUser({ ...user })
  }

  if (!editedUser) return null

  const handleSave = () => {
    onSave(editedUser)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Modifique los detalles del usuario y haga clic en guardar cuando termine.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Nombre
            </Label>
            <Input
              id="edit-name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-email" className="text-right">
              Email
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-role" className="text-right">
              Rol
            </Label>
            <Select value={editedUser.role} onValueChange={(value) => setEditedUser({ ...editedUser, role: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Operador">Operador</SelectItem>
                <SelectItem value="Conductor">Conductor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-branch" className="text-right">
              Sucursal
            </Label>
            <Select
              value={editedUser.branch || ""}
              onValueChange={(value) => setEditedUser({ ...editedUser, branch: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hermosillo">Hermosillo</SelectItem>
                <SelectItem value="Ciudad Obregón">Ciudad Obregón</SelectItem>
                <SelectItem value="Guaymas">Guaymas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-status" className="text-right">
              Estado
            </Label>
            <Select
              value={editedUser.status}
              onValueChange={(value: "active" | "inactive") => setEditedUser({ ...editedUser, status: value })}
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
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
