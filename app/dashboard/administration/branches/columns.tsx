"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type Branch = {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  manager: string
}

export const columns: ColumnDef<Branch>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dirección" />,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ciudad" />,
  },
  {
    accessorKey: "state",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
  },
  {
    accessorKey: "zipCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CP" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Teléfono" />,
  },
  {
    accessorKey: "manager",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gerente" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
