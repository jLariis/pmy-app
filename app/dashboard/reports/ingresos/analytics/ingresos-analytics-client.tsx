"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Download, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

// Datos de ejemplo para las gráficas
const monthlyData = [
  { name: "Ene", fedex: 75000, dhl: 45000 },
  { name: "Feb", fedex: 82000, dhl: 48000 },
  { name: "Mar", fedex: 78000, dhl: 52000 },
  { name: "Abr", fedex: 85000, dhl: 58000 },
  { name: "May", fedex: 90000, dhl: 62000 },
  { name: "Jun", fedex: 95000, dhl: 65000 },
]

const pieData = [
  { name: "FedEx POD", value: 65, color: "#4f46e5" },
  { name: "FedEx DEX 07", value: 10, color: "#818cf8" },
  { name: "DHL OK", value: 20, color: "#f59e0b" },
  { name: "DHL BA", value: 5, color: "#fcd34d" },
]

const COLORS = ["#4f46e5", "#818cf8", "#f59e0b", "#fcd34d"]

const projectionData = [
  { name: "Jul", actual: 0, proyeccion: 165000 },
  { name: "Ago", actual: 0, proyeccion: 170000 },
  { name: "Sep", actual: 0, proyeccion: 175000 },
  { name: "Oct", actual: 0, proyeccion: 180000 },
  { name: "Nov", actual: 0, proyeccion: 190000 },
  { name: "Dic", actual: 0, proyeccion: 200000 },
]

export function IngresosAnalyticsClient() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("year")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis Avanzado</h2>
          <p className="text-muted-foreground">Visualización detallada y proyecciones de ingresos por entregas</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="distribution">Distribución</TabsTrigger>
          <TabsTrigger value="projection">Proyección</TabsTrigger>
        </TabsList>

        {/* Tendencias */}
        <TabsContent value="trends" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Tendencia de Ingresos Mensuales</CardTitle>
              <CardDescription>Evolución de ingresos por compañía durante el año</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString("es-MX")}`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="fedex"
                      name="FedEx"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="dhl"
                      name="DHL"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Análisis de Crecimiento</CardTitle>
                <CardDescription>Tasa de crecimiento mensual de ingresos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Ene", crecimiento: 0 },
                        { name: "Feb", crecimiento: 9.3 },
                        { name: "Mar", crecimiento: -1.7 },
                        { name: "Abr", crecimiento: 10.5 },
                        { name: "May", crecimiento: 6.2 },
                        { name: "Jun", crecimiento: 5.0 },
                      ]}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Crecimiento"]} />
                      <Bar
                        dataKey="crecimiento"
                        name="Crecimiento Mensual"
                        fill={(data) => (data.crecimiento >= 0 ? "#10b981" : "#ef4444")}
                        radius={[4, 4, 0, 0]}
                      >
                        {[
                          { name: "Ene", crecimiento: 0 },
                          { name: "Feb", crecimiento: 9.3 },
                          { name: "Mar", crecimiento: -1.7 },
                          { name: "Abr", crecimiento: 10.5 },
                          { name: "May", crecimiento: 6.2 },
                          { name: "Jun", crecimiento: 5.0 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.crecimiento >= 0 ? "#10b981" : "#ef4444"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Comparativa Interanual</CardTitle>
                <CardDescription>Comparación con el mismo período del año anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Ene", actual: 120000, anterior: 95000 },
                        { name: "Feb", actual: 130000, anterior: 105000 },
                        { name: "Mar", actual: 130000, anterior: 110000 },
                        { name: "Abr", actual: 143000, anterior: 115000 },
                        { name: "May", actual: 152000, anterior: 125000 },
                        { name: "Jun", actual: 160000, anterior: 130000 },
                      ]}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString("es-MX")}`, ""]} />
                      <Legend />
                      <Bar dataKey="actual" name="2023" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="anterior" name="2022" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Distribución */}
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Distribución de Ingresos</CardTitle>
                <CardDescription>Distribución porcentual por tipo de entrega</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Distribución por Zona</CardTitle>
                <CardDescription>Ingresos generados por zona geográfica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: "Hermosillo", value: 45 },
                        { name: "Ciudad Obregón", value: 25 },
                        { name: "Guaymas", value: 15 },
                        { name: "Navojoa", value: 10 },
                        { name: "Caborca", value: 5 },
                      ]}
                    >
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value: number) => [`${value}%`, "Porcentaje"]} />
                      <Bar dataKey="value" name="Porcentaje" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Análisis de Rentabilidad</CardTitle>
              <CardDescription>Comparativa de rentabilidad por tipo de entrega y compañía</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "FedEx POD", cantidad: 280, ingreso: 16662.8, costo: 8400, rentabilidad: 8262.8 },
                      { name: "FedEx DEX 07", cantidad: 41, ingreso: 2439.91, costo: 1230, rentabilidad: 1209.91 },
                      { name: "DHL OK", cantidad: 245, ingreso: 11025, costo: 7350, rentabilidad: 3675 },
                      { name: "DHL BA", cantidad: 23, ingreso: 1035, costo: 690, rentabilidad: 345 },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value.toLocaleString("es-MX")}`, ""]} />
                    <Legend />
                    <Bar dataKey="ingreso" name="Ingreso" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="costo" name="Costo" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rentabilidad" name="Rentabilidad" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Proyección */}
        <TabsContent value="projection" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Proyección de Ingresos</CardTitle>
              <CardDescription>Proyección de ingresos para los próximos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { name: "Ene", actual: 120000, proyeccion: 0 },
                      { name: "Feb", actual: 130000, proyeccion: 0 },
                      { name: "Mar", actual: 130000, proyeccion: 0 },
                      { name: "Abr", actual: 143000, proyeccion: 0 },
                      { name: "May", actual: 152000, proyeccion: 0 },
                      { name: "Jun", actual: 160000, proyeccion: 0 },
                      ...projectionData,
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString("es-MX")}`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Ingresos Reales"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="proyeccion"
                      name="Proyección"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proyección Anual</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,895,000</div>
                <p className="text-xs text-green-500">+12.8% vs año anterior</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Progreso actual</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-brown rounded-full" style={{ width: "45%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">$835,000 de $1,895,000 proyectados</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Factores de Proyección</CardTitle>
                <CardDescription>Variables consideradas en la proyección</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Crecimiento histórico</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">8.5%</div>
                      <div className="w-20">
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-brown rounded-full" style={{ width: "85%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Estacionalidad</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">12.0%</div>
                      <div className="w-20">
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-brown rounded-full" style={{ width: "120%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Expansión de rutas</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">5.0%</div>
                      <div className="w-20">
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-brown rounded-full" style={{ width: "50%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Nuevos contratos</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">15.0%</div>
                      <div className="w-20">
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-brown rounded-full" style={{ width: "150%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
