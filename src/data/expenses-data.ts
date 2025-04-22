import type { Expense, ExpenseCategory } from "../types/expenses"

export const expenseCategories: ExpenseCategory[] = [
  {
    id: "cat1",
    name: "Combustible",
    color: "#FF6B6B",
    description: "Gastos relacionados con combustible para vehículos",
  },
  { id: "cat2", name: "Mantenimiento", color: "#4ECDC4", description: "Mantenimiento de vehículos y equipos" },
  { id: "cat3", name: "Salarios", color: "#FFD166", description: "Pagos de nómina y bonificaciones" },
  { id: "cat4", name: "Servicios", color: "#6A0572", description: "Servicios básicos como luz, agua, internet, etc." },
  { id: "cat5", name: "Renta", color: "#F86624", description: "Renta de oficinas y almacenes" },
  { id: "cat6", name: "Seguros", color: "#1A535C", description: "Seguros de vehículos, inmuebles y personal" },
  { id: "cat7", name: "Impuestos", color: "#3D5A80", description: "Pagos de impuestos y contribuciones" },
  { id: "cat8", name: "Suministros", color: "#8338EC", description: "Material de oficina y suministros operativos" },
  { id: "cat9", name: "Marketing", color: "#06D6A0", description: "Publicidad y promoción" },
  { id: "cat10", name: "Otros", color: "#7F7F7F", description: "Gastos varios no categorizados" },
]

export const sampleExpenses: Expense[] = [
  {
    id: "exp1",
    category: "cat1",
    description: "Recarga de combustible - Unidad 101",
    amount: 1200.5,
    date: "2023-05-15",
    paymentMethod: "Tarjeta Corporativa",
    responsible: "Juan Pérez",
    notes: "Recarga completa para ruta Hermosillo-Guaymas",
  },
  {
    id: "exp2",
    category: "cat2",
    description: "Cambio de aceite - Unidad 103",
    amount: 850.0,
    date: "2023-05-16",
    paymentMethod: "Efectivo",
    responsible: "Carlos Rodríguez",
    receipt: "rec-001.pdf",
  },
  {
    id: "exp3",
    category: "cat3",
    description: "Pago de nómina - Primera quincena Mayo",
    amount: 45000.0,
    date: "2023-05-15",
    paymentMethod: "Transferencia Bancaria",
    responsible: "María González",
    notes: "Incluye bonos por desempeño",
  },
  {
    id: "exp4",
    category: "cat4",
    description: "Pago de servicio de internet",
    amount: 1299.0,
    date: "2023-05-10",
    paymentMethod: "Domiciliación",
    responsible: "Ana López",
  },
  {
    id: "exp5",
    category: "cat5",
    description: "Renta de oficina - Mayo",
    amount: 15000.0,
    date: "2023-05-05",
    paymentMethod: "Transferencia Bancaria",
    responsible: "María González",
  },
  {
    id: "exp6",
    category: "cat1",
    description: "Recarga de combustible - Unidad 105",
    amount: 1100.0,
    date: "2023-05-18",
    paymentMethod: "Tarjeta Corporativa",
    responsible: "Pedro Sánchez",
  },
  {
    id: "exp7",
    category: "cat6",
    description: "Pago de seguro de flota vehicular",
    amount: 28500.0,
    date: "2023-05-20",
    paymentMethod: "Transferencia Bancaria",
    responsible: "María González",
    receipt: "rec-002.pdf",
    notes: "Póliza anual con cobertura amplia",
  },
  {
    id: "exp8",
    category: "cat8",
    description: "Compra de material de oficina",
    amount: 2300.0,
    date: "2023-05-12",
    paymentMethod: "Tarjeta Corporativa",
    responsible: "Ana López",
  },
  {
    id: "exp9",
    category: "cat9",
    description: "Publicidad en redes sociales",
    amount: 5000.0,
    date: "2023-05-08",
    paymentMethod: "Tarjeta Corporativa",
    responsible: "Luis Ramírez",
    notes: "Campaña promocional de servicios express",
  },
  {
    id: "exp10",
    category: "cat2",
    description: "Reparación de frenos - Unidad 102",
    amount: 3200.0,
    date: "2023-05-19",
    paymentMethod: "Efectivo",
    responsible: "Carlos Rodríguez",
    receipt: "rec-003.pdf",
  },
  {
    id: "exp11",
    category: "cat7",
    description: "Pago de impuestos mensuales",
    amount: 18500.0,
    date: "2023-05-17",
    paymentMethod: "Transferencia Bancaria",
    responsible: "María González",
  },
  {
    id: "exp12",
    category: "cat10",
    description: "Gastos de representación",
    amount: 3500.0,
    date: "2023-05-22",
    paymentMethod: "Tarjeta Corporativa",
    responsible: "Roberto Torres",
    notes: "Reunión con clientes potenciales",
  },
  {
    id: "exp13",
    category: "cat1",
    description: "Recarga de combustible - Unidad 107",
    amount: 1350.0,
    date: "2023-05-23",
    paymentMethod: "Tarjeta Corporativa",
    responsible: "Juan Pérez",
  },
  {
    id: "exp14",
    category: "cat4",
    description: "Pago de electricidad",
    amount: 4200.0,
    date: "2023-05-15",
    paymentMethod: "Domiciliación",
    responsible: "Ana López",
  },
  {
    id: "exp15",
    category: "cat8",
    description: "Compra de uniformes para personal",
    amount: 8500.0,
    date: "2023-05-10",
    paymentMethod: "Transferencia Bancaria",
    responsible: "María González",
    receipt: "rec-004.pdf",
  },
]

// Datos de ingresos de ejemplo para el dashboard financiero
export const sampleIncome = [
  { date: "2023-05-01", amount: 25000 },
  { date: "2023-05-02", amount: 28000 },
  { date: "2023-05-03", amount: 22000 },
  { date: "2023-05-04", amount: 30000 },
  { date: "2023-05-05", amount: 27000 },
  { date: "2023-05-06", amount: 15000 },
  { date: "2023-05-07", amount: 12000 },
  { date: "2023-05-08", amount: 29000 },
  { date: "2023-05-09", amount: 31000 },
  { date: "2023-05-10", amount: 28000 },
  { date: "2023-05-11", amount: 25000 },
  { date: "2023-05-12", amount: 26000 },
  { date: "2023-05-13", amount: 20000 },
  { date: "2023-05-14", amount: 18000 },
  { date: "2023-05-15", amount: 32000 },
  { date: "2023-05-16", amount: 29000 },
  { date: "2023-05-17", amount: 27000 },
  { date: "2023-05-18", amount: 25000 },
  { date: "2023-05-19", amount: 24000 },
  { date: "2023-05-20", amount: 22000 },
  { date: "2023-05-21", amount: 18000 },
  { date: "2023-05-22", amount: 16000 },
  { date: "2023-05-23", amount: 28000 },
  { date: "2023-05-24", amount: 30000 },
  { date: "2023-05-25", amount: 29000 },
  { date: "2023-05-26", amount: 27000 },
  { date: "2023-05-27", amount: 25000 },
  { date: "2023-05-28", amount: 20000 },
  { date: "2023-05-29", amount: 22000 },
  { date: "2023-05-30", amount: 24000 },
  { date: "2023-05-31", amount: 26000 },
]

// Función para calcular el resumen de gastos
export function calculateExpenseSummary(expenses: Expense[]) {
  const summary = {
    totalExpenses: 0,
    byCategory: {} as Record<string, number>,
    byMonth: {} as Record<string, number>,
    byPaymentMethod: {} as Record<string, number>,
    averageExpense: 0,
    largestExpense: {
      amount: 0,
      description: "",
      date: "",
    },
  }

  expenses.forEach((expense) => {
    // Total expenses
    summary.totalExpenses += expense.amount

    // By category
    if (!summary.byCategory[expense.category]) {
      summary.byCategory[expense.category] = 0
    }
    summary.byCategory[expense.category] += expense.amount

    // By month
    const month = expense.date.substring(0, 7) // YYYY-MM
    if (!summary.byMonth[month]) {
      summary.byMonth[month] = 0
    }
    summary.byMonth[month] += expense.amount

    // By payment method
    if (!summary.byPaymentMethod[expense.paymentMethod]) {
      summary.byPaymentMethod[expense.paymentMethod] = 0
    }
    summary.byPaymentMethod[expense.paymentMethod] += expense.amount

    // Largest expense
    if (expense.amount > summary.largestExpense.amount) {
      summary.largestExpense = {
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      }
    }
  })

  // Average expense
  summary.averageExpense = summary.totalExpenses / expenses.length

  return summary
}

// Función para calcular el resumen financiero
export function calculateFinancialSummary(expenses: Expense[], income: { date: string; amount: number }[]) {
  const summary = {
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    profitMargin: 0,
    incomeByPeriod: {} as Record<string, number>,
    expensesByPeriod: {} as Record<string, number>,
    profitByPeriod: {} as Record<string, number>,
    topExpenseCategories: [] as { category: string; amount: number; percentage: number }[],
  }

  // Calculate total income
  income.forEach((item) => {
    summary.totalIncome += item.amount

    // By period (month)
    const month = item.date.substring(0, 7) // YYYY-MM
    if (!summary.incomeByPeriod[month]) {
      summary.incomeByPeriod[month] = 0
    }
    summary.incomeByPeriod[month] += item.amount
  })

  // Calculate total expenses and expenses by category
  const expensesByCategory: Record<string, number> = {}

  expenses.forEach((expense) => {
    summary.totalExpenses += expense.amount

    // By period (month)
    const month = expense.date.substring(0, 7) // YYYY-MM
    if (!summary.expensesByPeriod[month]) {
      summary.expensesByPeriod[month] = 0
    }
    summary.expensesByPeriod[month] += expense.amount

    // By category
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0
    }
    expensesByCategory[expense.category] += expense.amount
  })

  // Calculate net profit and profit margin
  summary.netProfit = summary.totalIncome - summary.totalExpenses
  summary.profitMargin = summary.totalIncome > 0 ? (summary.netProfit / summary.totalIncome) * 100 : 0

  // Calculate profit by period
  for (const month in summary.incomeByPeriod) {
    const monthlyIncome = summary.incomeByPeriod[month] || 0
    const monthlyExpenses = summary.expensesByPeriod[month] || 0
    summary.profitByPeriod[month] = monthlyIncome - monthlyExpenses
  }

  // Get top expense categories
  summary.topExpenseCategories = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / summary.totalExpenses) * 100,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  return summary
}
