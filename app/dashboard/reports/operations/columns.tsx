"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export type OperationsReport = {
  id: string
  date: string
  totalShipments: number
  deliveredShipments: number
  pendingShipments: number
  failedShipments: number
  averageDeliveryTime: string
}

export const columns: ColumnDef<OperationsReport>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "totalShipments",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Envíos Totales" />,
  },
  {
    accessorKey: "deliveredShipments",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Entregados" />,
  },
  {
    accessorKey: "pendingShipments",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pendientes" />,
  },
  {
    accessorKey: "failedShipments",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fallidos" />,
  },
  {
    accessorKey: "averageDeliveryTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tiempo Promedio" />,
  },
]
