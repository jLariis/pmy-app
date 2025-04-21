"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/data-table-row-actions"

export type Employee = {
  id: string
  name: string
  position: string
  department: string
  salary: number
  hireDate: string
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "position",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Puesto" />,
  },
  {
    accessorKey: "department",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Salario" />,
    cell: ({ row }) => {
      const salary = Number.parseFloat(row.getValue("salary"))
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(salary)
      return formatted
    },
  },
  {
    accessorKey: "hireDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Contratación" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("hireDate"))
      return date.toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
