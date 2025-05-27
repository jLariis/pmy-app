"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Plus } from "lucide-react"
import { getIngresosBySucursal, addIngreso, updateIngreso } from "@/lib/data"
import type { IngresoRuta } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { AppLayout } from "@/components/app-layout"
import { DataTable } from "@/components/data-table/data-table"
import {
  createSelectColumn,
  createSortableColumn,
  createActionsColumn,
  createViewColumn,
} from "@/components/data-table/columns"
import { Card, CardContent } from "@/components/ui/card"

export default function IngresosPage() {
  const [selectedSucursalId, setSelectedSucursalId] = useState("")
  const [ingresos, setIngresos] = useState<IngresoRuta[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIngreso, setEditingIngreso] = useState<IngresoRuta | null>(null)

  // Formulario
  const [fecha, setFecha] = useState("")
  const [ok, setOk] = useState(0)
  const [ba, setBa] = useState(0)
  const [recolecciones, setRecolecciones] = useState(0)

  useEffect(() => {
    if (selectedSucursalId) {
      loadIngresos()
    }
  }, [selectedSucursalId])

  const loadIngresos = () => {
    const ingresosData = getIngresosBySucursal(selectedSucursalId)
    // Ordenar por fecha descendente
    ingresosData.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    setIngresos(ingresosData)
  }

  const resetForm = () => {
    setEditingIngreso(null)
    setFecha(new Date().toISOString().split("T")[0])
    setOk(0)
    setBa(0)
    setRecolecciones(0)
  }

  const openNewIngresoDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditIngresoDialog = (ingreso: IngresoRuta) => {
    setEditingIngreso(ingreso)
    setFecha(new Date(ingreso.fecha).toISOString().split("T")[0])
    setOk(ingreso.ok)
    setBa(ingreso.ba)
    setRecolecciones(ingreso.recolecciones)
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const total = ok + ba + recolecciones
    // Calcular el total de ingresos (asumiendo $45 por cada OK y $0 por BA)
    const totalIngresos = ok * 45

    if (editingIngreso) {
      // Actualizar ingreso existente
      updateIngreso(editingIngreso.id, {
        fecha: new Date(fecha),
        ok,
        ba,
        recolecciones,
        total,
        totalIngresos,
      })
    } else {
      // Crear nuevo ingreso
      addIngreso({
        sucursalId: selectedSucursalId,
        fecha: new Date(fecha),
        ok,
        ba,
        recolecciones,
        total,
        totalIngresos,
      })
    }

    setIsDialogOpen(false)
    loadIngresos()
  }

  const columns = [
    createSelectColumn<IngresoRuta>(),
    createSortableColumn<IngresoRuta>(
      "fecha",
      "Fecha",
      (row) => row.fecha,
      (value) => new Date(value).toLocaleDateString("es-MX"),
    ),
    createSortableColumn<IngresoRuta>("ok", "OK", (row) => row.ok),
    createSortableColumn<IngresoRuta>("ba", "BA", (row) => row.ba),
    createSortableColumn<IngresoRuta>("recolecciones", "Recolecciones", (row) => row.recolecciones),
    createSortableColumn<IngresoRuta>("total", "Total", (row) => row.total),
    createSortableColumn<IngresoRuta>(
      "totalIngresos",
      "Total Ingresos",
      (row) => row.totalIngresos,
      (value) => <span className="font-medium">{formatCurrency(value)}</span>,
    ),
    createActionsColumn<IngresoRuta>([
      {
        label: "Editar",
        onClick: (data) => openEditIngresoDialog(data),
      },
      {
        label: "Eliminar",
        onClick: (data) => console.log("Eliminar", data),
      },
    ]),
    createViewColumn<IngresoRuta>((data) => console.log("Ver detalles", data)),
  ]

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gestión de Ingresos</h2>
            <p className="text-muted-foreground">Administra los ingresos diarios por sucursal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[250px]">
              <SucursalSelector value={selectedSucursalId} onValueChange={setSelectedSucursalId} />
            </div>
            <Button onClick={openNewIngresoDialog} disabled={!selectedSucursalId}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Ingreso
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {selectedSucursalId ? (
              <DataTable columns={columns} data={ingresos} filterPlaceholder="Filtrar ingresos..." />
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-muted-foreground">Selecciona una sucursal para ver los ingresos</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIngreso ? "Editar Ingreso" : "Nuevo Ingreso"}</DialogTitle>
            <DialogDescription>Ingresa los datos del registro de ingresos</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ok">OK</Label>
                  <Input
                    id="ok"
                    type="number"
                    min="0"
                    value={ok}
                    onChange={(e) => setOk(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ba">BA</Label>
                  <Input
                    id="ba"
                    type="number"
                    min="0"
                    value={ba}
                    onChange={(e) => setBa(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recolecciones">Recolecciones</Label>
                  <Input
                    id="recolecciones"
                    type="number"
                    min="0"
                    value={recolecciones}
                    onChange={(e) => setRecolecciones(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Total</Label>
                <div className="rounded-md border border-input bg-muted px-3 py-2">{ok + ba + recolecciones}</div>
              </div>
              <div className="grid gap-2">
                <Label>Total Ingresos</Label>
                <div className="rounded-md border border-input bg-muted px-3 py-2">{formatCurrency(ok * 45)}</div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingIngreso ? "Actualizar" : "Guardar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
