import { RouterProvider, createRouter } from "@tanstack/react-router"
import { rootRoute } from "./routes/root"
import { loginRoute } from "./routes/login"
import { dashboardRoute } from "./routes/dashboard"
import { administrationRoute } from "./routes/administration"
import { operationRoute } from "./routes/operation"
import { vehicleMaintenanceRoute } from "./routes/vehicleMaintenance"
import { reportsRoute } from "./routes/reports"
import { payrollRoute } from "./routes/payroll"
import { invoicesRoute } from "./routes/invoices"

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute.addChildren([
    administrationRoute,
    operationRoute,
    vehicleMaintenanceRoute,
    reportsRoute,
    payrollRoute,
    invoicesRoute,
  ]),
])

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export default App
