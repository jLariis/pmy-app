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
    name: "Hermosillo Centro",
    address: "Blvd. Luis Encinas 100, Centro",
    city: "Hermosillo",
    state: "Sonora",
    zipCode: "83000",
    phone: "6621234567",
    manager: "Carlos Rodríguez",
  },
  {
    id: "2",
    name: "Ciudad Obregón",
    address: "Calle 5 de Febrero 234, Centro",
    city: "Ciudad Obregón",
    state: "Sonora",
    zipCode: "85000",
    phone: "6449876543",
    manager: "Ana López",
  },
  {
    id: "3",
    name: "Guaymas",
    address: "Av. Serdán 45, Centro",
    city: "Guaymas",
    state: "Sonora",
    zipCode: "85400",
    phone: "6221234567",
    manager: "Roberto Sánchez",
  },
]

export default function BranchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Sucursales" description="Gestión de sucursales de la empresa" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-brand-brown hover:bg-brand-brown/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Sucursal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Sucursal</DialogTitle>
              <DialogDescription>
                Ingrese los detalles de la nueva sucursal. Haga clic en guardar cuando termine.
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
                <Label htmlFor="address" className="text-right">
                  Dirección
                </Label>
                <Input id="address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  Ciudad
                </Label>
                <Input id="city" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  Estado
                </Label>
                <Input id="state" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zipCode" className="text-right">
                  Código Postal
                </Label>
                <Input id="zipCode" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Teléfono
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manager" className="text-right">
                  Gerente
                </Label>
                <Input id="manager" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-brown hover:bg-brand-brown/90">
                Guardar Sucursal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}