"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Modificar la definición del tipo Shipment para eliminar weight, dimensions y service
export type Shipment = {
  trackingNumber: string
  recipientName: string
  recipientAddress: string
  recipientCity: string
  recipientZip: string
  commitDate: string
  commitTime: string
  recipientPhone: string
  status: "recoleccion" | "pendiente" | "en_ruta" | "entregado" | "no_entregado"
  payment: {
    amount: number
    status: "paid" | "pending" | "failed"
  } | null
  priority?: "alta" | "media" | "baja"
  statusHistory?: Array<{
    status: "recoleccion" | "pendiente" | "en_ruta" | "entregado" | "no_entregado"
    timestamp: string
    notes?: string
    location?: string
    updatedBy?: string
  }>
  instructions?: string
}

export const columns: ColumnDef<Shipment>[] = [
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
    accessorKey: "trackingNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No. Rastreo" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("trackingNumber")}</div>,
  },
  {
    accessorKey: "recipientName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Destinatario" />,
  },
  {
    accessorKey: "recipientAddress",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dirección" />,
  },
  {
    accessorKey: "recipientCity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ciudad" />,
  },
  {
    accessorKey: "recipientZip",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CP" />,
  },
  {
    accessorKey: "commitDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha" />,
  },
  {
    accessorKey: "commitTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hora" />,
  },
  {
    accessorKey: "recipientPhone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Teléfono" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as Shipment["status"]
      const statusMap = {
        recoleccion: { label: "Recolección", variant: "default" as const },
        pendiente: { label: "Pendiente", variant: "warning" as const },
        en_ruta: { label: "En Ruta", variant: "info" as const },
        entregado: { label: "Entregado", variant: "success" as const },
        no_entregado: { label: "No Entregado", variant: "destructive" as const },
      }
      const { label, variant } = statusMap[status] || { label: "Desconocido", variant: "default" as const }
      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: "payment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pago" />,
    cell: ({ row }) => {
      const payment = row.getValue("payment") as Shipment["payment"]
      if (!payment) return "N/A"
      const statusMap = {
        paid: { label: "Pagado", variant: "success" as const },
        pending: { label: "Pendiente", variant: "warning" as const },
        failed: { label: "Fallido", variant: "destructive" as const },
      }
      const { label, variant } = statusMap[payment.status] || { label: "Desconocido", variant: "default" as const }
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">${payment.amount.toFixed(2)}</span>
          <Badge variant={variant}>{label}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prioridad" />,
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Shipment["priority"]
      if (!priority) return "Normal"

      const priorityMap = {
        alta: { label: "Alta", variant: "destructive" as const },
        media: { label: "Media", variant: "warning" as const },
        baja: { label: "Baja", variant: "success" as const },
      }

      const { label, variant } = priorityMap[priority]
      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => console.log("View timeline", row.original)}>
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
]
