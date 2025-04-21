import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"

const data = [
  {
    id: "1",
    date: "2023-05-01",
    totalSales: 50000,
    numberOfOrders: 100,
    averageOrderValue: 500,
  },
  {
    id: "2",
    date: "2023-05-02",
    totalSales: 55000,
    numberOfOrders: 110,
    averageOrderValue: 500,
  },
  // Add more sales data as needed
]

export default function SalesReportPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reporte de Ventas" description="Análisis detallado de las ventas" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$105,000</div>
            <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Número de Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210</div>
            <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Promedio de Orden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500</div>
            <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Resumen de Ventas</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
