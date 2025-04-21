import { createFileRoute } from "@tanstack/react-router"

export const payrollRoute = createFileRoute("/dashboard/payroll")({
  component: Payroll,
})

function Payroll() {
  return <h1>Nómina</h1>
}
