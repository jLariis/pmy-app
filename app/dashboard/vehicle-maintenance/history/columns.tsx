"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type MaintenanceHistory = {
  id: string
  vehicle: string
  licensePlate: string
  maintenanceType: string
  completionDate: string
  cost: number
  technician: string
}

export const columns: ColumnDef<MaintenanceHistory>[] = [
  {
    accessorKey: "vehicle",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehículo" />,
  },
  {
    accessorKey: "licensePlate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Placa" />,
  },
  {
    accessorKey: "maintenanceType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de Mantenimiento" />,
  },
  {
    accessorKey: "completionDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Finalización" />,
    cell: ({ row }) => {
      const completionDate = new Date(row.getValue("completionDate"))
      return completionDate.toLocaleString()
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Costo" />,
    cell: ({ row }) => {
      const cost = Number.parseFloat(row.getValue("cost"))
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(cost)
      return formatted
    },
  },
  {
    accessorKey: "technician",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Técnico" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

