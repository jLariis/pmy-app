"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type Route = {
  id: string
  name: string
  driver: string
  vehicle: string
  status: "En progreso" | "Completada" | "Pendiente" | "Cancelada"
  startTime: string
  estimatedArrival: string
}

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre de la Ruta" />,
  },
  {
    accessorKey: "driver",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Conductor" />,
  },
  {
    accessorKey: "vehicle",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehículo" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as Route["status"]
      return (
        <Badge
          variant={
            status === "En progreso"
              ? "default"
              : status === "Completada"
                ? "success"
                : status === "Pendiente"
                  ? "warning"
                  : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hora de Inicio" />,
    cell: ({ row }) => {
      const startTime = new Date(row.getValue("startTime"))
      return startTime.toLocaleString()
    },
  },
  {
    accessorKey: "estimatedArrival",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Llegada Estimada" />,
    cell: ({ row }) => {
      const estimatedArrival = new Date(row.getValue("estimatedArrival"))
      return estimatedArrival.toLocaleString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

