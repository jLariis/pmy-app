import { createFileRoute } from "@tanstack/react-router"

export const reportsRoute = createFileRoute("/dashboard/reports")({
  component: Reports,
})

function Reports() {
  return <h1>Reportes Gerenciales</h1>
}
