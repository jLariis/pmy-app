"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface IngresosGraficosProps {
  data: any
}

export function IngresosGraficos({ data }: IngresosGraficosProps) {
  // Preparar datos para gráficos
  const barChartData = data.fechas.map((fecha: string, index: number) => ({
    fecha: fecha.split("-")[2], // Solo mostrar el día
    fedex: data.ingresosFedex[index],
    dhl: data.ingresosDhl[index],
    total: data.totalDiario[index],
  }))

  const lineChartData = data.fechas.map((fecha: string, index: number) => ({
    fecha: fecha.split("-")[2], // Solo mostrar el día
    fedex: data.fedex.pod[index] + data.fedex.dex07[index],
    dhl: data.dhl.ok[index] + data.dhl.ba[index],
    total: data.fedex.pod[index] + data.fedex.dex07[index] + data.dhl.ok[index] + data.dhl.ba[index],
  }))

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Análisis Visual de Ingresos</CardTitle>
        <CardDescription>Visualización de ingresos y entregas por día</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ingresos" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ingresos">Ingresos ($)</TabsTrigger>
            <TabsTrigger value="entregas">Entregas (Cantidad)</TabsTrigger>
          </TabsList>

          <TabsContent value="ingresos" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      "",
                    ]}
                    labelFormatter={(label) => `Día ${label}`}
                  />
                  <Bar dataKey="fedex" name="FedEx" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="dhl" name="DHL" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="entregas" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`${value} paquetes`, ""]}
                    labelFormatter={(label) => `Día ${label}`}
                  />
                  <Line type="monotone" dataKey="fedex" name="FedEx" stroke="#4f46e5" strokeWidth={2} />
                  <Line type="monotone" dataKey="dhl" name="DHL" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="total" name="Total" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
