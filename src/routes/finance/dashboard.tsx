"use client"

import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import type { Expense } from "../../types/expenses"
import { expenseCategories, sampleExpenses, sampleIncome, calculateFinancialSummary } from "../../data/expenses-data"
import { FinancialDashboard } from "../../components/finance/financial-dashboard"

export const Route = createFileRoute("/dashboard/finance/dashboard")({
  component: FinancialDashboardPage,
})

function FinancialDashboardPage() {
  const [expenses] = useState<Expense[]>(sampleExpenses)
  const [income] = useState(sampleIncome)
  const [summary, setSummary] = useState(calculateFinancialSummary(expenses, income))

  useEffect(() => {
    setSummary(calculateFinancialSummary(expenses, income))
  }, [expenses, income])

  return (
    <div className="container mx-auto py-6">
      <FinancialDashboard expenses={expenses} categories={expenseCategories} income={income} summary={summary} />
    </div>
  )
}
