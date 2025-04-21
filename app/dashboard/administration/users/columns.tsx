"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash } from 'lucide-react'

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  branch?: string
  lastLogin?: string
  avatar?: string
}

export const columns = (
  onView: (user: User) => void,
  onEdit: (user: User) => void,
  onDelete: (user: User) => void
): ColumnDef<User>[] => [
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
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rol" />,
  },
  {
    accessorKey: "branch",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sucursal" />,
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
      const user = row.original
      
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(user)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(user)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(user)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
