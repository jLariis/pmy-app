"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Package, DollarSign, Calendar, MapPin, Truck, CheckCircle, XCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function GuiaSearch() {
  const [guia, setGuia] = useState("")
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async () => {
    if (!guia.trim()) return

    setSearching(true)
    setResult(null)
    setNotFound(false)

    try {
      // Simulamos una búsqueda
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo para la demostración
      if (guia.toLowerCase().includes("fedex")) {
        setResult({
          numero: guia,
          compania: "FedEx",
          estado: "POD",
          fecha: "2023-04-18",
          direccion: "Calle Principal #123, Hermosillo, Sonora",
          repartidor: "Juan Pérez",
          ingreso: 59.51,
        })
      } else if (guia.toLowerCase().includes("dhl")) {
        setResult({
          numero: guia,
          compania: "DHL",
          estado: "OK",
          fecha: "2023-04-19",
          direccion: "Av. Reforma #456, Hermosillo, Sonora",
          repartidor: "María González",
          ingreso: 45.0,
        })
      } else {
        setNotFound(true)
      }
    } catch (error) {
      console.error("Error al buscar la guía:", error)
      setNotFound(true)
    } finally {
      setSearching(false)
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Consulta de Guías</CardTitle>
        <CardDescription>Busque información detallada sobre una guía específica</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="guia-search">Número de Guía</Label>
            <Input
              id="guia-search"
              placeholder="Ingrese el número de guía (ej: FedEx123456 o DHL789012)"
              value={guia}
              onChange={(e) => setGuia(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleSearch} disabled={!guia.trim() || searching} className="mt-auto">
            {searching ? "Buscando..." : "Buscar"}
            {!searching && <Search className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {searching && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        )}

        {notFound && (
          <div className="p-6 text-center border rounded-lg">
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-2" />
            <h3 className="text-lg font-semibold">Guía no encontrada</h3>
            <p className="text-muted-foreground">
              No se encontró información para la guía {guia}. Verifique el número e intente nuevamente.
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-brand-brown" />
                <h3 className="text-xl font-semibold">{result.numero}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.estado === "POD" || result.estado === "OK"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {result.estado}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Entrega</p>
                    <p className="font-medium">{result.fecha}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="font-medium">{result.direccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Truck className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Repartidor</p>
                    <p className="font-medium">{result.repartidor}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-4">Información Financiera</h4>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <DollarSign className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ingreso Generado</p>
                      <p className="text-xl font-bold">${result.ingreso.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Compañía</p>
                      <p className="font-medium">{result.compania}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t mt-4">
                    <p className="text-sm text-muted-foreground">
                      {result.compania === "FedEx"
                        ? "Tarifa FedEx: $59.51 por entrega"
                        : "Tarifa DHL: $45.00 por entrega"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
