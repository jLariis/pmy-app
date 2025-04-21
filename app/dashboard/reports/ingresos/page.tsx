import { PageHeader } from "@/components/PageHeader"
import { IngresosEjecutivoClient } from "./ingresos-ejecutivo-client"

export default function IngresosEjecutivoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Análisis Ejecutivo de Ingresos"
        description="Panel ejecutivo para el análisis financiero de ingresos por entregas de paquetería"
      />
      <IngresosEjecutivoClient />
    </div>
  )
}
