"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

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

interface UserViewModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UserViewModal({ user, isOpen, onClose, onEdit, onDelete }: UserViewModalProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Usuario</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 bg-brand-brown text-white">
            <AvatarFallback>{user.avatar || user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant={user.status === "active" ? "success" : "destructive"} className="ml-auto">
            {user.status === "active" ? "Activo" : "Inactivo"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Información del Usuario</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rol:</span>
                <span>{user.role}</span>
              </div>
              {user.branch && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sucursal:</span>
                  <span>{user.branch}</span>
                </div>
              )}
              {user.lastLogin && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Último acceso:</span>
                  <span>{new Date(user.lastLogin).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Permisos y Acceso</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge variant={user.status === "active" ? "success" : "destructive"}>
                  {user.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nivel de acceso:</span>
                <Badge variant="outline">
                  {user.role === "Administrador" ? "Alto" : user.role === "Operador" ? "Medio" : "Bajo"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={() => onEdit(user)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={() => onDelete(user)}>
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
