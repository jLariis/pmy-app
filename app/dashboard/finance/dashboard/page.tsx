"use client"

import { FinancialDashboard } from "@/components/finance/financial-dashboard"
import { sampleFinancialSummary } from "@/data/expenses-data"

export default function FinancialDashboardPage() {
  return <FinancialDashboard data={sampleFinancialSummary} />
}
