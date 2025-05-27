"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, Loader2, Plus, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { PermissionGuard } from "@/components/permission-guard"
import {
  getRoles,
  getPermisos,
  getRolPermisos,
  asignarPermisoARol,
  quitarPermisoDeRol,
  crearRol,
  actualizarRol,
  eliminarRol,
} from "@/lib/data-supabase"
import type { Rol, Permiso } from "@/lib/types"

export default function PermisosPage() {
  const [activeTab, setActiveTab] = useState("roles")
  const [roles, setRoles] = useState<Rol[]>([])
  const [permisos, setPermisos] = useState<Permiso[]>([])
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null)
  const [rolPermisos, setRolPermisos] = useState<Permiso[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingPermisos, setLoadingPermisos] = useState(false)
  const [isRolDialogOpen, setIsRolDialogOpen] = useState(false)
  const [rolNombre, setRolNombre] = useState("")
  const [rolDescripcion, setRolDescripcion] = useState("")
  const [editingRolId, setEditingRolId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadRoles()
    loadPermisos()
  }, [])

  useEffect(() => {
    if (selectedRol) {
      loadRolPermisos(selectedRol.id)
    }
  }, [selectedRol])

  const loadRoles = async () => {
    setLoading(true)
    try {
      const rolesData = await getRoles()
      setRoles(rolesData)
      if (rolesData.length > 0 && !selectedRol) {
        setSelectedRol(rolesData[0])
      }
    } catch (error) {
      console.error("Error al cargar roles:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los roles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadPermisos = async () => {
    try {
      const permisosData = await getPermisos()
      setPermisos(permisosData)
    } catch (error) {
      console.error("Error al cargar permisos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los permisos",
        variant: "destructive",
      })
    }
  }

  const loadRolPermisos = async (rolId: string) => {
    setLoadingPermisos(true)
    try {
      const permisosData = await getRolPermisos(rolId)
      setRolPermisos(permisosData)
    } catch (error) {
      console.error("Error al cargar permisos del rol:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los permisos del rol",
        variant: "destructive",
      })
    } finally {
      setLoadingPermisos(false)
    }
  }

  const handleTogglePermiso = async (permiso: Permiso, isChecked: boolean) => {
    if (!selectedRol) return

    try {
      if (isChecked) {
        await asignarPermisoARol(selectedRol.id, permiso.id)
        setRolPermisos((prev) => [...prev, permiso])
      } else {
        await quitarPermisoDeRol(selectedRol.id, permiso.id)
        setRolPermisos((prev) => prev.filter((p) => p.id !== permiso.id))
      }
    } catch (error) {
      console.error("Error al actualizar permiso:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el permiso",
        variant: "destructive",
      })
    }
  }

  const handleOpenRolDialog = (rol?: Rol) => {
    if (rol) {
      setEditingRolId(rol.id)
      setRolNombre(rol.nombre)
      setRolDescripcion(rol.descripcion || "")
    } else {
      setEditingRolId(null)
      setRolNombre("")
      setRolDescripcion("")
    }
    setIsRolDialogOpen(true)
  }

  const handleSubmitRol = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingRolId) {
        // Actualizar rol existente
        const updatedRol = await actualizarRol(editingRolId, rolNombre, rolDescripcion)
        if (updatedRol) {
          setRoles((prev) => prev.map((r) => (r.id === editingRolId ? updatedRol : r)))
          toast({
            title: "Rol actualizado",
            description: "El rol se ha actualizado correctamente",
          })
        }
      } else {
        // Crear nuevo rol
        const newRol = await crearRol(rolNombre, rolDescripcion)
        if (newRol) {
          setRoles((prev) => [...prev, newRol])
          toast({
            title: "Rol creado",
            description: "El rol se ha creado correctamente",
          })
        }
      }
      setIsRolDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar rol:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el rol",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteRol = async (rolId: string) => {
    if (confirm("¿Está seguro de eliminar este rol? Esta acción no se puede deshacer.")) {
      try {
        const success = await eliminarRol(rolId)
        if (success) {
          setRoles((prev) => prev.filter((r) => r.id !== rolId))
          if (selectedRol?.id === rolId) {
            setSelectedRol(roles.length > 1 ? roles.find((r) => r.id !== rolId) || null : null)
          }
          toast({
            title: "Rol eliminado",
            description: "El rol se ha eliminado correctamente",
          })
        }
      } catch (error) {
        console.error("Error al eliminar rol:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el rol",
          variant: "destructive",
        })
      }
    }
  }

  const isPermisoAsignado = (permisoId: string) => {
    return rolPermisos.some((p) => p.id === permisoId)
  }

  return (
    <AppLayout>
      <PermissionGuard requiredPermission="roles:manage">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gestión de Permisos</h2>
            <p className="text-muted-foreground">Administra los roles y permisos del sistema</p>
          </div>

          <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permisos">Permisos</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Roles del Sistema</h3>
                <Button onClick={() => handleOpenRolDialog()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Rol
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Roles</CardTitle>
                      <CardDescription>Selecciona un rol para ver sus permisos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {roles.map((rol) => (
                            <div
                              key={rol.id}
                              className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                                selectedRol?.id === rol.id ? "bg-secondary" : "hover:bg-secondary/50"
                              }`}
                              onClick={() => setSelectedRol(rol)}
                            >
                              <div>
                                <div className="font-medium">{rol.nombre}</div>
                                {rol.descripcion && (
                                  <div className="text-sm text-muted-foreground">{rol.descripcion}</div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                {rol.isDefault && <Badge variant="outline">Predeterminado</Badge>}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenRolDialog(rol)
                                  }}
                                >
                                  <Shield className="h-4 w-4" />
                                </Button>
                                {!rol.isDefault && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteRol(rol.id)
                                    }}
                                  >
                                    <AlertCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedRol ? `Permisos de ${selectedRol.nombre}` : "Permisos"}</CardTitle>
                      <CardDescription>
                        {selectedRol
                          ? "Gestiona los permisos asignados a este rol"
                          : "Selecciona un rol para gestionar sus permisos"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!selectedRol ? (
                        <div className="flex items-center justify-center py-4">
                          <p className="text-muted-foreground">Selecciona un rol para ver sus permisos</p>
                        </div>
                      ) : loadingPermisos ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedRol.isDefault && (
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Rol predeterminado</AlertTitle>
                              <AlertDescription>
                                Este es un rol predeterminado del sistema. Los cambios que realices afectarán a todos
                                los usuarios con este rol.
                              </AlertDescription>
                            </Alert>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {permisos.map((permiso) => (
                              <div key={permiso.id} className="flex items-start space-x-2 p-3 rounded-md border">
                                <Checkbox
                                  id={`permiso-${permiso.id}`}
                                  checked={isPermisoAsignado(permiso.id)}
                                  onCheckedChange={(checked) => handleTogglePermiso(permiso, checked === true)}
                                  disabled={selectedRol.isDefault && permiso.codigo.includes("roles:manage")}
                                />
                                <div className="grid gap-1.5">
                                  <Label htmlFor={`permiso-${permiso.id}`} className="font-medium">
                                    {permiso.nombre}
                                  </Label>
                                  {permiso.descripcion && (
                                    <p className="text-sm text-muted-foreground">{permiso.descripcion}</p>
                                  )}
                                  <Badge variant="outline" className="w-fit">
                                    {permiso.codigo}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permisos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Permisos del Sistema</CardTitle>
                  <CardDescription>Lista de todos los permisos disponibles en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {permisos.map((permiso) => (
                          <div key={permiso.id} className="p-3 rounded-md border">
                            <h4 className="font-medium">{permiso.nombre}</h4>
                            {permiso.descripcion && (
                              <p className="text-sm text-muted-foreground mt-1">{permiso.descripcion}</p>
                            )}
                            <Badge variant="outline" className="mt-2">
                              {permiso.codigo}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isRolDialogOpen} onOpenChange={setIsRolDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRolId ? "Editar Rol" : "Nuevo Rol"}</DialogTitle>
              <DialogDescription>
                {editingRolId ? "Actualiza la información del rol" : "Completa la información para crear un nuevo rol"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitRol}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" value={rolNombre} onChange={(e) => setRolNombre(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Input id="descripcion" value={rolDescripcion} onChange={(e) => setRolDescripcion(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsRolDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingRolId ? "Actualizando..." : "Guardando..."}
                    </>
                  ) : (
                    <>{editingRolId ? "Actualizar" : "Guardar"}</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PermissionGuard>
    </AppLayout>
  )
}
