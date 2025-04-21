"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ProcessedData } from "@/types/ingresos"
import { Skeleton } from "@/components/ui/skeleton"

interface IngresosTableProps {
  data: ProcessedData
  loading: boolean
}

export function IngresosTable({ data, loading }: IngresosTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value)
  }

  if (loading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Concepto</TableHead>
            {data.dates.map((date) => (
              <TableHead key={date}>
                {new Date(date).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableHead>
            ))}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* FedEx POD */}
          <TableRow>
            <TableCell className="font-medium">FedEx - POD (Cantidad)</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date}>{data.fedex.pod[date] || 0}</TableCell>
            ))}
            <TableCell>{Object.values(data.fedex.pod).reduce((sum, val) => sum + val, 0)}</TableCell>
          </TableRow>

          {/* FedEx DEX 07 */}
          <TableRow>
            <TableCell className="font-medium">FedEx - DEX 07 (Cantidad)</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date}>{data.fedex.dex07[date] || 0}</TableCell>
            ))}
            <TableCell>{Object.values(data.fedex.dex07).reduce((sum, val) => sum + val, 0)}</TableCell>
          </TableRow>

          {/* FedEx Total */}
          <TableRow className="bg-muted/50">
            <TableCell className="font-medium">FedEx - Total ($59.51 c/u)</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date}>{formatCurrency(data.fedex.total[date] || 0)}</TableCell>
            ))}
            <TableCell className="font-bold">
              {formatCurrency(Object.values(data.fedex.total).reduce((sum, val) => sum + val, 0))}
            </TableCell>
          </TableRow>

          {/* DHL OK */}
          <TableRow>
            <TableCell className="font-medium">DHL - OK (Cantidad)</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date}>{data.dhl.ok[date] || 0}</TableCell>
            ))}
            <TableCell>{Object.values(data.dhl.ok).reduce((sum, val) => sum + val, 0)}</TableCell>
          </TableRow>

          {/* DHL BA */}
          <TableRow>
            <TableCell className="font-medium">DHL - BA (Cantidad)</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date}>{data.dhl.ba[date] || 0}</TableCell>
            ))}
            <TableCell>{Object.values(data.dhl.ba).reduce((sum, val) => sum + val, 0)}</TableCell>
          </TableRow>

          {/* DHL Total */}
          <TableRow className="bg-muted/50">
            <TableCell className="font-medium">DHL - Total ($45.00 c/u)</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date}>{formatCurrency(data.dhl.total[date] || 0)}</TableCell>
            ))}
            <TableCell className="font-bold">
              {formatCurrency(Object.values(data.dhl.total).reduce((sum, val) => sum + val, 0))}
            </TableCell>
          </TableRow>

          {/* Total Diario */}
          <TableRow className="bg-primary/10">
            <TableCell className="font-bold">TOTAL DIARIO</TableCell>
            {data.dates.map((date) => (
              <TableCell key={date} className="font-bold">
                {formatCurrency(data.dailyTotals[date] || 0)}
              </TableCell>
            ))}
            <TableCell className="font-bold text-lg">{formatCurrency(data.grandTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
