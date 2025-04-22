export type PaymentMethod =
  | "Efectivo"
  | "Tarjeta de Crédito"
  | "Tarjeta de Débito"
  | "Transferencia"
  | "Cheque"
  | "Otro"

export type ExpenseCategory = {
  id: string
  name: string
  description?: string
  color: string
  isDefault?: boolean
}

export type Expense = {
  id: string
  categoryId: string
  description: string
  amount: number
  date: string
  paymentMethod: PaymentMethod
  responsible?: string
  attachmentUrl?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type ExpenseSummary = {
  totalAmount: number
  byCategory: {
    categoryId: string
    categoryName: string
    amount: number
    percentage: number
    color: string
  }[]
  byPaymentMethod: {
    method: PaymentMethod
    amount: number
    percentage: number
  }[]
  byDate: {
    date: string
    amount: number
  }[]
}

export type FinancialSummary = {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  incomeByDate: {
    date: string
    amount: number
  }[]
  expensesByDate: {
    date: string
    amount: number
  }[]
  profitByDate: {
    date: string
    amount: number
  }[]
  expensesByCategory: {
    categoryId: string
    categoryName: string
    amount: number
    percentage: number
    color: string
  }[]
  compareToPreviousPeriod: {
    income: {
      amount: number
      percentage: number
    }
    expenses: {
      amount: number
      percentage: number
    }
    profit: {
      amount: number
      percentage: number
    }
  }
}
