"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Sucursal } from "@/lib/types"
import { getSucursales } from "@/lib/data"

interface SucursalSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export function SucursalSelector({ value, onValueChange }: SucursalSelectorProps) {
  const [open, setOpen] = useState(false)
  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  const [selectedSucursal, setSelectedSucursal] = useState<Sucursal | undefined>()

  useEffect(() => {
    // Cargar sucursales
    const loadedSucursales = getSucursales() || []
    setSucursales(loadedSucursales)

    // Establecer la sucursal seleccionada si hay un valor
    if (value && loadedSucursales.length > 0) {
      const selected = loadedSucursales.find((s) => s.id === value)
      setSelectedSucursal(selected)
    } else if (loadedSucursales.length > 0) {
      // Seleccionar la primera sucursal por defecto
      setSelectedSucursal(loadedSucursales[0])
      onValueChange(loadedSucursales[0].id)
    }
  }, [value, onValueChange])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedSucursal ? selectedSucursal.nombre : "Seleccionar sucursal..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar sucursal..." />
          <CommandList>
            <CommandEmpty>No se encontraron sucursales.</CommandEmpty>
            <CommandGroup>
              {(sucursales || []).map((sucursal) => (
                <CommandItem
                  key={sucursal.id}
                  value={sucursal.id}
                  onSelect={(currentValue) => {
                    const selected = sucursales.find((s) => s.id === currentValue)
                    if (selected) {
                      setSelectedSucursal(selected)
                      onValueChange(selected.id)
                    }
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === sucursal.id ? "opacity-100" : "opacity-0")} />
                  {sucursal.nombre}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
