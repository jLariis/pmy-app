import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const data = [
  {
    id: "1",
    name: "Administrador",
    description: "Acceso completo al sistema",
    usersCount: 5,
  },
  {
    id: "2",
    name: "Operador",
    description: "Gestión de envíos y rutas",
    usersCount: 12,
  },
  {
    id: "3",
    name: "Repartidor",
    description: "Acceso a la aplicación móvil de entregas",
    usersCount: 25,
  },
  {
    id: "4",
    name: "Gerente",
    description: "Acceso a reportes y dashboards",
    usersCount: 3,
  },
]

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Roles" description="Gestión de roles y permisos del sistema" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-brand-brown hover:bg-brand-brown/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Rol
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Rol</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo rol. Haga clic en guardar cuando termine.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Input id="description" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-brown hover:bg-brand-brown/90">
                Guardar Rol
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}