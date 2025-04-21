"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface IngresosTablaProps {
  data: any
}

export function IngresosTabla({ data }: IngresosTablaProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Tabla Detallada de Ingresos</CardTitle>
        <CardDescription>Desglose diario de entregas e ingresos por compañía</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Concepto</TableHead>
                {data.fechas.map((fecha: string, index: number) => (
                  <TableHead key={index} className="text-center">
                    {fecha.split("-")[2]}/{fecha.split("-")[1]}
                  </TableHead>
                ))}
                <TableHead className="text-center font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* FedEx POD */}
              <TableRow>
                <TableCell className="font-medium">FedEx POD</TableCell>
                {data.fedex.pod.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center">
                    {value}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">
                  {data.fedex.pod.reduce((a: number, b: number) => a + b, 0)}
                </TableCell>
              </TableRow>

              {/* FedEx DEX 07 */}
              <TableRow>
                <TableCell className="font-medium">FedEx DEX 07</TableCell>
                {data.fedex.dex07.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center">
                    {value}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">
                  {data.fedex.dex07.reduce((a: number, b: number) => a + b, 0)}
                </TableCell>
              </TableRow>

              {/* DHL OK */}
              <TableRow>
                <TableCell className="font-medium">DHL OK</TableCell>
                {data.dhl.ok.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center">
                    {value}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">
                  {data.dhl.ok.reduce((a: number, b: number) => a + b, 0)}
                </TableCell>
              </TableRow>

              {/* DHL BA */}
              <TableRow>
                <TableCell className="font-medium">DHL BA</TableCell>
                {data.dhl.ba.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center">
                    {value}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">
                  {data.dhl.ba.reduce((a: number, b: number) => a + b, 0)}
                </TableCell>
              </TableRow>

              {/* Ingresos FedEx */}
              <TableRow className="bg-indigo-50">
                <TableCell className="font-medium">Ingresos FedEx ($)</TableCell>
                {data.ingresosFedex.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center">
                    ${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">
                  $
                  {data.ingresosFedex
                    .reduce((a: number, b: number) => a + b, 0)
                    .toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>

              {/* Ingresos DHL */}
              <TableRow className="bg-amber-50">
                <TableCell className="font-medium">Ingresos DHL ($)</TableCell>
                {data.ingresosDhl.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center">
                    ${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">
                  $
                  {data.ingresosDhl
                    .reduce((a: number, b: number) => a + b, 0)
                    .toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>

              {/* Total Diario */}
              <TableRow className="bg-gray-100">
                <TableCell className="font-medium">Total Diario ($)</TableCell>
                {data.totalDiario.map((value: number, index: number) => (
                  <TableCell key={index} className="text-center font-bold">
                    ${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold text-lg">
                  ${data.totalGeneral.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
