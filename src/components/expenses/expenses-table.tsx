"use client"

import { useState } from "react"
import type { Expense, ExpenseCategory } from "../../types/expenses"
import { Edit, Trash, Eye, Download, Filter } from "lucide-react"

interface ExpensesTableProps {
  expenses: Expense[]
  categories: ExpenseCategory[]
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
  onView: (expense: Expense) => void
}

export function ExpensesTable({ expenses, categories, onEdit, onDelete, onView }: ExpensesTableProps) {
  const [sortField, setSortField] = useState<keyof Expense>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filterCategory, setFilterCategory] = useState<string>("")
  const [filterDateFrom, setFilterDateFrom] = useState<string>("")
  const [filterDateTo, setFilterDateTo] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSort = (field: keyof Expense) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Desconocida"
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "#cccccc"
  }

  const filteredExpenses = expenses.filter((expense) => {
    // Filter by category
    if (filterCategory && expense.category !== filterCategory) {
      return false
    }

    // Filter by date range
    if (filterDateFrom && expense.date < filterDateFrom) {
      return false
    }
    if (filterDateTo && expense.date > filterDateTo) {
      return false
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        expense.description.toLowerCase().includes(searchLower) ||
        expense.responsible?.toLowerCase().includes(searchLower) ||
        expense.notes?.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "date") {
      return sortDirection === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    } else {
      const aValue = a[sortField]?.toString() || ""
      const bValue = b[sortField]?.toString() || ""
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-2">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date-from" className="block text-sm font-medium text-gray-700">
              Desde
            </label>
            <input
              type="date"
              id="date-from"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
            />
          </div>
          <div>
            <label htmlFor="date-to" className="block text-sm font-medium text-gray-700">
              Hasta
            </label>
            <input
              type="date"
              id="date-to"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
            />
          </div>
        </div>
        <div className="flex-1 md:max-w-xs">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Buscar
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pr-10 border-gray-300 rounded-md focus:ring-brand-brown focus:border-brand-brown"
              placeholder="Buscar en descripción..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Fecha {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Categoría {sortField === "category" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Descripción {sortField === "description" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Monto {sortField === "amount" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("paymentMethod")}
              >
                Método de Pago {sortField === "paymentMethod" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("responsible")}
              >
                Responsable {sortField === "responsible" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: getCategoryColor(expense.category) }}
                    ></div>
                    <span className="text-sm text-gray-900">{getCategoryName(expense.category)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.responsible || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView(expense)}
                      className="text-brand-brown hover:text-brand-brown/80"
                      title="Ver detalles"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Editar"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(expense)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedExpenses.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-md">
          <p className="text-gray-500">No se encontraron gastos con los filtros seleccionados.</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Mostrando {sortedExpenses.length} de {expenses.length} gastos
        </p>
        <button
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-brown hover:bg-brand-brown/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown"
          onClick={() => {
            // Aquí iría la lógica para exportar a Excel
            alert("Exportar a Excel - Funcionalidad en desarrollo")
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </button>
      </div>
    </div>
  )
}
