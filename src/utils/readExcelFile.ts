import * as XLSX from "xlsx"

/**
 * Lee un archivo Excel y devuelve los datos como un array de objetos
 * @param file Archivo Excel a leer
 * @param sheetName Nombre de la hoja a leer (opcional)
 * @returns Promise con los datos del Excel
 */
export const readExcelFile = (file: File, sheetName?: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })

        // Si no se especifica una hoja, usar la primera
        const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]]

        // Convertir a JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet)

        // Filtrar filas vacías
        const filteredData = jsonData.filter((row: any) => {
          return Object.values(row).some((value) => value !== null && value !== undefined && value !== "")
        })

        resolve(filteredData)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsBinaryString(file)
  })
}

/**
 * Obtiene los nombres de las hojas de un archivo Excel
 * @param file Archivo Excel
 * @returns Promise con los nombres de las hojas
 */
export const getExcelSheetNames = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        resolve(workbook.SheetNames)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsBinaryString(file)
  })
}

/**
 * Convierte datos a un archivo Excel
 * @param data Datos a convertir
 * @param sheetName Nombre de la hoja
 * @param fileName Nombre del archivo a descargar
 */
export const exportToExcel = (data: any[], sheetName = "Hoja1", fileName = "export.xlsx"): void => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  XLSX.writeFile(workbook, fileName)
}

/**
 * Procesa datos específicos de FedEx y DHL para el módulo de ingresos
 * @param data Datos del Excel
 * @returns Datos procesados con cálculos de ingresos
 */
export const processDeliveryData = (data: any[]): any[] => {
  return data.map((row) => {
    // Determinar si es FedEx o DHL basado en los datos
    const isFedEx =
      row.Compañia?.toLowerCase().includes("fedex") ||
      row.Empresa?.toLowerCase().includes("fedex") ||
      row.Carrier?.toLowerCase().includes("fedex")

    const isDHL =
      row.Compañia?.toLowerCase().includes("dhl") ||
      row.Empresa?.toLowerCase().includes("dhl") ||
      row.Carrier?.toLowerCase().includes("dhl")

    // Determinar tipo de entrega
    const deliveryType = row.TipoEntrega || row.Tipo || row.Status || ""

    // Calcular ingreso basado en tipo de entrega y compañía
    let income = 0

    if (isFedEx) {
      if (deliveryType.includes("POD")) income = 12.5
      else if (deliveryType.includes("DEX 07")) income = 10.0
      else if (deliveryType.includes("OK")) income = 12.5
      else if (deliveryType.includes("BA")) income = 0
      else income = 11.0 // Valor por defecto
    } else if (isDHL) {
      if (deliveryType.includes("POD")) income = 13.0
      else if (deliveryType.includes("DEX 07")) income = 10.5
      else if (deliveryType.includes("OK")) income = 13.0
      else if (deliveryType.includes("BA")) income = 0
      else income = 11.5 // Valor por defecto
    }

    return {
      ...row,
      Compañia: isFedEx ? "FedEx" : isDHL ? "DHL" : row.Compañia || row.Empresa || row.Carrier || "Desconocido",
      TipoEntrega: deliveryType,
      Ingreso: income,
      Fecha: row.Fecha || row.Date || new Date().toISOString().split("T")[0],
    }
  })
}

export default readExcelFile
