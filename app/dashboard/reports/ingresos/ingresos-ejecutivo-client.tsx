"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Upload,
  TrendingUp,
  DollarSign,
  Package,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ExcelUploader } from "@/components/ingresos/excel-uploader"
import { IngresosResumen } from "@/components/ingresos/ingresos-resumen"
import { IngresosGraficos } from "@/components/ingresos/ingresos-graficos"
import { IngresosTabla } from "@/components/ingresos/ingresos-tabla"
import { GuiaSearch } from "@/components/ingresos/guia-search"

// Datos de ejemplo para la demostración
const demoData = {
  fechas: ["2023-04-15", "2023-04-16", "2023-04-17", "2023-04-18", "2023-04-19", "2023-04-20", "2023-04-21"],
  fedex: {
    pod: [45, 52, 48, 50, 55, 42, 38],
    dex07: [5, 8, 6, 7, 4, 6, 5],
  },
  dhl: {
    ok: [32, 35, 30, 38, 40, 36, 34],
    ba: [3, 4, 2, 5, 3, 4, 2],
  },
  ingresosFedex: [2975.5, 3570.6, 3213.54, 3391.07, 3510.09, 2856.48, 2561.43],
  ingresosDhl: [1575, 1755, 1440, 1935, 1935, 1800, 1620],
  totalDiario: [4550.5, 5325.6, 4653.54, 5326.07, 5445.09, 4656.48, 4181.43],
  totalGeneral: 34138.71,
}

export function IngresosEjecutivoClient() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("week")
  const [dataLoaded, setDataLoaded] = useState(true) // Para demo, iniciamos con datos cargados

  const handleFileUpload = (file: File) => {
    // Aquí iría la lógica real de procesamiento del archivo
    console.log("Archivo cargado:", file.name)
    setDataLoaded(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis de Ingresos</h2>
          <p className="text-muted-foreground">
            Visualización ejecutiva de ingresos generados por entregas de paquetería
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
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard Ejecutivo</TabsTrigger>
          <TabsTrigger value="upload">Cargar Datos</TabsTrigger>
          <TabsTrigger value="table">Tabla Detallada</TabsTrigger>
          <TabsTrigger value="search">Buscar Guía</TabsTrigger>
        </TabsList>

        {/* Dashboard Ejecutivo */}
        <TabsContent value="dashboard" className="space-y-4">
          {dataLoaded ? (
            <>
              {/* KPIs principales */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $
                      {demoData.totalGeneral.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <p className="text-xs text-green-500">+8.2% vs período anterior</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos FedEx</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $
                      {demoData.ingresosFedex
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-green-500">+5.7% vs período anterior</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos DHL</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $
                      {demoData.ingresosDhl
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-green-500">+12.3% vs período anterior</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Entregas</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {demoData.fedex.pod.reduce((a, b) => a + b, 0) +
                        demoData.fedex.dex07.reduce((a, b) => a + b, 0) +
                        demoData.dhl.ok.reduce((a, b) => a + b, 0) +
                        demoData.dhl.ba.reduce((a, b) => a + b, 0)}
                    </div>
                    <p className="text-xs text-green-500">+6.8% vs período anterior</p>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos y resumen */}
              <div className="grid gap-4 md:grid-cols-2">
                <IngresosGraficos data={demoData} />
                <IngresosResumen data={demoData} />
              </div>

              {/* Botones de exportación */}
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Exportar a Excel
                </Button>
                <Button variant="outline">
                  <FilePdf className="mr-2 h-4 w-4" />
                  Exportar a PDF
                </Button>
              </div>
            </>
          ) : (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>No hay datos cargados</CardTitle>
                <CardDescription>
                  Por favor, cargue un archivo Excel con los datos de entregas para visualizar el análisis.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => document.getElementById("upload-tab")?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Cargar Datos
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Carga de Datos */}
        <TabsContent value="upload" className="space-y-4">
          <ExcelUploader onFileUpload={handleFileUpload} />
        </TabsContent>

        {/* Tabla Detallada */}
        <TabsContent value="table" className="space-y-4">
          {dataLoaded ? (
            <IngresosTabla data={demoData} />
          ) : (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>No hay datos cargados</CardTitle>
                <CardDescription>
                  Por favor, cargue un archivo Excel con los datos de entregas para visualizar la tabla detallada.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => document.getElementById("upload-tab")?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Cargar Datos
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Búsqueda de Guía */}
        <TabsContent value="search" className="space-y-4">
          <GuiaSearch />
        </TabsContent>
      </Tabs>
    </div>
  )
}
