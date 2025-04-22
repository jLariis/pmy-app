import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/finance")({
  component: FinanceLayout,
})

function FinanceLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
