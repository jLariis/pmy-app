import { createFileRoute } from "@tanstack/react-router"

export const invoicesRoute = createFileRoute("/dashboard/invoices")({
  component: Invoices,
})

function Invoices() {
  return <h1>Facturas</h1>
}

