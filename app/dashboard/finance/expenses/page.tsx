"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { ExpensesTable } from "@/components/expenses/expenses-table"
import { ExpensesSummary } from "@/components/expenses/expenses-summary"
import { sampleExpenses, generateExpenseSummary } from "@/data/expenses-data"
import type { Expense } from "@/types/expenses"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses)
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const expenseSummary = generateExpenseSummary(expenses)

  const handleAddExpense = (expenseData: Omit<Expense, "id" | "createdAt" | "updatedAt">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setExpenses([newExpense, ...expenses])
    setShowForm(false)
    setSuccessMessage("Gasto registrado correctamente")
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleEditExpense = (expenseData: Omit<Expense, "id" | "createdAt" | "updatedAt">) => {
    if (!editingExpense) return

    const updatedExpense: Expense = {
      ...expenseData,
      id: editingExpense.id,
      createdAt: editingExpense.createdAt,
      updatedAt: new Date().toISOString(),
    }

    setExpenses(expenses.map((exp) => (exp.id === editingExpense.id ? updatedExpense : exp)))
    setEditingExpense(null)
    setSuccessMessage("Gasto actualizado correctamente")
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleDeleteExpense = () => {
    if (!expenseToDelete) return

    setExpenses(expenses.filter((exp) => exp.id !== expenseToDelete.id))
    setExpenseToDelete(null)
    setShowDeleteDialog(false)
    setSuccessMessage("Gasto eliminado correctamente")
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleExportExcel = () => {
    console.log("Exportando a Excel...")
    // Aquí iría la lógica real de exportación
  }

  const handleExportPdf = () => {
    console.log("Exportando a PDF...")
    // Aquí iría la lógica real de exportación
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Gastos</h2>
          <p className="text-muted-foreground">Registro y análisis de gastos operativos</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Gasto
        </Button>
      </div>

      {showSuccessAlert && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Éxito</AlertTitle>
          <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Gastos</TabsTrigger>
          <TabsTrigger value="summary">Resumen y Análisis</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <ExpensesTable
            data={expenses}
            onEdit={(expense) => setEditingExpense(expense)}
            onDelete={(expense) => {
              setExpenseToDelete(expense)
              setShowDeleteDialog(true)
            }}
            onExportExcel={handleExportExcel}
            onExportPdf={handleExportPdf}
          />
        </TabsContent>
        <TabsContent value="summary">
          <ExpensesSummary data={expenseSummary} />
        </TabsContent>
      </Tabs>

      {/* Modal para agregar/editar gasto */}
      {(showForm || editingExpense) && (
        <Dialog
          open={showForm || !!editingExpense}
          onOpenChange={(open) => {
            if (!open) {
              setShowForm(false)
              setEditingExpense(null)
            }
          }}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingExpense ? "Editar Gasto" : "Registrar Nuevo Gasto"}</DialogTitle>
              <DialogDescription>
                {editingExpense
                  ? "Actualice la información del gasto seleccionado"
                  : "Complete el formulario para registrar un nuevo gasto operativo"}
              </DialogDescription>
            </DialogHeader>
            <ExpenseForm
              onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
              onCancel={() => {
                setShowForm(false)
                setEditingExpense(null)
              }}
              initialData={editingExpense || undefined}
              isEditing={!!editingExpense}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de confirmación para eliminar */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar este gasto? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteExpense}>
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
