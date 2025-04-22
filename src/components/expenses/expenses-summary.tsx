import type { Expense, ExpenseCategory, ExpenseSummary } from "../../types/expenses"
import { Doughnut, Bar } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"

// Registrar los componentes necesarios para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

interface ExpensesSummaryProps {
  expenses: Expense[]
  categories: ExpenseCategory[]
  summary: ExpenseSummary
}

export function ExpensesSummary({ expenses, categories, summary }: ExpensesSummaryProps) {
  // Preparar datos para el gráfico de categorías
  const categoryData = {
    labels: Object.keys(summary.byCategory).map((catId) => {
      const category = categories.find((c) => c.id === catId)
      return category ? category.name : "Desconocida"
    }),
    datasets: [
      {
        data: Object.values(summary.byCategory),
        backgroundColor: Object.keys(summary.byCategory).map((catId) => {
          const category = categories.find((c) => c.id === catId)
          return category ? category.color : "#cccccc"
        }),
        borderWidth: 1,
      },
    ],
  }

  // Preparar datos para el gráfico de gastos por mes
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

  const monthlyData = {
    labels: Object.keys(summary.byMonth).map((month) => {
      const [year, monthNum] = month.split("-")
      return `${monthNames[Number.parseInt(monthNum) - 1]} ${year}`
    }),
    datasets: [
      {
        label: "Gastos por Mes",
        data: Object.values(summary.byMonth),
        backgroundColor: "rgba(153, 51, 51, 0.6)",
        borderColor: "rgba(153, 51, 51, 1)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total de Gastos</h3>
          <p className="text-3xl font-bold text-brand-brown">${summary.totalExpenses.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Promedio: ${summary.averageExpense.toFixed(2)} por gasto</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Mayor Gasto</h3>
          <p className="text-3xl font-bold text-brand-brown">${summary.largestExpense.amount.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1 truncate" title={summary.largestExpense.description}>
            {summary.largestExpense.description}
          </p>
          <p className="text-xs text-gray-400">{new Date(summary.largestExpense.date).toLocaleDateString()}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Métodos de Pago</h3>
          <div className="space-y-2 mt-2">
            {Object.entries(summary.byPaymentMethod).map(([method, amount]) => (
              <div key={method} className="flex justify-between">
                <span className="text-sm text-gray-600">{method}</span>
                <span className="text-sm font-medium">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución por Categoría</h3>
          <div className="h-64">
            <Doughnut
              data={categoryData}
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
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gastos por Mes</h3>
          <div className="h-64">
            <Bar
              data={monthlyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
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
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Análisis de Tendencias</h3>
        <div className="space-y-4">
          {/* Aquí podrían ir análisis más detallados o recomendaciones basadas en los datos */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Observación:</strong> La categoría con mayor gasto es{" "}
              <span className="font-medium">
                {(() => {
                  const topCategoryId = Object.entries(summary.byCategory).sort((a, b) => b[1] - a[1])[0]?.[0]
                  const topCategory = categories.find((c) => c.id === topCategoryId)
                  return topCategory ? topCategory.name : "Desconocida"
                })()}
              </span>{" "}
              representando el {(() => {
                const topCategoryAmount = Math.max(...Object.values(summary.byCategory))
                return ((topCategoryAmount / summary.totalExpenses) * 100).toFixed(1)
              })()}% del total.
            </p>
          </div>

          {Object.keys(summary.byMonth).length > 1 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Tendencia:</strong> {(() => {
                  const months = Object.keys(summary.byMonth).sort()
                  if (months.length < 2) return "No hay suficientes datos para analizar tendencias."

                  const lastMonth = months[months.length - 1]
                  const previousMonth = months[months.length - 2]
                  const lastMonthAmount = summary.byMonth[lastMonth]
                  const previousMonthAmount = summary.byMonth[previousMonth]

                  const percentChange = ((lastMonthAmount - previousMonthAmount) / previousMonthAmount) * 100

                  if (percentChange > 10) {
                    return `Los gastos aumentaron un ${percentChange.toFixed(1)}% respecto al mes anterior.`
                  } else if (percentChange < -10) {
                    return `Los gastos disminuyeron un ${Math.abs(percentChange).toFixed(1)}% respecto al mes anterior.`
                  } else {
                    return `Los gastos se mantuvieron estables respecto al mes anterior (${percentChange.toFixed(1)}%).`
                  }
                })()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
