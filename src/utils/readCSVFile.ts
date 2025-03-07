import Papa from "papaparse";
import { Shipment } from "@/types/shipment";

export const readCSVFile = (file: File): Promise<Shipment[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const today = new Date(); // Fecha actual en tiempo real
          const todayISO = today.toISOString(); // Formato de timestamp ISO

          const shipments: Shipment[] = result.data.map((row: any) => {
            const commitDate = new Date(row["Commit Date"]);
            const timeDifference = (commitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24); // Diferencia en días

            let priority: "alta" | "media" | "baja" | undefined;
            if (timeDifference <= 0) {
              priority = "alta";
            } else if (timeDifference <= 3) {
              priority = "media";
            } else {
              priority = "baja";
            }

            return {
              trackingNumber: row["Tracking Number"],
              recipientName: row["Recip Name"],
              recipientAddress: row["Recip Addr"],
              recipientCity: row["Recip City"],
              recipientZip: row["Recip Zip"],
              commitDate: row["Commit Date"],
              commitTime: row["Commit Time"],
              recipientPhone: row["Recip Phone"],
              status: "pendiente", // Estado inicial por defecto
              payment: null, // No tiene pago inicial
              priority,
              statusHistory: [
                {
                  status: "recoleccion",
                  timestamp: todayISO,
                  notes: "Paquete recogido en sucursal",
                },
              ],
            };
          });

          resolve(shipments);
        } catch (error) {
          reject("Error al procesar el archivo CSV.");
        }
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
};
