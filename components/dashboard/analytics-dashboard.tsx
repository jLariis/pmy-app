"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Download, RefreshCw } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Datos de ejemplo para las gráficas
const deliveryData = [
  { name: "Lun", entregas: 32, devoluciones: 4 },
  { name: "Mar", entregas: 40, devoluciones: 3 },
  { name: "Mié", entregas: 45, devoluciones: 5 },
  { name: "Jue", entregas: 38, devoluciones: 2 },
  { name: "Vie", entregas: 50, devoluciones: 6 },
  { name: "Sáb", entregas: 25, devoluciones: 3 },
  { name: "Dom", entregas: 15, devoluciones: 1 },
]

const performanceData = [
  { name: "Semana 1", norte: 85, sur: 78, este: 92, oeste: 88 },
  { name: "Semana 2", norte: 88, sur: 82, este: 89, oeste: 90 },
  { name: "Semana 3", norte: 92, sur: 85, este: 94, oeste: 87 },
  { name: "Semana 4", norte: 90, sur: 88, este: 91, oeste: 93 },
]

const timeData = [
  { name: "8:00", tiempo: 25 },
  { name: "10:00", tiempo: 30 },
  { name: "12:00", tiempo: 45 },
  { name: "14:00", tiempo: 40 },
  { name: "16:00", tiempo: 35 },
  { name: "18:00", tiempo: 50 },
  { name: "20:00", tiempo: 55 },
]

// Datos para las tarjetas de KPI
const kpiData = {
  deliveryRate: 94.2,
  deliveryRateChange: 2.5,
  avgDeliveryTime: 35,
  avgDeliveryTimeChange: -5,
  activeDrivers: 18,
  activeDriversChange: 3,
  pendingDeliveries: 45,
  pendingDeliveriesChange: -10,
}

export function AnalyticsDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("week")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis Operativo</h2>
          <p className="text-muted-foreground">
            Monitorea el rendimiento de tus operaciones de entrega en tiempo real.
          </p>
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
              <SelectItem value="day">Día</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tarjetas de KPI */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.deliveryRate}%</div>
            <p className={cn("text-xs", kpiData.deliveryRateChange > 0 ? "text-green-500" : "text-red-500")}>
              {kpiData.deliveryRateChange > 0 ? "+" : ""}
              {kpiData.deliveryRateChange}% desde el período anterior
            </p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${kpiData.deliveryRate}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.avgDeliveryTime} min</div>
            <p className={cn("text-xs", kpiData.avgDeliveryTimeChange < 0 ? "text-green-500" : "text-red-500")}>
              {kpiData.avgDeliveryTimeChange > 0 ? "+" : ""}
              {kpiData.avgDeliveryTimeChange}% desde el período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repartidores Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.activeDrivers}</div>
            <p className={cn("text-xs", kpiData.activeDriversChange > 0 ? "text-green-500" : "text-red-500")}>
              {kpiData.activeDriversChange > 0 ? "+" : ""}
              {kpiData.activeDriversChange} desde el período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.pendingDeliveries}</div>
            <p className={cn("text-xs", kpiData.pendingDeliveriesChange < 0 ? "text-green-500" : "text-red-500")}>
              {kpiData.pendingDeliveriesChange > 0 ? "+" : ""}
              {kpiData.pendingDeliveriesChange}% desde el período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficas */}
      <Tabs defaultValue="deliveries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deliveries">Entregas</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento por Ruta</TabsTrigger>
          <TabsTrigger value="time">Tiempos de Entrega</TabsTrigger>
        </TabsList>
        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entregas vs Devoluciones</CardTitle>
              <CardDescription>Comparativa de entregas exitosas y devoluciones por día de la semana</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="entregas" name="Entregas Exitosas" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="devoluciones" name="Devoluciones" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Ruta</CardTitle>
              <CardDescription>Porcentaje de entregas exitosas por ruta y semana</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="norte" name="Ruta Norte" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="sur" name="Ruta Sur" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="este" name="Ruta Este" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="oeste" name="Ruta Oeste" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tiempos de Entrega</CardTitle>
              <CardDescription>Tiempo promedio de entrega por hora del día (en minutos)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tiempo"
                    name="Tiempo Promedio (min)"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Análisis detallado */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Repartidor</CardTitle>
            <CardDescription>Top 5 repartidores por rendimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Juan Pérez", deliveries: 45, rate: 98 },
                { name: "María González", deliveries: 42, rate: 95 },
                { name: "Carlos Rodríguez", deliveries: 38, rate: 94 },
                { name: "Ana Martínez", deliveries: 36, rate: 92 },
                { name: "Pedro Sánchez", deliveries: 33, rate: 90 },
              ].map((driver, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">
                      {index + 1}. {driver.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{driver.deliveries} entregas</div>
                    <div className="w-20">
                      <div className="text-sm font-medium text-right">{driver.rate}%</div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-brown rounded-full" style={{ width: `${driver.rate}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Zona</CardTitle>
            <CardDescription>Rendimiento por zona geográfica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Hermosillo Centro", deliveries: 120, rate: 96 },
                { name: "Ciudad Obregón", deliveries: 95, rate: 93 },
                { name: "Guaymas", deliveries: 85, rate: 91 },
                { name: "Navojoa", deliveries: 75, rate: 89 },
                { name: "Caborca", deliveries: 65, rate: 87 },
              ].map((zone, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{zone.name}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{zone.deliveries} entregas</div>
                    <div className="w-20">
                      <div className="text-sm font-medium text-right">{zone.rate}%</div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-brown rounded-full" style={{ width: `${zone.rate}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
