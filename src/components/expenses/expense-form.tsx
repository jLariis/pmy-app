"use client"

import type React from "react"
import { useState } from "react"
import type { Expense, ExpenseCategory } from "../../types/expenses"

interface ExpenseFormProps {
  categories: ExpenseCategory[]
  onSubmit: (expense: Omit<Expense, "id">) => void
  initialData?: Expense
  onCancel?: () => void
}

export function ExpenseForm({ categories, onSubmit, initialData, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState<Omit<Expense, "id">>({
    category: initialData?.category || "",
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    date: initialData?.date || new Date().toISOString().split("T")[0],
    paymentMethod: initialData?.paymentMethod || "",
    responsible: initialData?.responsible || "",
    receipt: initialData?.receipt || "",
    notes: initialData?.notes || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Monto *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
              className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-brand-brown focus:border-brand-brown"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">MXN</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Fecha *
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Método de pago *
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
          >
            <option value="">Seleccionar método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta Corporativa">Tarjeta Corporativa</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
            <option value="Domiciliación">Domiciliación</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción *
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
        />
      </div>

      <div>
        <label htmlFor="responsible" className="block text-sm font-medium text-gray-700">
          Responsable
        </label>
        <input
          type="text"
          name="responsible"
          id="responsible"
          value={formData.responsible}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
        />
      </div>

      <div>
        <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
          Comprobante (Referencia)
        </label>
        <input
          type="text"
          name="receipt"
          id="receipt"
          value={formData.receipt}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
          placeholder="Número de factura o referencia"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notas adicionales
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-brown focus:ring-brand-brown"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-brown hover:bg-brand-brown/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown"
        >
          {initialData ? "Actualizar Gasto" : "Registrar Gasto"}
        </button>
      </div>
    </form>
  )
}
