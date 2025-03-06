"use client"

import { useState, useCallback } from "react"
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
import { Package, Eye, Map } from "lucide-react"
import { columns, type Shipment } from "./columns"
import { CSVUploadModal } from "@/components/modals/csv-upload-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShipmentTimeline } from "@/components/shipment-timeline"
import dynamic from "next/dynamic"

const ShipmentMap = dynamic(() => import("@/components/shipment-map"), { ssr: false })

// Sample data based on the image
const data: Shipment[] = [
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
    trackingNumber: "282071613818",
    recipientName: "JORGE ARMENTA MONTES",
    recipientAddress: "TRINIDAD HERNANDEZ MOROYOQUI SN",
    recipientCity: "CAJEME",
    recipientZip: "85216",
    commitDate: "12/02/2024",
    commitTime: "21:00:00",
    recipientPhone: "6441142211",
    status: "pendiente",
    payment: {
      amount: 180.5,
      status: "pending",
    },
    statusHistory: [
      { status: "recoleccion", timestamp: "2024-11-27T10:20:00", notes: "Paquete recogido en sucursal" },
      { status: "pendiente", timestamp: "2024-11-27T15:30:00", notes: "En espera de asignación de ruta" },
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
  },
  {
    trackingNumber: "282122377080",
    recipientName: "MARCO ANTONIO SANDOVAL MARTINE",
    recipientAddress: "CALLE MIGUEL DEL TORO 33",
    recipientCity: "SAN IGNACIO RIO MUERTO",
    recipientZip: "85515",
    commitDate: "12/02/2024",
    commitTime: "21:00:00",
    recipientPhone: "6442214397",
    status: "pendiente",
    payment: {
      amount: 150.0,
      status: "pending",
    },
  },
  {
    trackingNumber: "770006707512",
    recipientName: "MARIA VALLES",
    recipientAddress: "AQUILES SERDAN , EXT 32,",
    recipientCity: "BACUM",
    recipientZip: "85260",
    commitDate: "11/28/2024",
    commitTime: "21:00:00",
    recipientPhone: "6442489146",
    status: "en_ruta",
    payment: {
      amount: 120.0,
      status: "pending",
    },
  },
  {
    trackingNumber: "770038035530",
    recipientName: "14012 LUCIA ESMERALDA GARCIA",
    recipientAddress: "MARIANO ABASOLO #45 NUM. 45",
    recipientCity: "CD OBREGON",
    recipientZip: "85265",
    commitDate: "12/02/2024",
    commitTime: "21:00:00",
    recipientPhone: "6441102428",
    status: "pendiente",
    payment: {
      amount: 220.0,
      status: "pending",
    },
  },
  {
    trackingNumber: "770079758048",
    recipientName: "ORLANDO CASTRO MAGANA",
    recipientAddress: "REFORMA Y POTAM 106",
    recipientCity: "SAN IGNACIO RIO MUERTO",
    recipientZip: "85515",
    commitDate: "12/02/2024",
    commitTime: "21:00:00",
    recipientPhone: "6621940962",
    status: "en_ruta",
    payment: {
      amount: 300.0,
      status: "paid",
    },
  },
  {
    trackingNumber: "770082180576",
    recipientName: "LUIS ANGEL FUENTES REYES",
    recipientAddress: "SANTA ROSA # 7",
    recipientCity: "BACUM",
    recipientZip: "85260",
    commitDate: "11/28/2024",
    commitTime: "21:00:00",
    recipientPhone: "6442252088",
    status: "pendiente",
    payment: {
      amount: 180.0,
      status: "pending",
    },
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
  },
  {
    trackingNumber: "770105857262",
    recipientName: "ROSA VIANEY ARBALLO",
    recipientAddress: "BENITO JUAREZ 52",
    recipientCity: "BACUM",
    recipientZip: "85270",
    commitDate: "12/02/2024",
    commitTime: "21:00:00",
    recipientPhone: "6442903760",
    status: "pendiente",
    payment: {
      amount: 210.0,
      status: "pending",
    },
  },
  {
    trackingNumber: "770130609211",
    recipientName: "LORENIA GUADALUPE MURRIETA SOLANO",
    recipientAddress: "C 20 DE NOVIEMBRE #224",
    recipientCity: "BACUM",
    recipientZip: "85260",
    commitDate: "11/29/2024",
    commitTime: "21:00:00",
    recipientPhone: "6442047790",
    status: "en_ruta",
    payment: {
      amount: 190.0,
      status: "paid",
    },
  },
  {
    trackingNumber: "770130966650",
    recipientName: "MIGUEL PARRA",
    recipientAddress: "CALLE FRANCISCO I. MADERO 212",
    recipientCity: "CAJEME",
    recipientZip: "85203",
    commitDate: "12/02/2024",
    commitTime: "21:00:00",
    recipientPhone: "6449979289",
    status: "pendiente",
    payment: {
      amount: 150.0,
      status: "pending",
    },
  },
]

export default function ShipmentsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleViewTimeline = useCallback((shipment: Shipment) => {
    setSelectedShipment(shipment)
  }, [])

  const updatedColumns = columns.map((col) =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }) => (
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleViewTimeline(row.original)}>
              <span className="sr-only">Ver timeline</span>
              <Eye className="h-4 w-4" />
            </Button>
          ),
        }
      : col,
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader title="Envíos" description="Gestión y seguimiento de envíos" />
        <div className="flex flex-col sm:flex-row gap-2">
          <CSVUploadModal open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
          <Dialog open={isNewShipmentOpen} onOpenChange={setIsNewShipmentOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-brand-brown hover:bg-brand-brown/90">
                <Package className="mr-2 h-4 w-4" />
                Nuevo Envío
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-lg">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Envío</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipientName">Nombre del Destinatario</Label>
                  <Input id="recipientName" placeholder="Nombre completo" className="rounded-md" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recipientAddress">Dirección</Label>
                  <Input id="recipientAddress" placeholder="Calle y número" className="rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="recipientCity">Ciudad</Label>
                    <Input id="recipientCity" placeholder="Ciudad" className="rounded-md" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="recipientZip">Código Postal</Label>
                    <Input id="recipientZip" placeholder="CP" className="rounded-md" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recipientPhone">Teléfono</Label>
                  <Input id="recipientPhone" type="tel" placeholder="Número de teléfono" className="rounded-md" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Monto</Label>
                  <Input id="amount" type="number" step="0.01" placeholder="$0.00" className="rounded-md" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select>
                    <SelectTrigger id="status" className="rounded-md">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recoleccion">Recolección</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="en_ruta">En Ruta</SelectItem>
                      <SelectItem value="entregado">Entregado</SelectItem>
                      <SelectItem value="no_entregado">No Entregado</SelectItem>
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
                  onClick={() => setIsNewShipmentOpen(false)}
                >
                  Crear Envío
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white hover:bg-gray-100">
                <Map className="mr-2 h-4 w-4" />
                Ver Mapa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-white rounded-lg">
              <DialogHeader>
                <DialogTitle>Mapa de Envíos</DialogTitle>
              </DialogHeader>
              <ShipmentMap shipments={data} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable
        columns={updatedColumns}
        data={data}
        searchKey="trackingNumber"
        filters={[
          {
            columnId: "status",
            title: "Estado",
            options: [
              { label: "Recolección", value: "recoleccion" },
              { label: "Pendiente", value: "pendiente" },
              { label: "En Ruta", value: "en_ruta" },
              { label: "Entregado", value: "entregado" },
              { label: "No Entregado", value: "no_entregado" },
            ],
          },
          {
            columnId: "payment",
            title: "Estado de Pago",
            options: [
              { label: "Pagado", value: "paid" },
              { label: "Pendiente", value: "pending" },
              { label: "Fallido", value: "failed" },
            ],
          },
        ]}
      />
      {selectedShipment && (
        <Dialog open={!!selectedShipment} onOpenChange={() => setSelectedShipment(null)}>
          <DialogContent className="sm:max-w-[600px] bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle>Seguimiento de Envío</DialogTitle>
            </DialogHeader>
            <ShipmentTimeline shipment={selectedShipment} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

