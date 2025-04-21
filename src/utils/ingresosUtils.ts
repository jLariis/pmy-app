import { readExcelFile, processDeliveryData } from "./readExcelFile"

/**
 * Tipos de datos para el módulo de ingresos
 */
export interface IngresoData {
  id?: string
  Guia?: string
  NumeroGuia?: string
  Compañia: string
  TipoEntrega: string
  Fecha: string
  Ingreso: number
  Zona?: string
  Ruta?: string
  Conductor?: string
  [key: string]: any
}

/**
 * Resumen de ingresos
 */
export interface IngresosSummary {
  totalIngresos: number
  totalEntregas: number
  ingresosFedEx: number
  ingresosDHL: number
  entregasFedEx: number
  entregasDHL: number
  ingresosPorTipo: {
    [key: string]: number
  }
  entregasPorTipo: {
    [key: string]: number
  }
  ingresosPorFecha: {
    [key: string]: number
  }
}

/**
 * Procesa un archivo Excel para el módulo de ingresos
 * @param file Archivo Excel a procesar
 * @returns Promise con los datos procesados
 */
export const processIngresoFile = async (file: File): Promise<IngresoData[]> => {
  try {
    const rawData = await readExcelFile(file)
    const processedData = processDeliveryData(rawData)

    // Añadir IDs únicos
    return processedData.map((item, index) => ({
      ...item,
      id: `ing-${Date.now()}-${index}`,
    }))
  } catch (error) {
    console.error("Error procesando archivo de ingresos:", error)
    throw error
  }
}

/**
 * Genera un resumen de los datos de ingresos
 * @param data Datos de ingresos
 * @returns Resumen de ingresos
 */
export const generateIngresosSummary = (data: IngresoData[]): IngresosSummary => {
  const summary: IngresosSummary = {
    totalIngresos: 0,
    totalEntregas: data.length,
    ingresosFedEx: 0,
    ingresosDHL: 0,
    entregasFedEx: 0,
    entregasDHL: 0,
    ingresosPorTipo: {},
    entregasPorTipo: {},
    ingresosPorFecha: {},
  }

  data.forEach((item) => {
    // Sumar ingresos totales
    summary.totalIngresos += item.Ingreso || 0

    // Contar por compañía
    if (item.Compañia === "FedEx") {
      summary.ingresosFedEx += item.Ingreso || 0
      summary.entregasFedEx += 1
    } else if (item.Compañia === "DHL") {
      summary.ingresosDHL += item.Ingreso || 0
      summary.entregasDHL += 1
    }

    // Contar por tipo de entrega
    const tipo = item.TipoEntrega || "Desconocido"
    summary.ingresosPorTipo[tipo] = (summary.ingresosPorTipo[tipo] || 0) + (item.Ingreso || 0)
    summary.entregasPorTipo[tipo] = (summary.entregasPorTipo[tipo] || 0) + 1

    // Contar por fecha
    const fecha = item.Fecha || "Sin fecha"
    summary.ingresosPorFecha[fecha] = (summary.ingresosPorFecha[fecha] || 0) + (item.Ingreso || 0)
  })

  return summary
}

/**
 * Busca una guía específica en los datos
 * @param data Datos de ingresos
 * @param guia Número de guía a buscar
 * @returns Datos de la guía encontrada o null
 */
export const searchGuia = (data: IngresoData[], guia: string): IngresoData | null => {
  const normalizedGuia = guia.trim().toLowerCase()

  const result = data.find((item) => {
    const itemGuia = (item.Guia || item.NumeroGuia || "").toString().toLowerCase()
    return itemGuia.includes(normalizedGuia)
  })

  return result || null
}

/**
 * Filtra los datos por fecha
 * @param data Datos de ingresos
 * @param startDate Fecha de inicio
 * @param endDate Fecha de fin
 * @returns Datos filtrados
 */
export const filterByDateRange = (
  data: IngresoData[],
  startDate: Date | string,
  endDate: Date | string,
): IngresoData[] => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return data.filter((item) => {
    const itemDate = new Date(item.Fecha)
    return itemDate >= start && itemDate <= end
  })
}

export default {
  processIngresoFile,
  generateIngresosSummary,
  searchGuia,
  filterByDateRange,
}
