"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, CheckCircle, Clock, Truck, XCircle } from "lucide-react"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"

interface DeliveryListProps {
  shipments: Shipment[]
  onSelectShipment: (shipment: Shipment) => void
}

const statusMap = {
  recoleccion: { icon: Package, color: "bg-blue-500", label: "Recolección" },
  pendiente: { icon: Clock, color: "bg-yellow-500", label: "Pendiente" },
  en_ruta: { icon: Truck, color: "bg-purple-500", label: "En Ruta" },
  entregado: { icon: CheckCircle, color: "bg-green-500", label: "Entregado" },
  no_entregado: { icon: XCircle, color: "bg-red-500", label: "No Entregado" },
} as const

export function DeliveryList({ shipments, onSelectShipment }: DeliveryListProps) {
  return (
    <div className="space-y-4">
      {shipments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay envíos asignados</div>
      ) : (
        shipments.map((shipment) => (
          <DeliveryCard key={shipment.trackingNumber} shipment={shipment} onSelect={() => onSelectShipment(shipment)} />
        ))
      )}
    </div>
  )
}

function DeliveryCard({ shipment, onSelect }: { shipment: Shipment; onSelect: () => void }) {
  const StatusIcon = statusMap[shipment.status].icon

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSelect}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{shipment.recipientName}</CardTitle>
            <p className="text-xs text-gray-500">{shipment.trackingNumber}</p>
          </div>
          <Badge
            variant={
              shipment.status === "entregado"
                ? "success"
                : shipment.status === "no_entregado"
                  ? "destructive"
                  : "default"
            }
          >
            {statusMap[shipment.status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <p className="text-sm truncate">
          {shipment.recipientAddress}, {shipment.recipientCity}
        </p>
        <p className="text-xs text-gray-500 mt-1">CP: {shipment.recipientZip}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <p className="text-sm text-gray-500">
          {shipment.commitDate} - {shipment.commitTime}
        </p>
        <div className={`${statusMap[shipment.status].color} text-white p-1 rounded-full`}>
          <StatusIcon className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
