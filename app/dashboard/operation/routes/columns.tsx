"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash } from "lucide-react"

export type Route = {
  id: string
  name: string
  zipCodes: string
  driver: string
  status: "active" | "inactive"
  areas: string
  shipments: number
}

export const columns = (
  onView: (route: Route) => void,
  onEdit: (route: Route) => void,
  onDelete: (route: Route) => void,
): ColumnDef<Route>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre de la Ruta" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "areas",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Áreas" />,
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("areas")}</div>,
  },
  {
    accessorKey: "zipCodes",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Códigos Postales" />,
    cell: ({ row }) => <div className="max-w-[150px] truncate">{row.getValue("zipCodes")}</div>,
  },
  {
    accessorKey: "driver",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Repartidor Asignado" />,
  },
  {
    accessorKey: "shipments",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Envíos" />,
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("shipments")}</Badge>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "success" : "destructive"}>
          {status === "active" ? "Activa" : "Inactiva"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const route = row.original

      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(route)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(route)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(route)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
