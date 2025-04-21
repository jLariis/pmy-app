import React from "react"
import {
  CheckCircle,
  Clock,
  Truck,
  Package,
  XCircle,
  AlertTriangle,
  MapPin,
  DollarSign,
  User,
  Phone,
  Calendar,
} from "lucide-react"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const statusMap = {
  recoleccion: { icon: Package, color: "text-blue-500", bgColor: "bg-blue-100", label: "Recolección" },
  pendiente: { icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-100", label: "Pendiente" },
  en_ruta: { icon: Truck, color: "text-purple-500", bgColor: "bg-purple-100", label: "En Ruta" },
  entregado: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-100", label: "Entregado" },
  no_entregado: { icon: XCircle, color: "text-red-500", bgColor: "bg-red-100", label: "No Entregado" },
} as const

const priorityMap = {
  alta: { color: "text-red-500", bgColor: "bg-red-100", label: "Alta" },
  media: { color: "text-yellow-500", bgColor: "bg-yellow-100", label: "Media" },
  baja: { color: "text-green-500", bgColor: "bg-green-100", label: "Baja" },
} as const

export function ShipmentTimeline({ shipment }: { shipment: Shipment }) {
  const statuses = ["recoleccion", "pendiente", "en_ruta", "entregado", "no_entregado"] as const
  const currentStatusIndex = statuses.indexOf(shipment.status)

  // Get the status history or create a default one if not provided
  const statusHistory =
    shipment.statusHistory ||
    statuses.slice(0, currentStatusIndex + 1).map((status) => ({
      status,
      timestamp: new Date().toISOString(),
      notes: "",
    }))

  return (
    <div className="space-y-6">
      {/* Información general del envío */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Número de Rastreo</p>
              <p className="text-lg font-bold">{shipment.trackingNumber}</p>
            </div>
            {shipment.priority && (
              <Badge
                className={`${priorityMap[shipment.priority].bgColor} ${priorityMap[shipment.priority].color} border-none`}
              >
                Prioridad: {priorityMap[shipment.priority].label}
              </Badge>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Estado Actual</p>
            <div className="flex items-center gap-2 mt-1">
              <div className={`p-1 rounded-full ${statusMap[shipment.status].bgColor}`}>
                {React.createElement(statusMap[shipment.status].icon, {
                  className: `h-5 w-5 ${statusMap[shipment.status].color}`,
                })}
              </div>
              <span className={`font-medium ${statusMap[shipment.status].color}`}>
                {statusMap[shipment.status].label}
              </span>
            </div>
          </div>

          {shipment.payment && (
            <div>
              <p className="text-sm font-medium text-gray-500">Información de Pago</p>
              <div className="flex items-center gap-2 mt-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span className="font-medium">${shipment.payment.amount.toFixed(2)}</span>
                <Badge
                  variant={
                    shipment.payment.status === "paid"
                      ? "success"
                      : shipment.payment.status === "pending"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {shipment.payment.status === "paid"
                    ? "Pagado"
                    : shipment.payment.status === "pending"
                      ? "Pendiente"
                      : "Fallido"}
                </Badge>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Destinatario</p>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{shipment.recipientName}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Dirección de Entrega</p>
            <div className="flex items-start gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span>
                {shipment.recipientAddress}, {shipment.recipientCity}, CP {shipment.recipientZip}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Teléfono</p>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{shipment.recipientPhone}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Fecha y Hora Compromiso</p>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>
                {shipment.commitDate} {shipment.commitTime}
              </span>
            </div>
          </div>

          {shipment.instructions && (
            <div>
              <p className="text-sm font-medium text-gray-500">Instrucciones Especiales</p>
              <div className="flex items-start gap-2 mt-1">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span className="text-sm italic">{shipment.instructions}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Línea de tiempo del envío */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Historial de Seguimiento</h3>
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
          {statuses.map((status, index) => {
            const { icon: Icon, color, label } = statusMap[status]
            const isActive = index <= currentStatusIndex
            const isCurrentStatus = index === currentStatusIndex

            // Find the history entry for this status
            const historyEntry = statusHistory.find((h) => h.status === status)
            const timestamp = historyEntry ? new Date(historyEntry.timestamp) : null
            const notes = historyEntry?.notes
            const location = historyEntry?.location
            const updatedBy = historyEntry?.updatedBy

            return (
              <div key={status} className="relative flex items-start space-x-4 py-4">
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                    isActive ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? color : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>{label}</p>
                  {isActive && timestamp && (
                    <p className="text-xs text-gray-500">
                      {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}
                    </p>
                  )}
                  {location && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{location}</p>
                    </div>
                  )}
                  {updatedBy && <p className="text-xs text-gray-500 mt-1">Actualizado por: {updatedBy}</p>}
                  {notes && <p className="text-xs italic text-gray-500 mt-1">{notes}</p>}
                  {isCurrentStatus && shipment.status !== "no_entregado" && shipment.status !== "entregado" && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      En progreso
                    </Badge>
                  )}
                  {status === "no_entregado" && shipment.status === "no_entregado" && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      No se pudo entregar
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
