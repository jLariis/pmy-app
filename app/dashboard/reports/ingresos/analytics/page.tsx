import { PageHeader } from "@/components/PageHeader"
import { IngresosAnalyticsClient } from "./ingresos-analytics-client"

export default function IngresosAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Análisis Avanzado de Ingresos"
        description="Visualización detallada y proyecciones de ingresos por entregas"
      />
      <IngresosAnalyticsClient />
    </div>
  )
}
