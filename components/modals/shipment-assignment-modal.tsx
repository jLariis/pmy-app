"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MapPin,
  Clock,
  Package,
  AlertTriangle,
  User,
  Truck,
  Calendar,
  CheckCircle2,
  RouteIcon,
  ArrowRight,
} from "lucide-react"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"

// Datos de muestra para repartidores
const drivers = [
  { id: "1", name: "Juan Pérez", available: true, activeDeliveries: 5, completedToday: 12 },
  { id: "2", name: "María González", available: true, activeDeliveries: 3, completedToday: 8 },
  { id: "3", name: "Carlos Rodríguez", available: false, activeDeliveries: 0, completedToday: 15 },
  { id: "4", name: "Ana López", available: true, activeDeliveries: 7, completedToday: 10 },
]

// Datos de muestra para rutas
const routes = [
  {
    id: "1",
    name: "Ruta Norte",
    areas: ["Bacum", "San Ignacio Río Muerto"],
    zipCodes: ["85260", "85270", "85515"],
    estimatedTime: "2.5 horas",
    distance: "45 km",
    driver: "Juan Pérez",
  },
  {
    id: "2",
    name: "Ruta Sur",
    areas: ["Ciudad Obregón", "Cajeme"],
    zipCodes: ["85000", "85203", "85216"],
    estimatedTime: "3 horas",
    distance: "60 km",
    driver: "María González",
  },
  {
    id: "3",
    name: "Ruta Este",
    areas: ["Francisco Javier Mina", "Bacum"],
    zipCodes: ["85270", "85260"],
    estimatedTime: "2 horas",
    distance: "35 km",
    driver: null,
  },
  {
    id: "4",
    name: "Ruta Oeste",
    areas: ["Cajeme", "Ciudad Obregón"],
    zipCodes: ["85203", "85216"],
    estimatedTime: "2.5 horas",
    distance: "40 km",
    driver: "Ana López",
  },
]

interface ShipmentAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedShipments: Shipment[]
}

export function ShipmentAssignmentModal({ isOpen, onClose, selectedShipments }: ShipmentAssignmentModalProps) {
  const [selectedDriver, setSelectedDriver] = useState<string>("")
  const [selectedRoute, setSelectedRoute] = useState<string>("")
  const [assignmentDate, setAssignmentDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [step, setStep] = useState<"review" | "assign">("review")

  // Agrupar envíos por código postal para sugerir rutas
  const shipmentsByZipCode: Record<string, number> = {}
  selectedShipments.forEach((shipment) => {
    const zip = shipment.recipientZip
    shipmentsByZipCode[zip] = (shipmentsByZipCode[zip] || 0) + 1
  })

  // Encontrar rutas que coincidan con los códigos postales de los envíos
  const suggestedRoutes = routes.filter((route) => {
    return Object.keys(shipmentsByZipCode).some((zip) => route.zipCodes.includes(zip))
  })

  const handleAssign = () => {
    // Aquí iría la lógica para asignar los envíos al repartidor y ruta seleccionados
    console.log("Asignando envíos:", {
      shipments: selectedShipments,
      driver: selectedDriver,
      route: selectedRoute,
      date: assignmentDate,
    })

    // Cerrar el modal después de asignar
    onClose()
  }

  const handleNextStep = () => {
    setStep("assign")
  }

  const handleBackStep = () => {
    setStep("review")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {step === "review" ? "Revisar Envíos Seleccionados" : "Asignar Envíos"}
          </DialogTitle>
        </DialogHeader>

        {step === "review" ? (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Envíos Seleccionados ({selectedShipments.length})</h3>
                <Badge variant="outline" className="bg-brand-brown/10 text-brand-brown">
                  {Object.keys(shipmentsByZipCode).length} códigos postales
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(shipmentsByZipCode).map(([zip, count]) => (
                  <Badge key={zip} variant="outline" className="bg-gray-100">
                    CP: {zip} <span className="ml-1 text-brand-brown">({count})</span>
                  </Badge>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1 border rounded-md">
              <div className="p-4 space-y-3">
                {selectedShipments.map((shipment) => (
                  <Card key={shipment.trackingNumber} className="overflow-hidden">
                    <CardHeader className="py-3 px-4 bg-gray-50 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Package className="h-4 w-4 mr-2 text-brand-brown" />
                          {shipment.trackingNumber}
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          {shipment.commitDate} - {shipment.commitTime}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          shipment.status === "pendiente"
                            ? "warning"
                            : shipment.status === "en_ruta"
                              ? "info"
                              : "default"
                        }
                        className="text-xs"
                      >
                        {shipment.status === "pendiente"
                          ? "Pendiente"
                          : shipment.status === "en_ruta"
                            ? "En Ruta"
                            : shipment.status}
                      </Badge>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">{shipment.recipientName}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {shipment.recipientAddress}, {shipment.recipientCity}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <Badge variant="outline" className="text-[10px] h-4 px-1 mr-1">
                              CP: {shipment.recipientZip}
                            </Badge>
                          </div>
                        </div>
                        {shipment.payment && (
                          <div className="flex items-center justify-end">
                            <Badge
                              variant={shipment.payment.status === "paid" ? "success" : "warning"}
                              className="text-xs"
                            >
                              ${shipment.payment.amount.toFixed(2)} -{" "}
                              {shipment.payment.status === "paid" ? "Pagado" : "Pendiente"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={onClose} className="mr-2">
                Cancelar
              </Button>
              <Button onClick={handleNextStep} className="bg-brand-brown hover:bg-brand-brown/90">
                Continuar a Asignación
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs defaultValue="routes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="routes"
                  className="data-[state=active]:bg-brand-brown data-[state=active]:text-white"
                >
                  <RouteIcon className="h-4 w-4 mr-2" />
                  Asignar a Ruta
                </TabsTrigger>
                <TabsTrigger
                  value="drivers"
                  className="data-[state=active]:bg-brand-brown data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Asignar a Repartidor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="routes" className="space-y-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <RouteIcon className="h-4 w-4 mr-2 text-brand-brown" />
                      Rutas Sugeridas
                    </h3>
                    <ScrollArea className="h-[300px] rounded-md border">
                      <div className="p-4 space-y-3">
                        {suggestedRoutes.length > 0 ? (
                          suggestedRoutes.map((route) => (
                            <Card
                              key={route.id}
                              className={`cursor-pointer transition-colors ${
                                selectedRoute === route.id
                                  ? "border-brand-brown bg-brand-brown/5"
                                  : "hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedRoute(route.id)}
                            >
                              <CardHeader className="p-3 pb-0">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm flex items-center">
                                    <Checkbox checked={selectedRoute === route.id} className="mr-2" />
                                    {route.name}
                                  </CardTitle>
                                  {route.driver && (
                                    <Badge variant="outline" className="text-xs">
                                      <User className="h-3 w-3 mr-1" />
                                      {route.driver}
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription className="text-xs mt-1">{route.areas.join(", ")}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                    <span>{route.distance}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                    <span>{route.estimatedTime}</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {route.zipCodes.map((zip) => (
                                    <Badge
                                      key={zip}
                                      variant="outline"
                                      className={`text-[10px] ${
                                        Object.keys(shipmentsByZipCode).includes(zip)
                                          ? "bg-brand-brown/10 text-brand-brown"
                                          : ""
                                      }`}
                                    >
                                      CP: {zip}
                                      {Object.keys(shipmentsByZipCode).includes(zip) && (
                                        <span className="ml-1">({shipmentsByZipCode[zip]})</span>
                                      )}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-8 text-center text-gray-500">
                            <AlertTriangle className="h-8 w-8 mb-2" />
                            <p>No hay rutas sugeridas para los códigos postales seleccionados.</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-brand-brown" />
                      Detalles de Asignación
                    </h3>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="route">Seleccionar Ruta</Label>
                          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                            <SelectTrigger id="route">
                              <SelectValue placeholder="Seleccionar ruta" />
                            </SelectTrigger>
                            <SelectContent>
                              {routes.map((route) => (
                                <SelectItem key={route.id} value={route.id}>
                                  {route.name} ({route.areas.join(", ")})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date">Fecha de Asignación</Label>
                          <input
                            type="date"
                            id="date"
                            value={assignmentDate}
                            onChange={(e) => setAssignmentDate(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Resumen</h4>
                          <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Envíos:</span>
                              <span className="font-medium">{selectedShipments.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Códigos Postales:</span>
                              <span className="font-medium">{Object.keys(shipmentsByZipCode).length}</span>
                            </div>
                            {selectedRoute && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Ruta Seleccionada:</span>
                                <span className="font-medium">{routes.find((r) => r.id === selectedRoute)?.name}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Fecha:</span>
                              <span className="font-medium">{assignmentDate}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-4 bg-brand-brown/5 rounded-md p-3 border border-brand-brown/20">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-brand-brown mr-2 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Asignación Recomendada</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Basado en los códigos postales de los envíos seleccionados, recomendamos asignarlos a la
                            ruta que cubra la mayor cantidad de áreas coincidentes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="drivers" className="space-y-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2 text-brand-brown" />
                      Repartidores Disponibles
                    </h3>
                    <ScrollArea className="h-[300px] rounded-md border">
                      <div className="p-4 space-y-3">
                        {drivers
                          .filter((driver) => driver.available)
                          .map((driver) => (
                            <Card
                              key={driver.id}
                              className={`cursor-pointer transition-colors ${
                                selectedDriver === driver.id
                                  ? "border-brand-brown bg-brand-brown/5"
                                  : "hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedDriver(driver.id)}
                            >
                              <CardHeader className="p-3 pb-0">
                                <CardTitle className="text-sm flex items-center">
                                  <Checkbox checked={selectedDriver === driver.id} className="mr-2" />
                                  {driver.name}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-center">
                                    <Package className="h-3 w-3 mr-1 text-gray-500" />
                                    <span>{driver.activeDeliveries} envíos activos</span>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle2 className="h-3 w-3 mr-1 text-gray-500" />
                                    <span>{driver.completedToday} completados hoy</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-brand-brown" />
                      Detalles de Asignación
                    </h3>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="driver">Seleccionar Repartidor</Label>
                          <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                            <SelectTrigger id="driver">
                              <SelectValue placeholder="Seleccionar repartidor" />
                            </SelectTrigger>
                            <SelectContent>
                              {drivers.map((driver) => (
                                <SelectItem key={driver.id} value={driver.id} disabled={!driver.available}>
                                  {driver.name} {!driver.available && "(No disponible)"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date">Fecha de Asignación</Label>
                          <input
                            type="date"
                            id="date"
                            value={assignmentDate}
                            onChange={(e) => setAssignmentDate(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Resumen</h4>
                          <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Envíos:</span>
                              <span className="font-medium">{selectedShipments.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Códigos Postales:</span>
                              <span className="font-medium">{Object.keys(shipmentsByZipCode).length}</span>
                            </div>
                            {selectedDriver && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Repartidor:</span>
                                <span className="font-medium">
                                  {drivers.find((d) => d.id === selectedDriver)?.name}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Fecha:</span>
                              <span className="font-medium">{assignmentDate}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-4 bg-brand-brown/5 rounded-md p-3 border border-brand-brown/20">
                      <div className="flex items-start">
                        <Truck className="h-5 w-5 text-brand-brown mr-2 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Asignación Directa</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Al asignar directamente a un repartidor, los envíos no se asociarán a una ruta específica.
                            Esto es útil para entregas especiales o urgentes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBackStep}>
                Volver a Revisar
              </Button>
              <Button
                onClick={handleAssign}
                className="bg-brand-brown hover:bg-brand-brown/90"
                disabled={!selectedDriver && !selectedRoute}
              >
                Confirmar Asignación
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
