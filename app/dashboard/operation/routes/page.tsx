"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/ui/data-table"
import { columns, type Route } from "./columns"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, MapPin, TruckIcon, PackageIcon, Eye, Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RouteViewModal } from "@/components/modals/route-view-modal"
import { RouteEditModal } from "@/components/modals/route-edit-modal"
import { RouteDeleteModal } from "@/components/modals/route-delete-modal"

// Datos de ejemplo
const initialRoutes: Route[] = [
  {
    id: "1",
    name: "Ruta Norte",
    zipCodes: "28001, 28002, 28003",
    driver: "Juan Pérez",
    status: "active",
    areas: "Chamartín, Salamanca, Retiro",
    shipments: 12,
  },
  {
    id: "2",
    name: "Ruta Sur",
    zipCodes: "28045, 28026, 28041",
    driver: "María López",
    status: "active",
    areas: "Arganzuela, Usera, Villaverde",
    shipments: 8,
  },
  {
    id: "3",
    name: "Ruta Este",
    zipCodes: "28032, 28043, 28033",
    driver: "Carlos Rodríguez",
    status: "inactive",
    areas: "Ciudad Lineal, Hortaleza, San Blas",
    shipments: 0,
  },
  {
    id: "4",
    name: "Ruta Oeste",
    zipCodes: "28011, 28008, 28015",
    driver: "Ana Martínez",
    status: "active",
    areas: "Moncloa, Centro, Chamberí",
    shipments: 15,
  },
  {
    id: "5",
    name: "Ruta Centro",
    zipCodes: "28004, 28005, 28012",
    driver: "Sin asignar",
    status: "inactive",
    areas: "Centro, Sol, Lavapiés",
    shipments: 0,
  },
]

// Lista de conductores para el modal de edición
const drivers = [
  { id: "1", name: "Juan Pérez" },
  { id: "2", name: "María López" },
  { id: "3", name: "Carlos Rodríguez" },
  { id: "4", name: "Ana Martínez" },
]

export default function RoutesPage() {
  const [routes, setRoutes] = useState(initialRoutes)
  const [open, setOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)

  // Función para manejar la visualización de una ruta
  const handleViewRoute = (route: Route) => {
    setSelectedRoute(route)
    setIsViewModalOpen(true)
  }

  // Función para manejar la edición de una ruta
  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route)
    setIsEditModalOpen(true)
  }

  // Función para manejar la eliminación de una ruta
  const handleDeleteRoute = (route: Route) => {
    setSelectedRoute(route)
    setIsDeleteModalOpen(true)
  }

  // Función para crear una nueva ruta
  const handleCreateRoute = (formData: FormData) => {
    const newRoute: Route = {
      id: Math.random().toString(36).substring(2, 10),
      name: formData.get("name") as string,
      areas: formData.get("areas") as string,
      zipCodes: formData.get("zipCodes") as string,
      driver: (formData.get("driver") as string) || "Sin asignar",
      status: formData.get("status") as "active" | "inactive",
      shipments: 0,
    }

    setRoutes([...routes, newRoute])
    setOpen(false)
  }

  // Función para guardar los cambios de edición
  const handleSaveEdit = (updatedRoute: Route) => {
    const updatedRoutes = routes.map((route) => (route.id === updatedRoute.id ? updatedRoute : route))
    setRoutes(updatedRoutes)
    setIsEditModalOpen(false)
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (selectedRoute) {
      setRoutes(routes.filter((route) => route.id !== selectedRoute.id))
      setIsDeleteModalOpen(false)
      setSelectedRoute(null)
    }
  }

  const activeRoutes = routes.filter((route) => route.status === "active")
  const totalShipments = routes.reduce((acc, route) => acc + route.shipments, 0)
  const totalCompleted = routes.reduce((acc, route) => acc + route.shipments * 0.4, 0) // Ejemplo: 40% completados

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between">
        <PageHeader heading="Gestión de Rutas" description="Administra las rutas de entrega de la empresa." />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Nueva Ruta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Ruta</DialogTitle>
              <DialogDescription>Completa el formulario para crear una nueva ruta de entrega.</DialogDescription>
            </DialogHeader>
            <form action={(formData) => handleCreateRoute(formData)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="areas" className="text-right">
                    Áreas
                  </Label>
                  <Textarea id="areas" name="areas" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zipCodes" className="text-right">
                    Códigos Postales
                  </Label>
                  <Input
                    id="zipCodes"
                    name="zipCodes"
                    className="col-span-3"
                    placeholder="28001, 28002, 28003"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver" className="text-right">
                    Repartidor
                  </Label>
                  <Input id="driver" name="driver" className="col-span-3" placeholder="Sin asignar" />
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
                      <SelectItem value="active">Activa</SelectItem>
                      <SelectItem value="inactive">Inactiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Ruta</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rutas Activas</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRoutes.length}</div>
            <p className="text-xs text-muted-foreground">De un total de {routes.length} rutas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envíos Asignados</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShipments}</div>
            <p className="text-xs text-muted-foreground">En todas las rutas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados Hoy</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalCompleted)}</div>
            <p className="text-xs text-muted-foreground">
              {totalShipments > 0 ? Math.round((totalCompleted / totalShipments) * 100) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(routes.flatMap((r) => r.areas.split(", "))).size}</div>
            <p className="text-xs text-muted-foreground">Áreas cubiertas</p>
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
            columns={columns(handleViewRoute, handleEditRoute, handleDeleteRoute)}
            data={routes}
            searchKey="name"
          />
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <Card key={route.id} className={route.status === "inactive" ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{route.name}</CardTitle>
                    <Badge variant={route.status === "active" ? "success" : "destructive"}>
                      {route.status === "active" ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{route.areas}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Códigos Postales:</span>
                      <span className="font-medium truncate max-w-[150px]">{route.zipCodes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Repartidor:</span>
                      <span className="font-medium">{route.driver}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envíos:</span>
                      <Badge variant="secondary">{route.shipments}</Badge>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => handleViewRoute(route)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditRoute(route)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteRoute(route)}
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
      <RouteViewModal
        route={selectedRoute}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={handleEditRoute}
        onDelete={handleDeleteRoute}
      />

      <RouteEditModal
        route={selectedRoute}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        drivers={drivers}
      />

      <RouteDeleteModal
        route={selectedRoute}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
