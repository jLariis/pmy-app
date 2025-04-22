export interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
  paymentMethod: string
  responsible?: string
  receipt?: string
  notes?: string
}

export interface ExpenseCategory {
  id: string
  name: string
  color: string
  description?: string
}

export interface ExpenseSummary {
  totalExpenses: number
  byCategory: Record<string, number>
  byMonth: Record<string, number>
  byPaymentMethod: Record<string, number>
  averageExpense: number
  largestExpense: {
    amount: number
    description: string
    date: string
  }
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  incomeByPeriod: Record<string, number>
  expensesByPeriod: Record<string, number>
  profitByPeriod: Record<string, number>
  topExpenseCategories: {
    category: string
    amount: number
    percentage: number
  }[]
}
