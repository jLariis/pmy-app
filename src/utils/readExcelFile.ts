import { Shipment } from "@/app/dashboard/operation/shipments/columns";
import * as XLSX from "xlsx";

export const readExcelFile = (file: File): Promise<Shipment[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Tomar la primera hoja
        const sheet = workbook.Sheets[sheetName];

        // Convertir la hoja a JSON, comenzando desde la fila 5 (índice 4)
        const jsonData = XLSX.utils.sheet_to_json<any>(sheet, { range: 6, header: 1 });

        console.log("Datos crudos del Excel:", jsonData); // Depuración

        const today = new Date();
        const todayISO = today.toISOString();

        const shipments: Shipment[] = jsonData
          .map((row) => {
            // Verifica que la fila tenga datos
            if (!row || row.length === 0) return null;

            const commitDate = new Date(row[5]); // "Commit Date" está en la columna 5
            const timeDifference =
              (commitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

            let priority: "alta" | "media" | "baja" | undefined;
            if (timeDifference <= 0) {
              priority = "alta";
            } else if (timeDifference <= 3) {
              priority = "media";
            } else {
              priority = "baja";
            }

            return {
              trackingNumber: row[0], // "Tracking Number" está en la columna 0
              recipientName: row[1], // "Recip Name" está en la columna 1
              recipientAddress: row[2], // "Recip Addr" está en la columna 2
              recipientCity: row[3], // "Recip City" está en la columna 3
              recipientZip: row[4], // "Recip Zip" está en la columna 4
              commitDate: row[5], // "Commit Date" está en la columna 5
              commitTime: row[6], // "Commit Time" está en la columna 6
              recipientPhone: row[7], // "Recip Phone" está en la columna 7
              status: "pendiente",
              payment: null,
              priority,
              statusHistory: [
                {
                  status: "recoleccion",
                  timestamp: todayISO,
                  notes: "Paquete recogido en sucursal",
                },
              ],
            };
          })
          .filter(Boolean); // Filtra filas vacías o nulas

        resolve(shipments);
      } catch (error) {
        console.error("Error al procesar el archivo Excel:", error); // Depuración
        reject("Error al procesar el archivo Excel.");
      }
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error); // Depuración
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};