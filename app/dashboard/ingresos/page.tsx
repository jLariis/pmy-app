import { PageHeader } from "@/components/PageHeader"
import { IngresosClient } from "./ingresos-client"

export default function IngresosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cálculo de Ingresos"
        description="Calcula automáticamente los ingresos diarios generados por entregas de paquetería (FedEx y DHL)"
      />
      <IngresosClient />
    </div>
  )
}
