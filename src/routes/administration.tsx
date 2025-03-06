import { createFileRoute } from "@tanstack/react-router"

export const administrationRoute = createFileRoute("/dashboard/administration")({
  component: Administration,
})

function Administration() {
  return <h1>Administración</h1>
}

