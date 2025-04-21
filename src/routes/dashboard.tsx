import { createFileRoute } from "@tanstack/react-router"
import { Sidebar } from "../components/Sidebar"
import { Outlet } from "react-router-dom"

export const dashboardRoute = createFileRoute("/dashboard")({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-4">
        <Outlet />
      </main>
    </div>
  )
}
