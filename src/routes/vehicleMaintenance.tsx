import { createFileRoute } from "@tanstack/react-router"

export const vehicleMaintenanceRoute = createFileRoute("/dashboard/vehicle-maintenance")({
  component: VehicleMaintenance,
})

function VehicleMaintenance() {
  return <h1>Mantenimiento de Vehículos</h1>
}
