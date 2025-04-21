"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NewRouteDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Ruta</DialogTitle>
          <DialogDescription>
            Ingrese los detalles de la nueva ruta aquí. Haga clic en guardar cuando termine.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zipCodes" className="text-right">
                Códigos Postales
              </Label>
              <Input id="zipCodes" className="col-span-3" placeholder="83000, 83100, 83200" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="driver" className="text-right">
                Repartidor
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar repartidor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="juan">Juan Pérez</SelectItem>
                  <SelectItem value="maria">María González</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar Ruta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
