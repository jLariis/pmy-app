"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, CheckCircle, XCircle } from 'lucide-react'
import { ShipmentTimeline } from "@/components/shipment-timeline"
import { Shipment } from "@/app/dashboard/operation/shipments/columns"

interface DeliveryDetailsProps {
  shipment: Shipment | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (status: "entregado" | "no_entregado") => void
}

export function DeliveryDetails({ 
  shipment, 
  isOpen, 
  onClose, 
  onUpdateStatus 
}: DeliveryDetailsProps) {
  if (!shipment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Envío</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Número de Rastreo</p>
            <p className="text-lg font-bold">{shipment.trackingNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Destinatario</p>
            <p className="text-lg">{shipment.recipientName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Dirección</p>
            <p className="text-lg">
              {shipment.recipientAddress}, {shipment.recipientCity}, CP {shipment.recipientZip}
            </p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <MapPin className="mr-2 h-4 w-4" /> Ver en Mapa
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium">Teléfono</p>
            <p className="text-lg">{shipment.recipientPhone}</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <Phone className="mr-2 h-4 w-4" /> Llamar
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium">Pago</p>
            <p className="text-lg">
              ${shipment.payment?.amount.toFixed(2)} -
              <Badge variant={shipment.payment?.status === "paid" ? "success" : "warning"}>
                {shipment.payment?.status === "paid" ? "Pagado" : "Pendiente"}
              </Badge>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Estado Actual</p>
            <ShipmentTimeline shipment={shipment} />
          </div>

          {shipment.status === "en_ruta" && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => onUpdateStatus("entregado")}>
                <CheckCircle className="mr-2 h-4 w-4" /> Entregar
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => onUpdateStatus("no_entregado")}>
                <XCircle className="mr-2 h-4 w-4" /> No Entregado
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}