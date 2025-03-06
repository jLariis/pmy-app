"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import type { Shipment } from "@/app/dashboard/operation/shipments/columns"

interface DeliveryUpdateProps {
  shipment: Shipment | null
  isOpen: boolean
  onClose: () => void
  updateStatus: "entregado" | "no_entregado" | null
  onUpdateStatus: (
    status: "entregado" | "no_entregado",
    notes: string,
    photo: string | null,
    signature: string | null,
  ) => void
}

export function DeliveryUpdate({ shipment, isOpen, onClose, updateStatus, onUpdateStatus }: DeliveryUpdateProps) {
  const [notes, setNotes] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [signature, setSignature] = useState<string | null>(null)

  const handlePhotoCapture = () => {
    // In a real app, this would access the device camera
    setPhoto("photo_captured.jpg")
  }

  const handleSignatureCapture = () => {
    // In a real app, this would open a signature pad
    setSignature("signature_captured.jpg")
  }

  const handleSubmit = () => {
    if (!updateStatus) return
    onUpdateStatus(updateStatus, notes, photo, signature)
    setNotes("")
    setPhoto(null)
    setSignature(null)
  }

  if (!shipment || !updateStatus) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{updateStatus === "entregado" ? "Confirmar Entrega" : "Confirmar No Entregado"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              placeholder="Agregar notas sobre la entrega o no entrega"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Evidencia Fotográfica</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              {photo ? (
                <div className="text-center">
                  <p className="text-sm text-green-600">Foto capturada</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => setPhoto(null)}>
                    Tomar otra foto
                  </Button>
                </div>
              ) : (
                <>
                  <Camera className="h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Tomar foto de evidencia</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handlePhotoCapture}>
                    Capturar Foto
                  </Button>
                </>
              )}
            </div>
          </div>

          {updateStatus === "entregado" && (
            <div className="space-y-2">
              <Label>Firma del Destinatario</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                {signature ? (
                  <div className="text-center">
                    <p className="text-sm text-green-600">Firma capturada</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setSignature(null)}>
                      Capturar otra firma
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">Solicitar firma del destinatario</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleSignatureCapture}>
                      Capturar Firma
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          <Button
            className={`w-full ${updateStatus === "entregado" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            onClick={handleSubmit}
          >
            {updateStatus === "entregado" ? "Confirmar Entrega" : "Confirmar No Entregado"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}