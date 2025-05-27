"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SucursalSelector } from "@/components/sucursal-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileSpreadsheet, FileUp, Plus, Upload } from "lucide-react"
import { getGastosBySucursal, addGasto, updateGasto, getCategorias } from "@/lib/data"
import type { Gasto, CategoriaGasto } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { AppLayout } from "@/components/app-layout"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import * as XLSX from "xlsx"
import { DataTable } from "@/components/data-table/data-table"
import {
  createSelectColumn,
  createSortableColumn,
  createActionsColumn,
  createViewColumn,
} from "@/components/data-table/columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Métodos de pago disponibles
const metodosPago = ["Efectivo", "Tarjeta de Crédito", "Tarjeta de Débito", "Transferencia", "Cheque", "Otro"]

// Función para obtener el color de la categoría
const getCategoryColor = (categoryName: string): string => {
  const colorMap: Record<string, string> = {
    Nómina: "bg-green-500",
    Renta: "bg-blue-500",
    Recarga: "bg-purple-500",
    Peajes: "bg-orange-500",
    Servicios: "bg-cyan-500",
    Combustible: "bg-red-500",
    "Otros gastos": "bg-gray-500",
    Mantenimiento: "bg-yellow-500",
    Impuestos: "bg-amber-500",
    Seguros: "bg-violet-500",
  }

  return colorMap[categoryName] || "bg-gray-500"
}

export default function GastosPage() {
  const [selectedSucursalId, setSelectedSucursalId] = useState("")
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [categorias, setCategorias] = useState<CategoriaGasto[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGasto, setEditingGasto] = useState<Gasto | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Formulario
  const [fecha, setFecha] = useState<Date | undefined>(new Date())
  const [categoriaId, setCategoriaId] = useState("")
  const [monto, setMonto] = useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [metodoPago, setMetodoPago] = useState("Efectivo")
  const [responsable, setResponsable] = useState("")
  const [notas, setNotas] = useState("")
  const [comprobante, setComprobante] = useState<File | null>(null)

  useEffect(() => {
    // Cargar categorías
    const categoriasData = getCategorias()
    setCategorias(categoriasData)

    if (selectedSucursalId) {
      loadGastos()
    }
  }, [selectedSucursalId])

  const loadGastos = () => {
    const gastosData = getGastosBySucursal(selectedSucursalId)
    // Ordenar por fecha descendente
    gastosData.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    setGastos(gastosData)
  }

  const resetForm = () => {
    setEditingGasto(null)
    setFecha(new Date())
    setCategoriaId("")
    setMonto(0)
    setDescripcion("")
    setMetodoPago("Efectivo")
    setResponsable("")
    setNotas("")
    setComprobante(null)
  }

  const openNewGastoDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditGastoDialog = (gasto: Gasto) => {
    setEditingGasto(gasto)
    setFecha(new Date(gasto.fecha))
    setCategoriaId(gasto.categoriaId)
    setMonto(gasto.monto)
    setDescripcion(gasto.descripcion || "")
    setMetodoPago(gasto.metodoPago || "Efectivo")
    setResponsable(gasto.responsable || "")
    setNotas(gasto.notas || "")
    setComprobante(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fecha) {
      alert("Por favor selecciona una fecha válida")
      return
    }

    const selectedCategoria = categorias.find((c) => c.id === categoriaId)

    if (!selectedCategoria) {
      alert("Por favor selecciona una categoría válida")
      return
    }

    if (editingGasto) {
      // Actualizar gasto existente
      updateGasto(editingGasto.id, {
        fecha,
        categoriaId,
        categoriaNombre: selectedCategoria.nombre,
        monto,
        descripcion,
        metodoPago,
        responsable,
        notas,
        // En una aplicación real, aquí se manejaría la subida del comprobante
      })
    } else {
      // Crear nuevo gasto
      addGasto({
        sucursalId: selectedSucursalId,
        fecha,
        categoriaId,
        categoriaNombre: selectedCategoria.nombre,
        monto,
        descripcion,
        metodoPago,
        responsable,
        notas,
        // En una aplicación real, aquí se manejaría la subida del comprobante
      })
    }

    setIsDialogOpen(false)
    loadGastos()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprobante(e.target.files[0])
    }
  }

  const handleExportExcel = () => {
    const dataToExport = gastos.map((gasto) => ({
      Fecha: format(new Date(gasto.fecha), "dd/MM/yyyy"),
      Categoría: gasto.categoriaNombre,
      Descripción: gasto.descripcion,
      Monto: gasto.monto,
      "Método de Pago": gasto.metodoPago || "No especificado",
      Responsable: gasto.responsable || "No especificado",
      Notas: gasto.notas || "",
    }))

    const ws = XLSX.utils.json_to_sheet(dataToExport)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Gastos")
    XLSX.writeFile(wb, "Gastos.xlsx")
  }

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = e.target?.result
      if (!data) return

      try {
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Procesar los datos importados
        jsonData.forEach((row: any) => {
          // Buscar la categoría por nombre
          const categoria = categorias.find((c) => c.nombre.toLowerCase() === (row["Categoría"] || "").toLowerCase())

          if (!categoria) {
            console.error(`Categoría no encontrada: ${row["Categoría"]}`)
            return
          }

          // Convertir fecha de formato DD/MM/YYYY a objeto Date
          let fecha: Date
          try {
            const parts = row["Fecha"].split("/")
            fecha = new Date(Number.parseInt(parts[2]), Number.parseInt(parts[1]) - 1, Number.parseInt(parts[0]))
          } catch (error) {
            fecha = new Date()
          }

          // Añadir el gasto
          addGasto({
            sucursalId: selectedSucursalId,
            fecha,
            categoriaId: categoria.id,
            categoriaNombre: categoria.nombre,
            monto: Number.parseFloat(row["Monto"]) || 0,
            descripcion: row["Descripción"] || "",
            metodoPago: row["Método de Pago"] || "Efectivo",
            responsable: row["Responsable"] || "",
            notas: row["Notas"] || "",
          })
        })

        // Recargar los gastos
        loadGastos()

        // Limpiar el input de archivo
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } catch (error) {
        console.error("Error al procesar el archivo Excel:", error)
        alert("Error al procesar el archivo Excel. Asegúrate de que el formato sea correcto.")
      }
    }

    reader.readAsBinaryString(file)
  }

  const columns = [
    createSelectColumn<Gasto>(),
    createSortableColumn<Gasto>(
      "fecha",
      "Fecha",
      (row) => row.fecha,
      (value) => format(new Date(value), "dd/MM/yyyy", { locale: es }),
    ),
    createSortableColumn<Gasto>(
      "categoria",
      "Categoría",
      (row) => row.categoriaNombre,
      (value) => (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getCategoryColor(value)}`}></div>
          <span>{value}</span>
        </div>
      ),
    ),
    createSortableColumn<Gasto>("descripcion", "Descripción", (row) => row.descripcion || "-"),
    createSortableColumn<Gasto>(
      "monto",
      "Monto",
      (row) => row.monto,
      (value) => <span className="font-medium">{formatCurrency(value)}</span>,
    ),
    createSortableColumn<Gasto>("metodoPago", "Método de Pago", (row) => row.metodoPago || "No especificado"),
    createSortableColumn<Gasto>("responsable", "Responsable", (row) => row.responsable || "No especificado"),
    createActionsColumn<Gasto>([
      {
        label: "Editar",
        onClick: (data) => openEditGastoDialog(data),
      },
      {
        label: "Eliminar",
        onClick: (data) => console.log("Eliminar", data),
      },
    ]),
    createViewColumn<Gasto>((data) => console.log("Ver detalles", data)),
  ]

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Gestión de Gastos</h2>
            <p className="text-muted-foreground">Administra los gastos diarios por sucursal</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[250px]">
              <SucursalSelector value={selectedSucursalId} onValueChange={setSelectedSucursalId} />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Gastos</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                disabled={!selectedSucursalId || gastos.length === 0}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Exportar Excel
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImportExcel}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!selectedSucursalId}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Importar Excel
                </Button>
              </div>
              <Button size="sm" onClick={openNewGastoDialog} disabled={!selectedSucursalId}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Gasto
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedSucursalId ? (
              <DataTable columns={columns} data={gastos} filterPlaceholder="Filtrar gastos..." />
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-muted-foreground">Selecciona una sucursal para ver los gastos</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingGasto ? "Editar Gasto" : "Registrar Nuevo Gasto"}</DialogTitle>
            <DialogDescription>Complete el formulario para registrar un nuevo gasto operativo</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="categoria" className="font-medium">
                  Categoría <span className="text-destructive">*</span>
                </Label>
                <Select value={categoriaId} onValueChange={setCategoriaId} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getCategoryColor(categoria.nombre)}`}></div>
                          <span>{categoria.nombre}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha" className="font-medium">
                  Fecha <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !fecha && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fecha ? format(fecha, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={fecha} onSelect={setFecha} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion" className="font-medium">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Input
                id="descripcion"
                placeholder="Descripción del gasto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monto" className="font-medium">
                  Monto (MXN) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="monto"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metodoPago" className="font-medium">
                  Método de Pago <span className="text-destructive">*</span>
                </Label>
                <Select value={metodoPago} onValueChange={setMetodoPago} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {metodosPago.map((metodo) => (
                      <SelectItem key={metodo} value={metodo}>
                        {metodo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsable" className="font-medium">
                Responsable
              </Label>
              <Input
                id="responsable"
                placeholder="Nombre del responsable (opcional)"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comprobante" className="font-medium">
                Comprobante (opcional)
              </Label>
              <div className="flex items-center gap-2">
                <Input id="comprobante" type="file" className="hidden" onChange={handleFileChange} />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("comprobante")?.click()}
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  {comprobante ? comprobante.name : "Elegir archivo"}
                </Button>
                {comprobante && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => setComprobante(null)}>
                    <span className="sr-only">Eliminar</span>×
                  </Button>
                )}
              </div>
              {!comprobante && <p className="text-sm text-muted-foreground">No se ha seleccionado ningún archivo</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas" className="font-medium">
                Notas adicionales
              </Label>
              <Textarea
                id="notas"
                placeholder="Información adicional sobre el gasto (opcional)"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!selectedSucursalId}>
                {editingGasto ? "Actualizar Gasto" : "Registrar Gasto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
