import { CheckCircle, Clock, Truck, Package, XCircle } from "lucide-react"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"

const statusMap = {
  recoleccion: { icon: Package, color: "text-blue-500", label: "Recolección" },
  pendiente: { icon: Clock, color: "text-yellow-500", label: "Pendiente" },
  en_ruta: { icon: Truck, color: "text-purple-500", label: "En Ruta" },
  entregado: { icon: CheckCircle, color: "text-green-500", label: "Entregado" },
  no_entregado: { icon: XCircle, color: "text-red-500", label: "No Entregado" },
} as const

export function ShipmentTimeline({ shipment }: { shipment: Shipment }) {
  const statuses = ["recoleccion", "pendiente", "en_ruta", "entregado", "no_entregado"] as const
  const currentStatusIndex = statuses.indexOf(shipment.status)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Número de Rastreo</p>
          <p className="text-lg font-bold">{shipment.trackingNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Destinatario</p>
          <p className="text-lg font-bold">{shipment.recipientName}</p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
        {statuses.map((status, index) => {
          const { icon: Icon, color, label } = statusMap[status]
          const isActive = index <= currentStatusIndex
          const isCurrentStatus = index === currentStatusIndex

          return (
            <div key={status} className="relative flex items-center space-x-4 py-4">
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  isActive ? "bg-white" : "bg-gray-100"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? color : "text-gray-400"}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>{label}</p>
                {isCurrentStatus && shipment.status !== "no_entregado" && (
                  <p className="text-xs text-gray-500">En progreso</p>
                )}
                {status === "no_entregado" && shipment.status === "no_entregado" && (
                  <p className="text-xs text-red-500">No se pudo entregar</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

