import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

interface Shipment {
  trackingNumber: string
  recipientName: string
  recipientAddress: string
  recipientCity: string
  recipientZip: string
  status: string
  payment?: {
    amount: number
    status: string
  }
}

interface ShipmentMapProps {
  shipments: Shipment[]
}

export default function ShipmentMap({ shipments }: ShipmentMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [locations, setLocations] = useState<{ lat: number; lon: number; shipment: Shipment }[]>([])
  const [unfoundAddresses, setUnfoundAddresses] = useState<Shipment[]>([])

  useEffect(() => {
    setIsMounted(true)

    // Fix Leaflet marker icon issue in Next.js
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    })
  }, [])

  useEffect(() => {
    if (shipments.length === 0) return

    const fetchLocations = async () => {
      const results = await Promise.all(
        shipments.map(async (shipment) => {
          const query = `${shipment.recipientAddress}, ${shipment.recipientCity}, ${shipment.recipientZip}`
          const url = `/api/geocode?q=${encodeURIComponent(query)}`

          try {
            const res = await fetch(url)
            const data = await res.json()
            if (data.length > 0) {
              return { lat: data[0].lat, lon: data[0].lon, shipment }
            } else {
              return { unfound: true, shipment }
            }
          } catch (error) {
            console.error("Error fetching location:", error)
            return { unfound: true, shipment }
          }
        }),
      )

      const foundLocations = results.filter((result) => !result.unfound) as {
        lat: number
        lon: number
        shipment: Shipment
      }[]
      const unfoundShipments = results.filter((result) => result.unfound).map((result) => result.shipment)

      setLocations(foundLocations)
      setUnfoundAddresses(unfoundShipments)
    }

    fetchLocations()
  }, [shipments])

  if (!isMounted) {
    return null
  }

  return (
    <MapContainer center={[27.4863, -109.9305]} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(({ lat, lon, shipment }) => (
        <Marker key={shipment.trackingNumber} position={[Number.parseFloat(lat), Number.parseFloat(lon)]}>
          <Popup>
            <div>
              <h3 className="font-semibold">{shipment.recipientName}</h3>
              <p>
                {shipment.recipientAddress}, {shipment.recipientCity}
              </p>
              <p>Estado: {shipment.status}</p>
              <p>Pago: {shipment.payment ? `$${shipment.payment.amount} (${shipment.payment.status})` : "N/A"}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      {unfoundAddresses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Direcciones no encontradas:</h3>
          <ul className="list-disc pl-5">
            {unfoundAddresses.map((shipment) => (
              <li key={shipment.trackingNumber} className="text-sm text-gray-600">
                {shipment.recipientAddress}, {shipment.recipientCity}, {shipment.recipientZip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </MapContainer>
  )
}

