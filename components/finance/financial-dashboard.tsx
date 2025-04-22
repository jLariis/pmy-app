"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  CalendarIcon,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  FileIcon as FilePdf,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import type { FinancialSummary } from "@/types/expenses"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface FinancialDashboardProps {
  data: FinancialSummary
}

export function FinancialDashboard({ data }: FinancialDashboardProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("month")

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value)
  }

  // Preparar datos para el gráfico de ingresos vs gastos
  const incomeVsExpensesData = data.incomeByDate.map((item, index) => {
    const expenseItem = data.expensesByDate[index] || { date: item.date, amount: 0 }
    const profitItem = data.profitByDate[index] || { date: item.date, amount: 0 }

    return {
      date: format(parseISO(item.date), "dd/MM", { locale: es }),
      ingresos: item.amount,
      gastos: expenseItem.amount,
      ganancia: profitItem.amount,
    }
  })

  // Preparar datos para el gráfico de categorías de gastos
  const expensesByCategoryData = data.expensesByCategory.map((category) => ({
    name: category.categoryName,
    value: category.amount,
    percentage: category.percentage,
    color: category.color,
  }))

  // Generar recomendaciones automáticas
  const generateRecommendations = () => {
    const recommendations = []

    // Comparar ingresos vs gastos
    if (data.totalExpenses > data.totalIncome * 0.8) {
      recommendations.push({
        title: "Gastos elevados",
        description: `Los gastos representan el ${((data.totalExpenses / data.totalIncome) * 100).toFixed(1)}% de los ingresos, considere reducir gastos.`,
        icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      })
    }

    // Identificar categoría con mayor gasto
    const topCategory = [...data.expensesByCategory].sort((a, b) => b.amount - a.amount)[0]
    if (topCategory && topCategory.percentage > 30) {
      recommendations.push({
        title: `Alto gasto en ${topCategory.categoryName}`,
        description: `La categoría ${topCategory.categoryName} representa el ${topCategory.percentage.toFixed(1)}% del total de gastos.`,
        icon: <TrendingUp className="h-4 w-4 text-red-500" />,
      })
    }

    // Comparar con período anterior
    if (data.compareToPreviousPeriod.expenses.percentage > 15) {
      recommendations.push({
        title: "Aumento significativo de gastos",
        description: `Los gastos aumentaron un ${data.compareToPreviousPeriod.expenses.percentage.toFixed(1)}% respecto al período anterior.`,
        icon: <ArrowUpRight className="h-4 w-4 text-red-500" />,
      })
    }

    if (data.compareToPreviousPeriod.income.percentage < -10) {
      recommendations.push({
        title: "Disminución de ingresos",
        description: `Los ingresos disminuyeron un ${Math.abs(data.compareToPreviousPeriod.income.percentage).toFixed(1)}% respecto al período anterior.`,
        icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
      })
    }

    return recommendations
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h2>
          <p className="text-muted-foreground">Análisis integral de ingresos, gastos y rentabilidad</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Día</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalIncome)}</div>
            <div className="flex items-center mt-1">
              {data.compareToPreviousPeriod.income.percentage >= 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-xs ${data.compareToPreviousPeriod.income.percentage >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data.compareToPreviousPeriod.income.percentage >= 0 ? "+" : ""}
                {data.compareToPreviousPeriod.income.percentage.toFixed(1)}% vs período anterior
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalExpenses)}</div>
            <div className="flex items-center mt-1">
              {data.compareToPreviousPeriod.expenses.percentage <= 0 ? (
                <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowUpRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-xs ${data.compareToPreviousPeriod.expenses.percentage <= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data.compareToPreviousPeriod.expenses.percentage >= 0 ? "+" : ""}
                {data.compareToPreviousPeriod.expenses.percentage.toFixed(1)}% vs período anterior
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.netProfit)}</div>
            <div className="flex items-center mt-1">
              {data.compareToPreviousPeriod.profit.percentage >= 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-xs ${data.compareToPreviousPeriod.profit.percentage >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data.compareToPreviousPeriod.profit.percentage >= 0 ? "+" : ""}
                {data.compareToPreviousPeriod.profit.percentage.toFixed(1)}% vs período anterior
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margen de Utilidad</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.profitMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Ganancia neta / Ingresos totales</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="income-expenses">Ingresos vs Gastos</TabsTrigger>
          <TabsTrigger value="expenses">Análisis de Gastos</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
        </TabsList>

        {/* Pestaña de Resumen */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Evolución Financiera</CardTitle>
                <CardDescription>Ingresos, gastos y ganancias en el tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incomeVsExpensesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `Fecha: ${label}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="ingresos" stroke="#4ade80" name="Ingresos" strokeWidth={2} />
                      <Line type="monotone" dataKey="gastos" stroke="#f87171" name="Gastos" strokeWidth={2} />
                      <Line type="monotone" dataKey="ganancia" stroke="#60a5fa" name="Ganancia" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
                <CardDescription>Por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesByCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {expensesByCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [formatCurrency(value), "Monto"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicadores Clave</CardTitle>
                <CardDescription>Métricas financieras importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Ratio Gastos/Ingresos:</span>
                    <span
                      className={`font-bold ${(data.totalExpenses / data.totalIncome) > 0.7 ? "text-amber-500" : "text-green-500"}`}
                    >
                      {((data.totalExpenses / data.totalIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Categoría con mayor gasto:</span>
                    <span className="font-bold">
                      {data.expensesByCategory.sort((a, b) => b.amount - a.amount)[0]?.categoryName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Día más rentable:</span>
                    <span className="font-bold">
                      {data.profitByDate.length > 0
                        ? format(
                            parseISO(data.profitByDate.sort((a, b) => b.amount - a.amount)[0]?.date),
                            "dd/MM/yyyy",
                            { locale: es },
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tendencia de ganancia:</span>
                    <span
                      className={`font-bold flex items-center ${data.compareToPreviousPeriod.profit.percentage >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {data.compareToPreviousPeriod.profit.percentage >= 0 ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {data.compareToPreviousPeriod.profit.percentage >= 0 ? "Positiva" : "Negativa"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Ingresos vs Gastos */}
        <TabsContent value="income-expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa de Ingresos vs Gastos</CardTitle>
              <CardDescription>Análisis detallado por período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeVsExpensesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), ""]}
                      labelFormatter={(label) => `Fecha: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="ingresos" fill="#4ade80" name="Ingresos" />
                    <Bar dataKey="gastos" fill="#f87171" name="Gastos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Ingresos Totales</div>
                  <div className="text-2xl font-bold mt-1">{formatCurrency(data.totalIncome)}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Gastos Totales</div>
                  <div className="text-2xl font-bold mt-1">{formatCurrency(data.totalExpenses)}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Ganancia Neta</div>
                  <div className="text-2xl font-bold mt-1">{formatCurrency(data.netProfit)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Análisis de Gastos */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Evolución de Gastos</CardTitle>
                <CardDescription>Tendencia de gastos en el tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.expensesByDate.map((item) => ({
                        date: format(parseISO(item.date), "dd/MM", { locale: es }),
                        gastos: item.amount,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), "Gastos"]}
                        labelFormatter={(label) => `Fecha: ${label}`}
                      />
                      <Line type="monotone" dataKey="gastos" stroke="#f87171" name="Gastos" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Desglose de gastos por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.expensesByCategory
                    .sort((a, b) => b.amount - a.amount)
                    .map((category) => (
                      <div key={category.categoryId} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: category.color }}
                            ></div>
                            <span>{category.categoryName}</span>
                          </div>
                          <span className="font-medium">{formatCurrency(category.amount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: category.color,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-right text-muted-foreground">
                          {category.percentage.toFixed(1)}% del total
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Tendencias</CardTitle>
                <CardDescription>Comparativa con períodos anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Variación de gastos:</span>
                    <span
                      className={`font-bold flex items-center ${data.compareToPreviousPeriod.expenses.percentage <= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {data.compareToPreviousPeriod.expenses.percentage <= 0 ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      )}
                      {data.compareToPreviousPeriod.expenses.percentage >= 0 ? "+" : ""}
                      {data.compareToPreviousPeriod.expenses.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Período anterior:</span>
                    <span className="font-medium">{formatCurrency(data.compareToPreviousPeriod.expenses.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Período actual:</span>
                    <span className="font-medium">{formatCurrency(data.totalExpenses)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Diferencia:</span>
                    <span
                      className={`font-medium ${data.totalExpenses - data.compareToPreviousPeriod.expenses.amount <= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {formatCurrency(data.totalExpenses - data.compareToPreviousPeriod.expenses.amount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Recomendaciones */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones Automáticas</CardTitle>
              <CardDescription>Sugerencias basadas en el análisis de datos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((recommendation, index) => (
                    <Alert key={index}>
                      <div className="flex items-center">
                        {recommendation.icon}
                        <AlertTitle className="ml-2">{recommendation.title}</AlertTitle>
                      </div>
                      <AlertDescription className="mt-1">{recommendation.description}</AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No hay recomendaciones en este momento.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botones de exportación */}
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Exportar a Excel
        </Button>
        <Button variant="outline">
          <FilePdf className="mr-2 h-4 w-4" />
          Exportar a PDF
        </Button>
      </div>
    </div>
  )
}
