"use client"

import { useState } from "react"
import type { Expense, ExpenseCategory, FinancialSummary } from "../../types/expenses"
import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js"
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react"

// Registrar los componentes necesarios para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title)

interface FinancialDashboardProps {
  expenses: Expense[]
  categories: ExpenseCategory[]
  income: { date: string; amount: number }[]
  summary: FinancialSummary
}

export function FinancialDashboard({ expenses, categories, income, summary }: FinancialDashboardProps) {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "quarter" | "year">("month")

  // Preparar datos para el gráfico de ingresos vs gastos
  const financialData = {
    labels: Object.keys(summary.incomeByPeriod).map((period) => {
      const [year, month] = period.split("-")
      return `${month}/${year.substring(2)}`
    }),
    datasets: [
      {
        label: "Ingresos",
        data: Object.values(summary.incomeByPeriod),
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Gastos",
        data: Object.values(summary.expensesByPeriod),
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Preparar datos para el gráfico de distribución de gastos
  const expenseDistributionData = {
    labels: summary.topExpenseCategories.map((item) => {
      const category = categories.find((c) => c.id === item.category)
      return category ? category.name : "Desconocida"
    }),
    datasets: [
      {
        data: summary.topExpenseCategories.map((item) => item.amount),
        backgroundColor: summary.topExpenseCategories.map((item) => {
          const category = categories.find((c) => c.id === item.category)
          return category ? category.color : "#cccccc"
        }),
        borderWidth: 1,
      },
    ],
  }

  // Preparar datos para el gráfico de ganancia neta
  const profitData = {
    labels: Object.keys(summary.profitByPeriod).map((period) => {
      const [year, month] = period.split("-")
      return `${month}/${year.substring(2)}`
    }),
    datasets: [
      {
        label: "Ganancia Neta",
        data: Object.values(summary.profitByPeriod),
        backgroundColor: Object.values(summary.profitByPeriod).map((value) =>
          value >= 0 ? "rgba(16, 185, 129, 0.6)" : "rgba(239, 68, 68, 0.6)",
        ),
        borderColor: Object.values(summary.profitByPeriod).map((value) =>
          value >= 0 ? "rgba(16, 185, 129, 1)" : "rgba(239, 68, 68, 1)",
        ),
        borderWidth: 1,
      },
    ],
  }

  // Generar recomendaciones basadas en los datos
  const generateRecommendations = () => {
    const recommendations = []

    // Verificar margen de utilidad
    if (summary.profitMargin < 10) {
      recommendations.push({
        type: "warning",
        message: `El margen de utilidad es bajo (${summary.profitMargin.toFixed(1)}%). Considere revisar la estructura de costos o ajustar precios.`,
      })
    }

    // Verificar tendencia de gastos
    const periods = Object.keys(summary.expensesByPeriod).sort()
    if (periods.length >= 2) {
      const lastPeriod = periods[periods.length - 1]
      const previousPeriod = periods[periods.length - 2]
      const lastExpenses = summary.expensesByPeriod[lastPeriod]
      const previousExpenses = summary.expensesByPeriod[previousPeriod]

      const expenseChange = ((lastExpenses - previousExpenses) / previousExpenses) * 100

      if (expenseChange > 20) {
        recommendations.push({
          type: "alert",
          message: `Los gastos aumentaron un ${expenseChange.toFixed(1)}% respecto al período anterior. Revise las categorías con mayor incremento.`,
        })
      }
    }

    // Verificar categorías de gasto desproporcionadas
    const topCategory = summary.topExpenseCategories[0]
    if (topCategory && topCategory.percentage > 40) {
      const categoryName = categories.find((c) => c.id === topCategory.category)?.name || "Desconocida"
      recommendations.push({
        type: "info",
        message: `La categoría "${categoryName}" representa el ${topCategory.percentage.toFixed(1)}% de los gastos totales. Considere estrategias para optimizar este gasto.`,
      })
    }

    // Verificar tendencia de ingresos
    if (periods.length >= 2) {
      const lastPeriod = periods[periods.length - 1]
      const previousPeriod = periods[periods.length - 2]
      const lastIncome = summary.incomeByPeriod[lastPeriod] || 0
      const previousIncome = summary.incomeByPeriod[previousPeriod] || 0

      const incomeChange = ((lastIncome - previousIncome) / previousIncome) * 100

      if (incomeChange < -10) {
        recommendations.push({
          type: "alert",
          message: `Los ingresos disminuyeron un ${Math.abs(incomeChange).toFixed(1)}% respecto al período anterior. Revise las estrategias de ventas y marketing.`,
        })
      }
    }

    return recommendations
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Financiero</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === "month" ? "bg-brand-brown text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setTimeframe("quarter")}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === "quarter" ? "bg-brand-brown text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Trimestral
          </button>
          <button
            onClick={() => setTimeframe("year")}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === "year" ? "bg-brand-brown text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">${summary.totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Gastos Totales</p>
              <p className="text-2xl font-bold text-gray-900">${summary.totalExpenses.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Ganancia Neta</p>
              <p className="text-2xl font-bold text-gray-900">${summary.netProfit.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Margen de Utilidad</p>
              <p className="text-2xl font-bold text-gray-900">{summary.profitMargin.toFixed(1)}%</p>
            </div>
            <div
              className={`p-2 rounded-full ${summary.profitMargin > 20 ? "bg-green-100" : summary.profitMargin > 10 ? "bg-yellow-100" : "bg-red-100"}`}
            >
              <TrendingUp
                className={`h-5 w-5 ${summary.profitMargin > 20 ? "text-green-600" : summary.profitMargin > 10 ? "text-yellow-600" : "text-red-600"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ingresos vs Gastos</h3>
          <div className="h-80">
            <Line
              data={financialData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        let label = context.dataset.label || ""
                        if (label) {
                          label += ": "
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                            context.parsed.y,
                          )
                        }
                        return label
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ganancia Neta</h3>
          <div className="h-80">
            <Bar
              data={profitData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        let label = context.dataset.label || ""
                        if (label) {
                          label += ": "
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                            context.parsed.y,
                          )
                        }
                        return label
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución de Gastos</h3>
          <div className="h-64">
            <Pie
              data={expenseDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 12,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || ""
                        const value = context.parsed || 0
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                        const percentage = ((value / total) * 100).toFixed(1)
                        return `${label}: ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value)} (${percentage}%)`
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recomendaciones y Alertas</h3>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md ${
                    rec.type === "warning"
                      ? "bg-yellow-50 border border-yellow-200"
                      : rec.type === "alert"
                        ? "bg-red-50 border border-red-200"
                        : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div className="flex">
                    <AlertCircle
                      className={`h-5 w-5 mr-2 ${
                        rec.type === "warning"
                          ? "text-yellow-600"
                          : rec.type === "alert"
                            ? "text-red-600"
                            : "text-blue-600"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        rec.type === "warning"
                          ? "text-yellow-800"
                          : rec.type === "alert"
                            ? "text-red-800"
                            : "text-blue-800"
                      }`}
                    >
                      {rec.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  No hay recomendaciones o alertas en este momento. La situación financiera parece estable.
                </p>
              </div>
            )}

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Comparativa con período anterior</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Ingresos</p>
                  <p
                    className={`text-sm font-medium ${(() => {
                      const periods = Object.keys(summary.incomeByPeriod).sort()
                      if (periods.length < 2) return "text-gray-700"

                      const lastPeriod = periods[periods.length - 1]
                      const previousPeriod = periods[periods.length - 2]
                      const lastIncome = summary.incomeByPeriod[lastPeriod] || 0
                      const previousIncome = summary.incomeByPeriod[previousPeriod] || 0

                      const change = ((lastIncome - previousIncome) / previousIncome) * 100
                      return change >= 0 ? "text-green-600" : "text-red-600"
                    })()}`}
                  >
                    {(() => {
                      const periods = Object.keys(summary.incomeByPeriod).sort()
                      if (periods.length < 2) return "No hay datos suficientes"

                      const lastPeriod = periods[periods.length - 1]
                      const previousPeriod = periods[periods.length - 2]
                      const lastIncome = summary.incomeByPeriod[lastPeriod] || 0
                      const previousIncome = summary.incomeByPeriod[previousPeriod] || 0

                      const change = ((lastIncome - previousIncome) / previousIncome) * 100
                      return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Gastos</p>
                  <p
                    className={`text-sm font-medium ${(() => {
                      const periods = Object.keys(summary.expensesByPeriod).sort()
                      if (periods.length < 2) return "text-gray-700"

                      const lastPeriod = periods[periods.length - 1]
                      const previousPeriod = periods[periods.length - 2]
                      const lastExpenses = summary.expensesByPeriod[lastPeriod] || 0
                      const previousExpenses = summary.expensesByPeriod[previousPeriod] || 0

                      const change = ((lastExpenses - previousExpenses) / previousExpenses) * 100
                      return change <= 0 ? "text-green-600" : "text-red-600"
                    })()}`}
                  >
                    {(() => {
                      const periods = Object.keys(summary.expensesByPeriod).sort()
                      if (periods.length < 2) return "No hay datos suficientes"

                      const lastPeriod = periods[periods.length - 1]
                      const previousPeriod = periods[periods.length - 2]
                      const lastExpenses = summary.expensesByPeriod[lastPeriod] || 0
                      const previousExpenses = summary.expensesByPeriod[previousPeriod] || 0

                      const change = ((lastExpenses - previousExpenses) / previousExpenses) * 100
                      return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Ganancia</p>
                  <p
                    className={`text-sm font-medium ${(() => {
                      const periods = Object.keys(summary.profitByPeriod).sort()
                      if (periods.length < 2) return "text-gray-700"

                      const lastPeriod = periods[periods.length - 1]
                      const previousPeriod = periods[periods.length - 2]
                      const lastProfit = summary.profitByPeriod[lastPeriod] || 0
                      const previousProfit = summary.profitByPeriod[previousPeriod] || 0

                      if (previousProfit === 0) return "text-gray-700"

                      const change = ((lastProfit - previousProfit) / Math.abs(previousProfit)) * 100
                      return change >= 0 ? "text-green-600" : "text-red-600"
                    })()}`}
                  >
                    {(() => {
                      const periods = Object.keys(summary.profitByPeriod).sort()
                      if (periods.length < 2) return "No hay datos suficientes"

                      const lastPeriod = periods[periods.length - 1]
                      const previousPeriod = periods[periods.length - 2]
                      const lastProfit = summary.profitByPeriod[lastPeriod] || 0
                      const previousProfit = summary.profitByPeriod[previousPeriod] || 0

                      if (previousProfit === 0) return "N/A"

                      const change = ((lastProfit - previousProfit) / Math.abs(previousProfit)) * 100
                      return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
