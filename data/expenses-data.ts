import type { Expense, ExpenseCategory, ExpenseSummary, FinancialSummary } from "@/types/expenses"
import { format, subDays } from "date-fns"

// Categorías predefinidas
export const defaultExpenseCategories: ExpenseCategory[] = [
  {
    id: "cat-1",
    name: "Combustible",
    description: "Gastos relacionados con combustible para vehículos",
    color: "#FF5733",
    isDefault: true,
  },
  {
    id: "cat-2",
    name: "Mantenimiento",
    description: "Mantenimiento de vehículos y equipos",
    color: "#33A8FF",
    isDefault: true,
  },
  {
    id: "cat-3",
    name: "Nómina",
    description: "Pagos de salarios y bonificaciones",
    color: "#33FF57",
    isDefault: true,
  },
  {
    id: "cat-4",
    name: "Servicios",
    description: "Pagos de servicios como luz, agua, internet, etc.",
    color: "#F033FF",
    isDefault: true,
  },
  {
    id: "cat-5",
    name: "Impuestos",
    description: "Pagos de impuestos y contribuciones",
    color: "#FFD700",
    isDefault: true,
  },
  {
    id: "cat-6",
    name: "Seguros",
    description: "Pagos de seguros de vehículos y otros",
    color: "#8A2BE2",
    isDefault: true,
  },
  {
    id: "cat-7",
    name: "Otros",
    description: "Otros gastos no categorizados",
    color: "#A9A9A9",
    isDefault: true,
  },
]

// Generar datos de ejemplo para gastos
const today = new Date()
const generateRandomExpenses = (count: number): Expense[] => {
  const expenses: Expense[] = []

  for (let i = 0; i < count; i++) {
    const categoryIndex = Math.floor(Math.random() * defaultExpenseCategories.length)
    const date = format(subDays(today, Math.floor(Math.random() * 30)), "yyyy-MM-dd")
    const amount = (Math.floor(Math.random() * 10000) / 100) * (Math.random() * 10 + 1)

    const paymentMethods = ["Efectivo", "Tarjeta de Crédito", "Tarjeta de Débito", "Transferencia", "Cheque"]
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)] as any

    expenses.push({
      id: `exp-${i + 1}`,
      categoryId: defaultExpenseCategories[categoryIndex].id,
      description: `Gasto en ${defaultExpenseCategories[categoryIndex].name.toLowerCase()}`,
      amount,
      date,
      paymentMethod,
      responsible: Math.random() > 0.5 ? "Juan Pérez" : "María López",
      createdAt: date,
      updatedAt: date,
    })
  }

  return expenses
}

export const sampleExpenses = generateRandomExpenses(50)

// Generar resumen de gastos
export const generateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Agrupar por categoría
  const byCategory = defaultExpenseCategories
    .map((category) => {
      const categoryExpenses = expenses.filter((expense) => expense.categoryId === category.id)
      const amount = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
      return {
        categoryId: category.id,
        categoryName: category.name,
        amount,
        percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
        color: category.color,
      }
    })
    .filter((cat) => cat.amount > 0)

  // Agrupar por método de pago
  const paymentMethods = ["Efectivo", "Tarjeta de Crédito", "Tarjeta de Débito", "Transferencia", "Cheque", "Otro"]
  const byPaymentMethod = paymentMethods
    .map((method) => {
      const methodExpenses = expenses.filter((expense) => expense.paymentMethod === method)
      const amount = methodExpenses.reduce((sum, expense) => sum + expense.amount, 0)
      return {
        method: method as any,
        amount,
        percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
      }
    })
    .filter((method) => method.amount > 0)

  // Agrupar por fecha
  const dateMap = new Map<string, number>()
  expenses.forEach((expense) => {
    const date = expense.date
    const currentAmount = dateMap.get(date) || 0
    dateMap.set(date, currentAmount + expense.amount)
  })

  const byDate = Array.from(dateMap.entries())
    .map(([date, amount]) => ({
      date,
      amount,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return {
    totalAmount,
    byCategory,
    byPaymentMethod,
    byDate,
  }
}

// Generar datos financieros de ejemplo
export const generateFinancialSummary = (): FinancialSummary => {
  const expenseSummary = generateExpenseSummary(sampleExpenses)
  const totalExpenses = expenseSummary.totalAmount

  // Generar ingresos de ejemplo (un poco más altos que los gastos para tener ganancias)
  const totalIncome = totalExpenses * (1 + Math.random() * 0.5) // 0-50% más que los gastos
  const netProfit = totalIncome - totalExpenses
  const profitMargin = (netProfit / totalIncome) * 100

  // Generar datos por fecha
  const dateRange = 30 // 30 días
  const incomeByDate = []
  const expensesByDate = []
  const profitByDate = []

  for (let i = 0; i < dateRange; i++) {
    const date = format(subDays(today, dateRange - i - 1), "yyyy-MM-dd")
    const dailyExpense = expenseSummary.byDate.find((d) => d.date === date)?.amount || 0

    // Generar ingreso diario (con variación)
    const dailyIncome = dailyExpense * (1 + Math.random() * 0.7) // 0-70% más que los gastos diarios
    const dailyProfit = dailyIncome - dailyExpense

    incomeByDate.push({ date, amount: dailyIncome })
    expensesByDate.push({ date, amount: dailyExpense })
    profitByDate.push({ date, amount: dailyProfit })
  }

  // Comparación con período anterior
  const previousPeriodFactor = 0.85 + Math.random() * 0.3 // Factor entre 0.85 y 1.15

  return {
    totalIncome,
    totalExpenses,
    netProfit,
    profitMargin,
    incomeByDate,
    expensesByDate,
    profitByDate,
    expensesByCategory: expenseSummary.byCategory,
    compareToPreviousPeriod: {
      income: {
        amount: totalIncome * previousPeriodFactor,
        percentage: (totalIncome / (totalIncome * previousPeriodFactor) - 1) * 100,
      },
      expenses: {
        amount: totalExpenses * previousPeriodFactor,
        percentage: (totalExpenses / (totalExpenses * previousPeriodFactor) - 1) * 100,
      },
      profit: {
        amount: netProfit * previousPeriodFactor,
        percentage: (netProfit / (netProfit * previousPeriodFactor) - 1) * 100,
      },
    },
  }
}

export const sampleFinancialSummary = generateFinancialSummary()
