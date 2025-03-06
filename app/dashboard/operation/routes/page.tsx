import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    name: "Ruta Hermosillo - Guaymas",
    driver: "Juan Pérez",
    vehicle: "Ford F-150",
    status: "En progreso",
    startTime: "2023-06-10T08:00:00",
    estimatedArrival: "2023-06-10T11:30:00",
  },
  {
    id: "2",
    name: "Ruta Obregón - Navojoa",
    driver: "María González",
    vehicle: "Chevrolet Silverado",
    status: "Completada",
    startTime: "2023-06-10T09:00:00",
    estimatedArrival: "2023-06-10T12:00:00",
  },
  // Añade más rutas aquí...
]

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rutas" description="Gestión y seguimiento de rutas de entrega" />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

