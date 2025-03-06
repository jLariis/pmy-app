import { createFileRoute } from "@tanstack/react-router"

export const operationRoute = createFileRoute("/dashboard/operation")({
  component: Operation,
})

function Operation() {
  return <h1>Operación</h1>
}

