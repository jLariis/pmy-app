"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ExpenseSummary } from "@/types/expenses"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface ExpensesSummaryProps {
  data: ExpenseSummary
}

export function ExpensesSummary({ data }: ExpensesSummaryProps) {
  // Preparar datos para el gráfico de categorías
  const categoryData = data.byCategory.map((category) => ({
    name: category.categoryName,
    value: category.amount,
    color: category.color,
  }))

  // Preparar datos para el gráfico de métodos de pago
  const paymentMethodData = data.byPaymentMethod.map((method) => ({
    name: method.method,
    value: method.amount,
  }))

  // Preparar datos para el gráfico de gastos por fecha
  const dateData = data.byDate
    .slice(-14) // Mostrar solo los últimos 14 días
    .map((item) => ({
      date: format(parseISO(item.date), "dd/MM", { locale: es }),
      amount: item.amount,
    }))

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value)
  }

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
          {payload[0].payload.percentage && (
            <p className="text-xs text-muted-foreground">{payload[0].payload.percentage.toFixed(1)}% del total</p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución de gastos por categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {data.byCategory.map((category) => (
              <div key={category.categoryId} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                  <span>{category.categoryName}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(category.amount)}</div>
                  <div className="text-xs text-muted-foreground">{category.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gastos por Fecha</CardTitle>
          <CardDescription>Evolución de gastos en los últimos días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Monto"]}
                  labelFormatter={(label) => `Fecha: ${label}`}
                />
                <Bar dataKey="amount" fill="#8884d8" name="Monto" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total de gastos:</span>
              <span className="font-bold">{formatCurrency(data.totalAmount)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Promedio diario:</span>
              <span>{formatCurrency(data.totalAmount / (data.byDate.length || 1))}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
