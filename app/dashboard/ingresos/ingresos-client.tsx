"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelUploader } from "@/components/ingresos/excel-uploader"
import { IngresosTable } from "@/components/ingresos/ingresos-table"
import { GuiaSearch } from "@/components/ingresos/guia-search"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FileText } from "lucide-react"
import { exportToExcel, exportToPdf } from "@/lib/export-utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { DeliveryData, ProcessedData } from "@/types/ingresos"

export function IngresosClient() {
  const [activeTab, setActiveTab] = useState("upload")
  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([])
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDataLoaded = (data: DeliveryData[]) => {
    setDeliveryData(data)
    setActiveTab("results")
    processDeliveryData(data)
  }

  const processDeliveryData = (data: DeliveryData[]) => {
    setLoading(true)
    setError(null)

    try {
      // Agrupar por fecha
      const groupedByDate = data.reduce(
        (acc, item) => {
          const date = new Date(item.fecha).toISOString().split("T")[0]
          if (!acc[date]) {
            acc[date] = {
              fedex: { pod: 0, dex07: 0 },
              dhl: { ok: 0, ba: 0 },
            }
          }

          // Categorizar por compañía y estado
          if (item.compania.toLowerCase() === "fedex") {
            if (item.estado.toLowerCase() === "pod") {
              acc[date].fedex.pod += 1
            } else if (item.estado.toLowerCase() === "dex 07" || item.estado.toLowerCase() === "dex07") {
              acc[date].fedex.dex07 += 1
            }
          } else if (item.compania.toLowerCase() === "dhl") {
            if (item.estado.toLowerCase() === "ok") {
              acc[date].dhl.ok += 1
            } else if (item.estado.toLowerCase() === "ba") {
              acc[date].dhl.ba += 1
            }
          }

          return acc
        },
        {} as Record<string, { fedex: { pod: number; dex07: number }; dhl: { ok: number; ba: number } }>,
      )

      // Calcular ingresos
      const dates = Object.keys(groupedByDate).sort()
      const processedData: ProcessedData = {
        dates,
        fedex: {
          pod: {},
          dex07: {},
          total: {},
        },
        dhl: {
          ok: {},
          ba: {},
          total: {},
        },
        dailyTotals: {},
        grandTotal: 0,
      }

      // Tarifas
      const FEDEX_RATE = 59.51
      const DHL_RATE = 45

      let grandTotal = 0

      dates.forEach((date) => {
        const dateData = groupedByDate[date]

        // FedEx
        const fedexPod = dateData.fedex.pod
        const fedexDex07 = dateData.fedex.dex07
        const fedexPodIncome = fedexPod * FEDEX_RATE
        const fedexDex07Income = fedexDex07 * FEDEX_RATE
        const fedexTotal = fedexPodIncome + fedexDex07Income

        processedData.fedex.pod[date] = fedexPod
        processedData.fedex.dex07[date] = fedexDex07
        processedData.fedex.total[date] = fedexTotal

        // DHL
        const dhlOk = dateData.dhl.ok
        const dhlBa = dateData.dhl.ba
        const dhlOkIncome = dhlOk * DHL_RATE
        const dhlBaIncome = dhlBa * DHL_RATE
        const dhlTotal = dhlOkIncome + dhlBaIncome

        processedData.dhl.ok[date] = dhlOk
        processedData.dhl.ba[date] = dhlBa
        processedData.dhl.total[date] = dhlTotal

        // Totales diarios
        const dailyTotal = fedexTotal + dhlTotal
        processedData.dailyTotals[date] = dailyTotal
        grandTotal += dailyTotal
      })

      processedData.grandTotal = grandTotal
      setProcessedData(processedData)
    } catch (err) {
      console.error("Error al procesar datos:", err)
      setError("Error al procesar los datos. Verifique el formato del archivo.")
    } finally {
      setLoading(false)
    }
  }

  const handleExportExcel = () => {
    if (processedData) {
      exportToExcel(processedData, deliveryData, "Reporte_Ingresos")
    }
  }

  const handleExportPdf = () => {
    if (processedData) {
      exportToPdf(processedData, "Reporte_Ingresos")
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Cargar Datos</TabsTrigger>
          <TabsTrigger value="results" disabled={!processedData}>
            Resultados
          </TabsTrigger>
          <TabsTrigger value="search">Buscar Guía</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cargar Archivo de Entregas</CardTitle>
              <CardDescription>
                Sube un archivo Excel con los registros de entregas para calcular los ingresos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExcelUploader onDataLoaded={handleDataLoaded} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {processedData && (
            <>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleExportExcel}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Exportar a Excel
                </Button>
                <Button variant="outline" onClick={handleExportPdf}>
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar a PDF
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Ingresos</CardTitle>
                  <CardDescription>Ingresos generados por entregas de FedEx y DHL</CardDescription>
                </CardHeader>
                <CardContent>
                  <IngresosTable data={processedData} loading={loading} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Ingresos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">FedEx Total</div>
                      <div className="text-2xl font-bold">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                          Object.values(processedData.fedex.total).reduce((sum, val) => sum + val, 0),
                        )}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">DHL Total</div>
                      <div className="text-2xl font-bold">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                          Object.values(processedData.dhl.total).reduce((sum, val) => sum + val, 0),
                        )}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Entregas Totales</div>
                      <div className="text-2xl font-bold">{deliveryData.length}</div>
                    </div>
                    <div className="rounded-lg border p-3 bg-primary/10">
                      <div className="text-sm font-medium text-muted-foreground">Ingresos Totales</div>
                      <div className="text-2xl font-bold">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                          processedData.grandTotal,
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Guía</CardTitle>
              <CardDescription>Consulta el estado de una guía específica</CardDescription>
            </CardHeader>
            <CardContent>
              <GuiaSearch deliveryData={deliveryData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
