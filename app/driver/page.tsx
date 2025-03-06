"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Map } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DeliveryList } from "@/components/driver/delivery-list"
import { DeliveryDetails } from "@/components/driver/delivery-details"
import { DeliveryUpdate } from "@/components/driver/delivery-update"
import { DeliveryMap } from "@/components/driver/delivery-map"
import { DriverNav } from "@/components/driver/driver-nav"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"

// Sample data for the driver
const driverInfo = {
  id: "1",
  name: "Juan Pérez",
  route: "Ruta Norte",
  avatar: "JP",
}

// Sample data for shipments
const shipments: Shipment[] = [
  {
    trackingNumber: "282032630077",
    recipientName: "MARIO VELAZQUEZ NIEVES",
    recipientAddress: "CALLE CONSTITUCION S/N",
    recipientCity: "BACUM",
    recipientZip: "85260",
    commitDate: "11/28/2024",
    commitTime: "21:00:00",
    recipientPhone: "6441725153",
    status: "en_ruta",
    payment: {
      amount: 250.0,
      status: "paid",
    },
    statusHistory: [
      { status: "recoleccion", timestamp: "2024-11-26T09:30:00", notes: "Paquete recogido en sucursal" },
      { status: "pendiente", timestamp: "2024-11-26T14:15:00", notes: "En espera de asignación de ruta" },
      { status: "en_ruta", timestamp: "2024-11-27T08:45:00", notes: "En camino con el repartidor Juan Pérez" },
    ],
  },
  {
    trackingNumber: "282081512100",
    recipientName: "SOTO ESTRADA DULCE DANIELA",
    recipientAddress: "EMILIANO ZAPATA 55 55",
    recipientCity: "CD OBREGON",
    recipientZip: "85515",
    commitDate: "11/29/2024",
    commitTime: "21:00:00",
    recipientPhone: "6441496206",
    status: "en_ruta",
    payment: {
      amount: 200.0,
      status: "paid",
    },
    statusHistory: [
      { status: "recoleccion", timestamp: "2024-11-26T10:15:00", notes: "Paquete recogido en sucursal" },
      { status: "pendiente", timestamp: "2024-11-26T15:30:00", notes: "En espera de asignación de ruta" },
      { status: "en_ruta", timestamp: "2024-11-27T09:00:00", notes: "En camino con el repartidor Juan Pérez" },
    ],
  },
  {
    trackingNumber: "770097020798",
    recipientName: "REYNA LETICIA INZUNZA GRANADOS",
    recipientAddress: "JACINTO LOPEZ 99",
    recipientCity: "FRANCISCO JAVIER MINA",
    recipientZip: "85270",
    commitDate: "11/28/2024",
    commitTime: "21:00:00",
    recipientPhone: "6442136139",
    status: "en_ruta",
    payment: {
      amount: 220.0,
      status: "paid",
    },
    statusHistory: [
      { status: "recoleccion", timestamp: "2024-11-26T11:00:00", notes: "Paquete recogido en sucursal" },
      { status: "pendiente", timestamp: "2024-11-26T16:45:00", notes: "En espera de asignación de ruta" },
      { status: "en_ruta", timestamp: "2024-11-27T09:30:00", notes: "En camino con el repartidor Juan Pérez" },
    ],
  },
  {
    trackingNumber: "508569677330",
    recipientName: "EDGAR MIRANDA",
    recipientAddress: "RUIZ CORTINEZ 48",
    recipientCity: "BACUM",
    recipientZip: "85270",
    commitDate: "11/25/2024",
    commitTime: "18:00:00",
    recipientPhone: "6442493382",
    status: "entregado",
    payment: {
      amount: 175.0,
      status: "paid",
    },
    statusHistory: [
      { status: "recoleccion", timestamp: "2024-11-23T08:15:00", notes: "Paquete recogido en sucursal" },
      { status: "pendiente", timestamp: "2024-11-23T11:30:00", notes: "En espera de asignación de ruta" },
      { status: "en_ruta", timestamp: "2024-11-24T09:00:00", notes: "En camino con el repartidor María González" },
      { status: "entregado", timestamp: "2024-11-25T14:45:00", notes: "Entregado al destinatario" },
    ],
  },
]

export default function DriverPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [updateStatus, setUpdateStatus] = useState<"entregado" | "no_entregado" | null>(null)
  const [isMapOpen, setIsMapOpen] = useState(false)

  // Filter shipments based on active tab and search query
  const filteredShipments = shipments.filter((shipment) => {
    const matchesTab =
      (activeTab === "pending" && shipment.status === "en_ruta") ||
      (activeTab === "completed" && (shipment.status === "entregado" || shipment.status === "no_entregado"))

    const matchesSearch =
      searchQuery === "" ||
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.recipientName.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Handle status update
  const handleStatusUpdate = (
    status: "entregado" | "no_entregado",
    notes: string,
    photo: string | null,
    signature: string | null,
  ) => {
    if (!selectedShipment) return

    // In a real app, this would make an API call to update the status
    console.log(`Updating shipment ${selectedShipment.trackingNumber} to ${status}`)
    console.log(`Notes: ${notes}`)
    console.log(`Photo: ${photo ? "Captured" : "None"}`)
    console.log(`Signature: ${signature ? "Captured" : "None"}`)

    // Reset form and close modal
    setSelectedShipment(null)
    setUpdateStatus(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-brand-brown text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Del Yaqui - Repartidor</h1>
          <div className="flex items-center gap-2">
            <DriverNav driverName={driverInfo.name} driverRoute={driverInfo.route} driverAvatar={driverInfo.avatar} />
            <Avatar className="h-8 w-8 bg-brand-orange">
              <AvatarFallback>{driverInfo.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div>
            <p className="text-sm font-medium">{driverInfo.name}</p>
            <p className="text-xs opacity-80">{driverInfo.route}</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4">
        {/* Search and Map */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Buscar por número de rastreo o destinatario"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setIsMapOpen(true)}>
            <Map className="h-4 w-4 mr-2" />
            Mapa
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <DeliveryList shipments={filteredShipments} onSelectShipment={setSelectedShipment} />
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <DeliveryList shipments={filteredShipments} onSelectShipment={setSelectedShipment} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Shipment Detail Modal */}
      <DeliveryDetails
        shipment={selectedShipment}
        isOpen={!!selectedShipment && !updateStatus}
        onClose={() => setSelectedShipment(null)}
        onUpdateStatus={setUpdateStatus}
      />

      {/* Status Update Modal */}
      <DeliveryUpdate
        shipment={selectedShipment}
        isOpen={!!selectedShipment && !!updateStatus}
        onClose={() => setUpdateStatus(null)}
        updateStatus={updateStatus}
        onUpdateStatus={handleStatusUpdate}
      />

      {/* Map Modal */}
      <DeliveryMap
        shipments={shipments.filter((s) => s.status === "en_ruta")}
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />
    </div>
  )
}