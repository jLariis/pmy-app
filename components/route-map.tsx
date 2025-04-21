"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Importar dinámicamente los componentes de Leaflet para evitar problemas de SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

interface RoutePoint {
  lat: number
  lng: number
  label: string
  type: "pickup" | "delivery" | "waypoint"
}

interface RouteMapProps {
  routeId: string
  height?: string
}

export function RouteMap({ routeId, height = "300px" }: RouteMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([])
  const [routePath, setRoutePath] = useState<[number, number][]>([])

  useEffect(() => {
    setIsClient(true)

    // Simular carga de datos de ruta
    setTimeout(() => {
      // Datos de muestra para diferentes rutas
      const routeData: Record<string, { points: RoutePoint[]; path: [number, number][] }> = {
        "1": {
          points: [
            { lat: 27.4863, lng: -109.9305, label: "Sucursal Hermosillo", type: "pickup" },
            { lat: 27.4963, lng: -109.9405, label: "Entrega #1: Mario Velázquez", type: "delivery" },
            { lat: 27.5063, lng: -109.9505, label: "Entrega #2: María Valles", type: "delivery" },
            { lat: 27.5163, lng: -109.9605, label: "Entrega #3: Luis Fuentes", type: "delivery" },
          ],
          path: [
            [27.4863, -109.9305],
            [27.4963, -109.9405],
            [27.5063, -109.9505],
            [27.5163, -109.9605],
          ],
        },
        "2": {
          points: [
            { lat: 27.4863, lng: -109.9305, label: "Sucursal Ciudad Obregón", type: "pickup" },
            { lat: 27.4763, lng: -109.9205, label: "Entrega #1: Jorge Armenta", type: "delivery" },
            { lat: 27.4663, lng: -109.9105, label: "Entrega #2: Lucia García", type: "delivery" },
            { lat: 27.4563, lng: -109.9005, label: "Entrega #3: Miguel Parra", type: "delivery" },
          ],
          path: [
            [27.4863, -109.9305],
            [27.4763, -109.9205],
            [27.4663, -109.9105],
            [27.4563, -109.9005],
          ],
        },
        "3": {
          points: [
            { lat: 27.4863, lng: -109.9305, label: "Sucursal Bacum", type: "pickup" },
            { lat: 27.4963, lng: -109.9205, label: "Entrega #1: Reyna Inzunza", type: "delivery" },
            { lat: 27.5063, lng: -109.9105, label: "Entrega #2: Rosa Arballo", type: "delivery" },
            { lat: 27.5163, lng: -109.9005, label: "Entrega #3: Lorenia Murrieta", type: "delivery" },
          ],
          path: [
            [27.4863, -109.9305],
            [27.4963, -109.9205],
            [27.5063, -109.9105],
            [27.5163, -109.9005],
          ],
        },
        "4": {
          points: [
            { lat: 27.4863, lng: -109.9305, label: "Sucursal Cajeme", type: "pickup" },
            { lat: 27.4763, lng: -109.9405, label: "Entrega #1: Marco Sandoval", type: "delivery" },
            { lat: 27.4663, lng: -109.9505, label: "Entrega #2: Orlando Castro", type: "delivery" },
            { lat: 27.4563, lng: -109.9605, label: "Punto de control", type: "waypoint" },
          ],
          path: [
            [27.4863, -109.9305],
            [27.4763, -109.9405],
            [27.4663, -109.9505],
            [27.4563, -109.9605],
          ],
        },
      }

      // Cargar datos de la ruta seleccionada o usar datos por defecto
      const data = routeData[routeId] || routeData["1"]
      setRoutePoints(data.points)
      setRoutePath(data.path)
      setIsLoading(false)
    }, 1000)
  }, [routeId])

  if (!isClient) return null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <Loader2 className="h-8 w-8 animate-spin text-brand-brown" />
        <span className="ml-2">Cargando mapa de ruta...</span>
      </div>
    )
  }

  // Calcular el centro del mapa basado en los puntos de la ruta
  const center =
    routePoints.length > 0
      ? ([routePoints[0].lat, routePoints[0].lng] as [number, number])
      : ([27.4863, -109.9305] as [number, number])

  return (
    <div style={{ height }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Dibujar la línea de la ruta */}
        <Polyline positions={routePath} color="#993333" weight={4} opacity={0.7} dashArray="10,10" />

        {/* Mostrar los marcadores de cada punto */}
        {routePoints.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]}>
            <Popup>
              <div className="p-1">
                <p className="font-semibold">{point.label}</p>
                <p className="text-xs text-gray-600">
                  {point.type === "pickup"
                    ? "Punto de recolección"
                    : point.type === "delivery"
                      ? "Punto de entrega"
                      : "Punto de control"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
