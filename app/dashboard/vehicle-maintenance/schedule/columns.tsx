"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type MaintenanceSchedule = {
  id: string
  vehicle: string
  licensePlate: string
  maintenanceType: string
  scheduledDate: string
  status: "Pendiente" | "En progreso" | "Completado" | "Cancelado"
}

export const columns: ColumnDef<MaintenanceSchedule>[] = [
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
    accessorKey: "scheduledDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha Programada" />,
    cell: ({ row }) => {
      const scheduledDate = new Date(row.getValue("scheduledDate"))
      return scheduledDate.toLocaleString()
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as MaintenanceSchedule["status"]
      return (
        <Badge
          variant={
            status === "Pendiente"
              ? "warning"
              : status === "En progreso"
                ? "default"
                : status === "Completado"
                  ? "success"
                  : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
