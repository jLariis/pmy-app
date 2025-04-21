"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/ui/data-table"
import { columns, type Driver } from "./columns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Users, TruckIcon, PackageIcon, Eye, Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DriverViewModal } from "@/components/modals/driver-view-modal"
import { DriverEditModal } from "@/components/modals/driver-edit-modal"
import { DriverDeleteModal } from "@/components/modals/driver-delete-modal"

// Datos de ejemplo
const initialDrivers: Driver[] = [
  {
    id: "1",
    name: "Juan Pérez",
    licenseNumber: "B12345678",
    phoneNumber: "600123456",
    status: "active",
    activeDeliveries: 5,
    completedToday: 7,
    route: "Ruta Norte",
  },
  {
    id: "2",
    name: "María López",
    licenseNumber: "B87654321",
    phoneNumber: "600654321",
    status: "active",
    activeDeliveries: 3,
    completedToday: 5,
    route: "Ruta Sur",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    licenseNumber: "B11223344",
    phoneNumber: "600112233",
    status: "inactive",
    activeDeliveries: 0,
    completedToday: 0,
    route: "Sin asignar",
  },
  {
    id: "4",
    name: "Ana Martínez",
    licenseNumber: "B44332211",
    phoneNumber: "600443322",
    status: "active",
    activeDeliveries: 8,
    completedToday: 2,
    route: "Ruta Oeste",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    licenseNumber: "B99887766",
    phoneNumber: "600998877",
    status: "active",
    activeDeliveries: 0,
    completedToday: 10,
    route: "Sin asignar",
  },
]

// Lista de rutas para el modal de edición
const routes = [
  { id: "1", name: "Ruta Norte" },
  { id: "2", name: "Ruta Sur" },
  { id: "3", name: "Ruta Este" },
  { id: "4", name: "Ruta Oeste" },
]

export default function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers)
  const [open, setOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)

  // Función para manejar la visualización de un conductor
  const handleViewDriver = (driver: Driver) => {
    setSelectedDriver({
      ...driver,
      available: driver.status === "active",
      avatar: driver.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    })
    setIsViewModalOpen(true)
  }

  // Función para manejar la edición de un conductor
  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver({
      ...driver,
      available: driver.status === "active",
      avatar: driver.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    })
    setIsEditModalOpen(true)
  }

  // Función para manejar la eliminación de un conductor
  const handleDeleteDriver = (driver: Driver) => {
    setSelectedDriver(driver)
    setIsDeleteModalOpen(true)
  }

  // Función para crear un nuevo conductor
  const handleCreateDriver = (formData: FormData) => {
    const newDriver: Driver = {
      id: Math.random().toString(36).substring(2, 10),
      name: formData.get("name") as string,
      licenseNumber: formData.get("licenseNumber") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      route: (formData.get("route") as string) || "Sin asignar",
      status: formData.get("status") as "active" | "inactive",
      activeDeliveries: 0,
      completedToday: 0,
    }

    setDrivers([...drivers, newDriver])
    setOpen(false)
  }

  // Función para guardar los cambios de edición
  const handleSaveEdit = (updatedDriver: any) => {
    const updatedDrivers = drivers.map((driver) =>
      driver.id === updatedDriver.id
        ? {
            ...driver,
            name: updatedDriver.name,
            licenseNumber: updatedDriver.licenseNumber,
            phoneNumber: updatedDriver.phoneNumber,
            route: updatedDriver.route,
            status: updatedDriver.status,
          }
        : driver,
    )
    setDrivers(updatedDrivers)
    setIsEditModalOpen(false)
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (selectedDriver) {
      setDrivers(drivers.filter((driver) => driver.id !== selectedDriver.id))
      setIsDeleteModalOpen(false)
      setSelectedDriver(null)
    }
  }

  const activeDrivers = drivers.filter((driver) => driver.status === "active")
  const totalActiveDeliveries = drivers.reduce((acc, driver) => acc + driver.activeDeliveries, 0)
  const totalCompletedToday = drivers.reduce((acc, driver) => acc + driver.completedToday, 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between">
        <PageHeader heading="Gestión de Repartidores" description="Administra los repartidores de la empresa." />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Repartidor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Repartidor</DialogTitle>
              <DialogDescription>Completa el formulario para crear un nuevo repartidor.</DialogDescription>
            </DialogHeader>
            <form action={(formData) => handleCreateDriver(formData)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="licenseNumber" className="text-right">
                    Número de Licencia
                  </Label>
                  <Input id="licenseNumber" name="licenseNumber" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Teléfono
                  </Label>
                  <Input id="phoneNumber" name="phoneNumber" className="col-span-3" placeholder="600123456" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="route" className="text-right">
                    Ruta Asignada
                  </Label>
                  <Input id="route" name="route" className="col-span-3" placeholder="Sin asignar" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Estado
                  </Label>
                  <Select name="status" defaultValue="active">
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
                <Button type="submit">Guardar Repartidor</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Repartidores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">{activeDrivers.length}</span> activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repartidores con Ruta</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers.filter((d) => d.route !== "Sin asignar").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500 font-medium">
                {drivers.filter((d) => d.route === "Sin asignar").length}
              </span>{" "}
              sin asignar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envíos Activos</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveDeliveries}</div>
            <p className="text-xs text-muted-foreground">En proceso de entrega</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados Hoy</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletedToday}</div>
            <p className="text-xs text-muted-foreground">
              {activeDrivers.length > 0
                ? `${Math.round(totalCompletedToday / activeDrivers.length)} por repartidor`
                : "Sin repartidores activos"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="table">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="table">Tabla</TabsTrigger>
            <TabsTrigger value="cards">Tarjetas</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="table" className="space-y-4">
          <DataTable
            columns={columns(handleViewDriver, handleEditDriver, handleDeleteDriver)}
            data={drivers}
            searchKey="name"
          />
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drivers.map((driver) => (
              <Card key={driver.id} className={driver.status === "inactive" ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{driver.name}</CardTitle>
                    <Badge variant={driver.status === "active" ? "success" : "destructive"}>
                      {driver.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <TruckIcon className="h-3 w-3" />
                      <span className="truncate">
                        {driver.route === "Sin asignar" ? (
                          <span className="text-muted-foreground">Sin ruta asignada</span>
                        ) : (
                          driver.route
                        )}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Licencia:</span>
                      <span className="font-medium">{driver.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Teléfono:</span>
                      <span className="font-medium">{driver.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envíos Activos:</span>
                      <Badge variant="secondary">{driver.activeDeliveries}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completados Hoy:</span>
                      <Badge variant="secondary">{driver.completedToday}</Badge>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDriver(driver)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditDriver(driver)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteDriver(driver)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Usar los componentes modales existentes */}
      <DriverViewModal
        driver={selectedDriver}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={handleEditDriver}
        onDelete={handleDeleteDriver}
      />

      <DriverEditModal
        driver={selectedDriver}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        routes={routes}
      />

      <DriverDeleteModal
        driver={selectedDriver}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
