"use client"

import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import type { Expense, ExpenseCategory } from "../../types/expenses"
import { expenseCategories, sampleExpenses, calculateExpenseSummary } from "../../data/expenses-data"
import { ExpenseForm } from "../../components/expenses/expense-form"
import { ExpensesTable } from "../../components/expenses/expenses-table"
import { ExpensesSummary } from "../../components/expenses/expenses-summary"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Plus, FileSpreadsheet, BarChart } from "lucide-react"

export const Route = createFileRoute("/dashboard/finance/expenses")({
  component: ExpensesPage,
})

function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses)
  const [categories] = useState<ExpenseCategory[]>(expenseCategories)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [activeTab, setActiveTab] = useState("table")
  const [summary, setSummary] = useState(calculateExpenseSummary(expenses))

  useEffect(() => {
    setSummary(calculateExpenseSummary(expenses))
  }, [expenses])

  const handleAddExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    }
    setExpenses([...expenses, newExpense])
    setIsAddModalOpen(false)
  }

  const handleEditExpense = (expenseData: Omit<Expense, "id">) => {
    if (!selectedExpense) return

    const updatedExpenses = expenses.map((expense) =>
      expense.id === selectedExpense.id ? { ...expenseData, id: expense.id } : expense,
    )

    setExpenses(updatedExpenses)
    setIsEditModalOpen(false)
    setSelectedExpense(null)
  }

  const handleDeleteExpense = (expense: Expense) => {
    if (window.confirm(`¿Está seguro de eliminar el gasto "${expense.description}"?`)) {
      setExpenses(expenses.filter((e) => e.id !== expense.id))
    }
  }

  const handleViewExpense = (expense: Expense) => {
    setSelectedExpense(expense)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense)
    setIsEditModalOpen(true)
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Desconocida"
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Gastos</h1>
          <p className="text-gray-500">Administre y analice los gastos operativos de la empresa</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-brown/90 flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Gasto
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="table" className="flex items-center">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Tabla de Gastos
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Resumen y Análisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <ExpensesTable
            expenses={expenses}
            categories={categories}
            onEdit={handleEditClick}
            onDelete={handleDeleteExpense}
            onView={handleViewExpense}
          />
        </TabsContent>

        <TabsContent value="summary">
          <ExpensesSummary expenses={expenses} categories={categories} summary={summary} />
        </TabsContent>
      </Tabs>

      {/* Modal para agregar gasto */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
          </DialogHeader>
          <ExpenseForm categories={categories} onSubmit={handleAddExpense} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal para editar gasto */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Gasto</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <ExpenseForm
              categories={categories}
              initialData={selectedExpense}
              onSubmit={handleEditExpense}
              onCancel={() => setIsEditModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para ver detalles del gasto */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Gasto</DialogTitle>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
                  <p className="mt-1">{getCategoryName(selectedExpense.category)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Monto</h3>
                  <p className="mt-1 font-semibold">${selectedExpense.amount.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
                  <p className="mt-1">{new Date(selectedExpense.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Método de Pago</h3>
                  <p className="mt-1">{selectedExpense.paymentMethod}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                <p className="mt-1">{selectedExpense.description}</p>
              </div>

              {selectedExpense.responsible && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Responsable</h3>
                  <p className="mt-1">{selectedExpense.responsible}</p>
                </div>
              )}

              {selectedExpense.receipt && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Comprobante</h3>
                  <p className="mt-1">{selectedExpense.receipt}</p>
                </div>
              )}

              {selectedExpense.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notas Adicionales</h3>
                  <p className="mt-1">{selectedExpense.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false)
                    setSelectedExpense(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false)
                    handleEditClick(selectedExpense)
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-brown hover:bg-brand-brown/90"
                >
                  Editar
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
