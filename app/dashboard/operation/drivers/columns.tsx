"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash } from "lucide-react"

export type Driver = {
  id: string
  name: string
  licenseNumber: string
  phoneNumber: string
  status: "active" | "inactive"
  activeDeliveries: number
  completedToday: number
  route: string
  avatar?: string
  available?: boolean
}

export const columns = (
  onView: (driver: Driver) => void,
  onEdit: (driver: Driver) => void,
  onDelete: (driver: Driver) => void,
): ColumnDef<Driver>[] => [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "licenseNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Número de Licencia" />,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Teléfono" />,
  },
  {
    accessorKey: "route",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ruta Asignada" />,
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue("route") === "Sin asignar" ? (
          <span className="text-muted-foreground">Sin asignar</span>
        ) : (
          row.getValue("route")
        )}
      </div>
    ),
  },
  {
    accessorKey: "activeDeliveries",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Envíos Activos" />,
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("activeDeliveries")}</Badge>,
  },
  {
    accessorKey: "completedToday",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Completados Hoy" />,
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("completedToday")}</Badge>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "success" : "destructive"}>
          {status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original

      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(driver)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(driver)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(driver)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
