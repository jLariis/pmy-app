"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface IngresosResumenProps {
  data: any
}

export function IngresosResumen({ data }: IngresosResumenProps) {
  // Calcular totales
  const totalFedexPOD = data.fedex.pod.reduce((a: number, b: number) => a + b, 0)
  const totalFedexDEX = data.fedex.dex07.reduce((a: number, b: number) => a + b, 0)
  const totalDHLOK = data.dhl.ok.reduce((a: number, b: number) => a + b, 0)
  const totalDHLBA = data.dhl.ba.reduce((a: number, b: number) => a + b, 0)

  const totalFedex = totalFedexPOD + totalFedexDEX
  const totalDHL = totalDHLOK + totalDHLBA
  const totalEntregas = totalFedex + totalDHL

  const ingresosFedex = data.ingresosFedex.reduce((a: number, b: number) => a + b, 0)
  const ingresosDHL = data.ingresosDhl.reduce((a: number, b: number) => a + b, 0)

  // Calcular porcentajes
  const porcentajeFedex = (ingresosFedex / data.totalGeneral) * 100
  const porcentajeDHL = (ingresosDHL / data.totalGeneral) * 100

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Resumen de Ingresos</CardTitle>
        <CardDescription>Desglose de ingresos por compañía y tipo de entrega</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Resumen FedEx */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">FedEx</h3>
              <span className="text-lg font-bold">
                ${ingresosFedex.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>POD (Entregados): {totalFedexPOD}</span>
                <span>
                  $
                  {(totalFedexPOD * 59.51).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>DEX 07 (Rechazados): {totalFedexDEX}</span>
                <span>
                  $
                  {(totalFedexDEX * 59.51).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${porcentajeFedex}%` }} />
            </div>
            <div className="text-xs text-right mt-1">{porcentajeFedex.toFixed(1)}% del total</div>
          </div>

          {/* Resumen DHL */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">DHL</h3>
              <span className="text-lg font-bold">
                ${ingresosDHL.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>OK (Entregados): {totalDHLOK}</span>
                <span>
                  ${(totalDHLOK * 45).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>BA (Dir. Incorrecta): {totalDHLBA}</span>
                <span>
                  ${(totalDHLBA * 45).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${porcentajeDHL}%` }} />
            </div>
            <div className="text-xs text-right mt-1">{porcentajeDHL.toFixed(1)}% del total</div>
          </div>

          {/* Totales */}
          <div className="pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Total General</span>
              <span>
                ${data.totalGeneral.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Total Entregas</span>
              <span>{totalEntregas} paquetes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Promedio por Entrega</span>
              <span>
                $
                {(data.totalGeneral / totalEntregas).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
