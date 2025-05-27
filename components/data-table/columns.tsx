"use client"

import type React from "react"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Función para crear columnas con selección
export function createSelectColumn<T>(): ColumnDef<T, any> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

// Función para crear columnas con acciones
export function createActionsColumn<T>(actions: { label: string; onClick: (data: T) => void }[]): ColumnDef<T, any> {
  return {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={() => action.onClick(data)}>
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}

// Función para crear columnas con ordenamiento
export function createSortableColumn<T>(
  id: string,
  header: string,
  accessorFn: (row: T) => any,
  cellRenderer?: (value: any) => React.ReactNode,
): ColumnDef<T, any> {
  return {
    accessorFn,
    id,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 p-0 font-medium"
        >
          {header}
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()
      return cellRenderer ? cellRenderer(value) : value
    },
  }
}

// Función para crear columnas con estado
export function createStatusColumn<T>(
  id: string,
  header: string,
  accessorFn: (row: T) => string,
  statusMap: Record<
    string,
    { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" | "warning" }
  >,
): ColumnDef<T, any> {
  return {
    accessorFn,
    id,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 p-0 font-medium"
        >
          {header}
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue() as string
      const status = statusMap[value] || { label: value, variant: "default" }

      return <Badge variant={status.variant}>{status.label}</Badge>
    },
  }
}

// Función para crear columnas con vista
export function createViewColumn<T>(onClick: (data: T) => void): ColumnDef<T, any> {
  return {
    id: "view",
    cell: ({ row }) => {
      const data = row.original
      return (
        <Button variant="ghost" size="icon" onClick={() => onClick(data)}>
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver detalles</span>
        </Button>
      )
    },
    enableSorting: false,
    enableHiding: false,
  }
}
