"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { columns } from "./columns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  {
    id: "1",
    plate: "ABC-123",
    model: "Ford F-150",
    year: 2020,
    capacity: "1500 kg",
    status: "active",
  },
  {
    id: "2",
    plate: "XYZ-789",
    model: "Chevrolet Silverado",
    year: 2019,
    capacity: "2000 kg",
    status: "maintenance",
  },
  // Add more sample data as needed
]

export default function VehiclesPage() {
  const [isNewVehicleOpen, setIsNewVehicleOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader title="Vehículos" description="Gestión de la flota de vehículos" />
        <Dialog open={isNewVehicleOpen} onOpenChange={setIsNewVehicleOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-brand-brown hover:bg-brand-brown/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Vehículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Vehículo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="plate">Placa</Label>
                <Input id="plate" placeholder="ABC-123" className="rounded-md" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model">Modelo</Label>
                <Input id="model" placeholder="Ford F-150" className="rounded-md" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Año</Label>
                <Input id="year" type="number" placeholder="2023" className="rounded-md" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input id="capacity" placeholder="1500 kg" className="rounded-md" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select>
                  <SelectTrigger id="status" className="rounded-md">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="maintenance">En mantenimiento</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="rounded-md">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-brand-brown hover:bg-brand-brown/90 rounded-md"
                onClick={() => setIsNewVehicleOpen(false)}
              >
                Agregar Vehículo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
