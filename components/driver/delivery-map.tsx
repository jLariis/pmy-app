"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface DeliveryMapProps {
  shipments: Shipment[]
  isOpen: boolean
  onClose: () => void
}

export function DeliveryMap({ shipments, isOpen, onClose }: DeliveryMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Mapa de Entregas</DialogTitle>
        </DialogHeader>
        <div className="h-[500px] w-full">
          {typeof window !== "undefined" && (
            <MapContainer center={[27.4863, -109.9305]} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* In a real app, you would fetch and display actual coordinates */}
              {shipments.map((shipment, index) => (
                <Marker
                  key={shipment.trackingNumber}
                  // Using fake coordinates for demonstration
                  position={[27.4863 + index * 0.01, -109.9305 - index * 0.01]}
                >
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{shipment.recipientName}</h3>
                      <p>{shipment.recipientAddress}</p>
                      <p>
                        {shipment.recipientCity}, {shipment.recipientZip}
                      </p>
                      <Button
                        size="sm"
                        className="mt-2 w-full bg-brand-brown hover:bg-brand-brown/90"
                        onClick={() => {
                          onClose()
                          // In a real app, you would navigate to the delivery details
                        }}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}