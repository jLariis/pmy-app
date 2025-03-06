"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type Role = {
  id: string
  name: string
  description: string
  usersCount: number
}

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descripción" />,
  },
  {
    accessorKey: "usersCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Usuarios" />,
    cell: ({ row }) => {
      const count = row.getValue("usersCount") as number
      return <div>{count} usuarios</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]