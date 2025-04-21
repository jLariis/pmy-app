import Papa from "papaparse"

/**
 * Lee un archivo CSV y devuelve los datos como un array de objetos
 * @param file Archivo CSV a leer
 * @returns Promise con los datos del CSV
 */
export const readCSVFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Filtrar filas que son completamente vacías
        const data = results.data.filter((row: any) => {
          return Object.values(row).some((value) => value !== null && value !== undefined && value !== "")
        })
        resolve(data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

/**
 * Convierte un string CSV a un array de objetos
 * @param csvString String CSV a convertir
 * @returns Array de objetos con los datos del CSV
 */
export const parseCSVString = (csvString: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

/**
 * Convierte un array de objetos a un string CSV
 * @param data Array de objetos a convertir
 * @returns String CSV
 */
export const convertToCSV = (data: any[]): string => {
  return Papa.unparse(data)
}

export default readCSVFile
