"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type Payment = {
  id: string
  employeeName: string
  paymentDate: string
  grossAmount: number
  deductions: number
  netAmount: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "employeeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Empleado" />,
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Pago" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("paymentDate"))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "grossAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Monto Bruto" />,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("grossAmount"))
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
    },
  },
  {
    accessorKey: "deductions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deducciones" />,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("deductions"))
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
    },
  },
  {
    accessorKey: "netAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Monto Neto" />,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("netAmount"))
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
