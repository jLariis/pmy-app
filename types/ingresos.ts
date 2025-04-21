export interface DeliveryData {
  id: string
  guia: string
  fecha: string
  compania: string
  estado: string
  cliente: string
  direccion: string
}

export interface ProcessedData {
  dates: string[]
  fedex: {
    pod: Record<string, number>
    dex07: Record<string, number>
    total: Record<string, number>
  }
  dhl: {
    ok: Record<string, number>
    ba: Record<string, number>
    total: Record<string, number>
  }
  dailyTotals: Record<string, number>
  grandTotal: number
}
