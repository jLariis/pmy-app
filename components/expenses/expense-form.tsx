"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { defaultExpenseCategories } from "@/data/expenses-data"
import type { Expense, PaymentMethod } from "@/types/expenses"

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
  initialData?: Partial<Expense>
  isEditing?: boolean
}

export function ExpenseForm({ onSubmit, onCancel, initialData, isEditing = false }: ExpenseFormProps) {
  const [date, setDate] = useState<Date | undefined>(initialData?.date ? new Date(initialData.date) : new Date())
  const [category, setCategory] = useState<string>(initialData?.categoryId || defaultExpenseCategories[0].id)
  const [description, setDescription] = useState<string>(initialData?.description || "")
  const [amount, setAmount] = useState<string>(initialData?.amount ? initialData.amount.toString() : "")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialData?.paymentMethod || "Efectivo")
  const [responsible, setResponsible] = useState<string>(initialData?.responsible || "")
  const [notes, setNotes] = useState<string>(initialData?.notes || "")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !category || !description || !amount || !paymentMethod) {
      alert("Por favor complete todos los campos requeridos")
      return
    }

    const expenseData = {
      categoryId: category,
      description,
      amount: Number.parseFloat(amount),
      date: format(date, "yyyy-MM-dd"),
      paymentMethod,
      responsible: responsible || undefined,
      notes: notes || undefined,
      attachmentUrl: initialData?.attachmentUrl,
    }

    onSubmit(expenseData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Gasto" : "Registrar Nuevo Gasto"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Actualice la información del gasto seleccionado"
            : "Complete el formulario para registrar un nuevo gasto operativo"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {defaultExpenseCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cat.color }}></div>
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del gasto"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto (MXN) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pago *</Label>
              <Select
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Efectivo">Efectivo</SelectItem>
                  <SelectItem value="Tarjeta de Crédito">Tarjeta de Crédito</SelectItem>
                  <SelectItem value="Tarjeta de Débito">Tarjeta de Débito</SelectItem>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible">Responsable</Label>
            <Input
              id="responsible"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Nombre del responsable (opcional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Comprobante (opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="attachment"
                type="file"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                className="flex-1"
              />
              {initialData?.attachmentUrl && (
                <Button type="button" variant="outline" size="sm" asChild>
                  <a href={initialData.attachmentUrl} target="_blank" rel="noopener noreferrer">
                    Ver
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Información adicional sobre el gasto (opcional)"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{isEditing ? "Actualizar" : "Registrar"} Gasto</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
