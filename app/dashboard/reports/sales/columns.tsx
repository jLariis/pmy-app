"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export type SalesReport = {
  id: string
  date: string
  totalSales: number
  numberOfOrders: number
  averageOrderValue: number
}

export const columns: ColumnDef<SalesReport>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "totalSales",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ventas Totales" />,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("totalSales"))
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
    },
  },
  {
    accessorKey: "numberOfOrders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Número de Órdenes" />,
  },
  {
    accessorKey: "averageOrderValue",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Valor Promedio de Orden" />,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("averageOrderValue"))
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
    },
  },
]

