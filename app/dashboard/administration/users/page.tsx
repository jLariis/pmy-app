"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus, User, UserCheck, UserX } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserViewModal } from "@/components/modals/user-view-modal"
import { UserEditModal } from "@/components/modals/user-edit-modal"
import { UserDeleteModal } from "@/components/modals/user-delete-modal"

// Datos de muestra para usuarios
const initialData = [
  {
    id: "728ed52f",
    name: "Juan Pérez",
    email: "juan@delyaqui.com",
    role: "Administrador",
    status: "active",
    branch: "Hermosillo",
    lastLogin: "2023-05-15T10:30:00",
    avatar: "JP",
  },
  {
    id: "489e1d42",
    name: "María García",
    email: "maria@delyaqui.com",
    role: "Operador",
    status: "inactive",
    branch: "Ciudad Obregón",
    lastLogin: "2023-05-10T14:20:00",
    avatar: "MG",
  },
  {
    id: "623a9b5c",
    name: "Carlos Rodríguez",
    email: "carlos@delyaqui.com",
    role: "Conductor",
    status: "active",
    branch: "Guaymas",
    lastLogin: "2023-05-14T09:15:00",
    avatar: "CR",
  },
  {
    id: "912f4e7d",
    name: "Ana López",
    email: "ana@delyaqui.com",
    role: "Administrador",
    status: "active",
    branch: "Hermosillo",
    lastLogin: "2023-05-13T16:45:00",
    avatar: "AL",
  },
]

export function UsersClient() {
  const [data, setData] = useState(initialData)
  const [open, setOpen] = useState(false)
  const [viewUser, setViewUser] = useState<(typeof initialData)[0] | null>(null)
  const [editUser, setEditUser] = useState<(typeof initialData)[0] | null>(null)
  const [deleteUser, setDeleteUser] = useState<(typeof initialData)[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Función para manejar la visualización de un usuario
  const handleViewUser = (user: (typeof initialData)[0]) => {
    setViewUser(user)
    setIsViewOpen(true)
  }

  // Función para manejar la edición de un usuario
  const handleEditUser = (user: (typeof initialData)[0]) => {
    setEditUser({ ...user })
    setIsEditOpen(true)
  }

  // Función para manejar la eliminación de un usuario
  const handleDeleteUser = (user: (typeof initialData)[0]) => {
    setDeleteUser(user)
    setIsDeleteOpen(true)
  }

  // Función para guardar los cambios de edición
  const handleSaveEdit = (updatedUser: (typeof initialData)[0]) => {
    setData(data.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsEditOpen(false)
    setEditUser(null)
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (deleteUser) {
      setData(data.filter((user) => user.id !== deleteUser.id))
      setIsDeleteOpen(false)
      setDeleteUser(null)
    }
  }

  // Función para crear un nuevo usuario
  const handleCreateUser = (formData: FormData) => {
    const newUser = {
      id: Math.random().toString(36).substring(2, 10),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      status: "active" as "active" | "inactive",
      branch: formData.get("branch") as string,
      lastLogin: new Date().toISOString(),
      avatar: (formData.get("name") as string)
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }

    setData([...data, newUser])
    setOpen(false)
  }

  const activeUsers = data.filter((user) => user.status === "active").length
  const inactiveUsers = data.filter((user) => user.status === "inactive").length

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <PageHeader title="Usuarios" description="Gestión de usuarios del sistema" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo usuario aquí. Haga clic en guardar cuando termine.
              </DialogDescription>
            </DialogHeader>
            <form action={(formData) => handleCreateUser(formData)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rol
                  </Label>
                  <Select name="role" defaultValue="Operador">
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
                  <Label htmlFor="branch" className="text-right">
                    Sucursal
                  </Label>
                  <Select name="branch" defaultValue="Hermosillo">
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
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Usuario</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dashboard de usuarios */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados en el sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeUsers / data.length) * 100)}% del total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Inactivos</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((inactiveUsers / data.length) * 100)}% del total
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns(handleViewUser, handleEditUser, handleDeleteUser)} data={data} searchKey="name" />

      {/* Modales para ver, editar y eliminar usuarios */}
      <UserViewModal
        user={viewUser}
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <UserEditModal user={editUser} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={handleSaveEdit} />

      <UserDeleteModal
        user={deleteUser}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <UsersClient />
    </div>
  )
}
