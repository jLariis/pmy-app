"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ExcelUploaderProps {
  onFileUpload: (file: File) => void
}

export function ExcelUploader({ onFileUpload }: ExcelUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validar que sea un archivo Excel
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
    ]

    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Por favor, seleccione un archivo Excel válido (.xls, .xlsx)")
      setUploadStatus("error")
      return
    }

    setFile(selectedFile)
    setUploadStatus("idle")
    setErrorMessage("")
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("idle")

    try {
      // Aquí iría la lógica real de carga y procesamiento
      // Simulamos un proceso de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onFileUpload(file)
      setUploadStatus("success")
    } catch (error) {
      console.error("Error al procesar el archivo:", error)
      setErrorMessage("Ocurrió un error al procesar el archivo. Verifique el formato e intente nuevamente.")
      setUploadStatus("error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Cargar Archivo de Entregas</CardTitle>
        <CardDescription>
          Suba un archivo Excel con los registros de entregas para calcular los ingresos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="excel-file">Archivo Excel</Label>
          <div className="flex gap-2">
            <Input
              id="excel-file"
              type="file"
              accept=".xls,.xlsx,.xlsm"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Button onClick={handleUpload} disabled={!file || uploading} className="whitespace-nowrap">
              {uploading ? "Procesando..." : "Procesar Archivo"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Formatos aceptados: .xls, .xlsx</p>
        </div>

        {uploadStatus === "success" && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Archivo procesado correctamente</AlertTitle>
            <AlertDescription>
              El archivo {file?.name} ha sido procesado exitosamente. Puede ver los resultados en el Dashboard
              Ejecutivo.
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 border-t p-4">
        <h4 className="font-semibold">Formato esperado del archivo:</h4>
        <ul className="list-disc pl-5 text-sm">
          <li>Columnas para fecha, número de guía, compañía y estado de entrega</li>
          <li>Estados válidos para FedEx: POD (entregado), DEX 07 (rechazado)</li>
          <li>Estados válidos para DHL: OK (entregado), BA (dirección incorrecta)</li>
        </ul>
      </CardFooter>
    </Card>
  )
}
