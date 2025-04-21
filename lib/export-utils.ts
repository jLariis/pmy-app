import * as XLSX from "xlsx"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import type { ProcessedData, DeliveryData } from "@/types/ingresos"

// Función para exportar a Excel
export const exportToExcel = (processedData: ProcessedData, rawData: DeliveryData[], fileName: string) => {
  // Crear una hoja para el resumen
  const summaryData = [
    ["", ...processedData.dates, "Total"],
    [
      "FedEx - POD (Cantidad)",
      ...processedData.dates.map((date) => processedData.fedex.pod[date] || 0),
      Object.values(processedData.fedex.pod).reduce((sum, val) => sum + val, 0),
    ],
    [
      "FedEx - DEX 07 (Cantidad)",
      ...processedData.dates.map((date) => processedData.fedex.dex07[date] || 0),
      Object.values(processedData.fedex.dex07).reduce((sum, val) => sum + val, 0),
    ],
    [
      "FedEx - Total ($59.51 c/u)",
      ...processedData.dates.map((date) => processedData.fedex.total[date] || 0),
      Object.values(processedData.fedex.total).reduce((sum, val) => sum + val, 0),
    ],
    [
      "DHL - OK (Cantidad)",
      ...processedData.dates.map((date) => processedData.dhl.ok[date] || 0),
      Object.values(processedData.dhl.ok).reduce((sum, val) => sum + val, 0),
    ],
    [
      "DHL - BA (Cantidad)",
      ...processedData.dates.map((date) => processedData.dhl.ba[date] || 0),
      Object.values(processedData.dhl.ba).reduce((sum, val) => sum + val, 0),
    ],
    [
      "DHL - Total ($45.00 c/u)",
      ...processedData.dates.map((date) => processedData.dhl.total[date] || 0),
      Object.values(processedData.dhl.total).reduce((sum, val) => sum + val, 0),
    ],
    [
      "TOTAL DIARIO",
      ...processedData.dates.map((date) => processedData.dailyTotals[date] || 0),
      processedData.grandTotal,
    ],
  ]

  // Crear una hoja para los datos crudos
  const rawDataArray = rawData.map((item) => [
    item.guia,
    new Date(item.fecha).toLocaleDateString(),
    item.compania,
    item.estado,
    item.cliente,
    item.direccion,
  ])

  // Agregar encabezados a los datos crudos
  rawDataArray.unshift(["Guía", "Fecha", "Compañía", "Estado", "Cliente", "Dirección"])

  // Crear un libro de trabajo
  const wb = XLSX.utils.book_new()

  // Agregar la hoja de resumen
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(wb, summaryWs, "Resumen de Ingresos")

  // Agregar la hoja de datos crudos
  const rawWs = XLSX.utils.aoa_to_sheet(rawDataArray)
  XLSX.utils.book_append_sheet(wb, rawWs, "Datos de Entregas")

  // Guardar el archivo
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}

// Función para exportar a PDF
export const exportToPdf = (processedData: ProcessedData, fileName: string) => {
  const doc = new jsPDF()

  // Título
  doc.setFontSize(18)
  doc.text("Reporte de Ingresos por Entregas", 14, 20)

  // Fecha de generación
  doc.setFontSize(10)
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30)

  // Preparar datos para la tabla
  const tableData = [
    [
      "FedEx - POD (Cantidad)",
      ...processedData.dates.map((date) => processedData.fedex.pod[date] || 0),
      Object.values(processedData.fedex.pod).reduce((sum, val) => sum + val, 0),
    ],
    [
      "FedEx - DEX 07 (Cantidad)",
      ...processedData.dates.map((date) => processedData.fedex.dex07[date] || 0),
      Object.values(processedData.fedex.dex07).reduce((sum, val) => sum + val, 0),
    ],
    [
      "FedEx - Total ($59.51 c/u)",
      ...processedData.dates.map((date) => `$${(processedData.fedex.total[date] || 0).toFixed(2)}`),
      `$${Object.values(processedData.fedex.total)
        .reduce((sum, val) => sum + val, 0)
        .toFixed(2)}`,
    ],
    [
      "DHL - OK (Cantidad)",
      ...processedData.dates.map((date) => processedData.dhl.ok[date] || 0),
      Object.values(processedData.dhl.ok).reduce((sum, val) => sum + val, 0),
    ],
    [
      "DHL - BA (Cantidad)",
      ...processedData.dates.map((date) => processedData.dhl.ba[date] || 0),
      Object.values(processedData.dhl.ba).reduce((sum, val) => sum + val, 0),
    ],
    [
      "DHL - Total ($45.00 c/u)",
      ...processedData.dates.map((date) => `$${(processedData.dhl.total[date] || 0).toFixed(2)}`),
      `$${Object.values(processedData.dhl.total)
        .reduce((sum, val) => sum + val, 0)
        .toFixed(2)}`,
    ],
    [
      "TOTAL DIARIO",
      ...processedData.dates.map((date) => `$${(processedData.dailyTotals[date] || 0).toFixed(2)}`),
      `$${processedData.grandTotal.toFixed(2)}`,
    ],
  ]

  // Encabezados de la tabla
  const headers = [
    "Concepto",
    ...processedData.dates.map((date) =>
      new Date(date).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
      }),
    ),
    "Total",
  ](
    // Generar la tabla
    doc as any,
  ).autoTable({
    head: [headers],
    body: tableData,
    startY: 40,
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] },
    footStyles: { fillColor: [200, 200, 200] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  })

  // Resumen
  const finalY = (doc as any).lastAutoTable.finalY + 10
  doc.setFontSize(12)
  doc.text("Resumen de Ingresos", 14, finalY)

  doc.setFontSize(10)
  doc.text(
    `Total FedEx: $${Object.values(processedData.fedex.total)
      .reduce((sum, val) => sum + val, 0)
      .toFixed(2)}`,
    14,
    finalY + 10,
  )
  doc.text(
    `Total DHL: $${Object.values(processedData.dhl.total)
      .reduce((sum, val) => sum + val, 0)
      .toFixed(2)}`,
    14,
    finalY + 20,
  )
  doc.text(`TOTAL GENERAL: $${processedData.grandTotal.toFixed(2)}`, 14, finalY + 30)

  // Guardar el archivo
  doc.save(`${fileName}.pdf`)
}
