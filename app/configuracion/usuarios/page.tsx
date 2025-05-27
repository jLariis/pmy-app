"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { PermissionGuard } from "@/components/permission-guard"
import { getRoles, getUserRoles, asignarRolAUsuario, quitarRolDeUsuario } from "@/lib/data-supabase"
import type { Rol, Usuario } from "@/lib/types"

// Función para obtener usuarios (simulada por ahora)
const getUsuarios = async (): Promise<Usuario[]> => {
  // En una implementación real, esto vendría de la base de datos
  return [
    {
      id: "1",
      email: "admin@delyaqui.com",
      nombre: "Administrador",
      apellido: "Del Sistema",
      rol: "admin",
    },
    {
      id: "2",
      email: "usuario@delyaqui.com",
      nombre: "Usuario",
      apellido: "Estándar",
      rol: "usuario",
    },
  ]
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [roles, setRoles] = useState<Rol[]>([])
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const [usuarioRoles, setUsuarioRoles] = useState<Rol[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingRoles, setLoadingRoles] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadUsuarios()
    loadRoles()
  }, [])

  useEffect(() => {
    if (selectedUsuario) {
      loadUsuarioRoles(selectedUsuario.id)
    }
  }, [selectedUsuario])

  const loadUsuarios = async () => {
    setLoading(true)
    try {
      const usuariosData = await getUsuarios()
      setUsuarios(usuariosData)
      if (usuariosData.length > 0 && !selectedUsuario) {
        setSelectedUsuario(usuariosData[0])
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadRoles = async () => {
    try {
      const rolesData = await getRoles()
      setRoles(rolesData)
    } catch (error) {
      console.error("Error al cargar roles:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los roles",
        variant: "destructive",
      })
    }
  }

  const loadUsuarioRoles = async (usuarioId: string) => {
    setLoadingRoles(true)
    try {
      const rolesData = await getUserRoles(usuarioId)
      setUsuarioRoles(rolesData)
    } catch (error) {
      console.error("Error al cargar roles del usuario:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los roles del usuario",
        variant: "destructive",
      })
    } finally {
      setLoadingRoles(false)
    }
  }

  const handleToggleRol = async (rol: Rol, isChecked: boolean) => {
    if (!selectedUsuario) return

    try {
      if (isChecked) {
        await asignarRolAUsuario(selectedUsuario.id, rol.id)
        setUsuarioRoles((prev) => [...prev, rol])
      } else {
        await quitarRolDeUsuario(selectedUsuario.id, rol.id)
        setUsuarioRoles((prev) => prev.filter((r) => r.id !== rol.id))
      }
    } catch (error) {
      console.error("Error al actualizar rol:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el rol",
        variant: "destructive",
      })
    }
  }

  const isRolAsignado = (rolId: string) => {
    return usuarioRoles.some((r) => r.id === rolId)
  }

  return (
    <AppLayout>
      <PermissionGuard requiredPermission="usuarios:manage">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h2>
            <p className="text-muted-foreground">Administra los usuarios y sus roles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Usuarios</CardTitle>
                  <CardDescription>Selecciona un usuario para gestionar sus roles</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {usuarios.map((usuario) => (
                        <div
                          key={usuario.id}
                          className={`p-3 rounded-md cursor-pointer ${
                            selectedUsuario?.id === usuario.id ? "bg-secondary" : "hover:bg-secondary/50"
                          }`}
                          onClick={() => setSelectedUsuario(usuario)}
                        >
                          <div className="font-medium">
                            {usuario.nombre} {usuario.apellido}
                          </div>
                          <div className="text-sm text-muted-foreground">{usuario.email}</div>
                          <div className="mt-1">
                            <Badge variant={usuario.rol === "admin" ? "default" : "secondary"}>
                              {usuario.rol === "admin" ? "Administrador" : "Usuario"}
                            </Badge>
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
                  <CardTitle>
                    {selectedUsuario ? `Roles de ${selectedUsuario.nombre} ${selectedUsuario.apellido}` : "Roles"}
                  </CardTitle>
                  <CardDescription>
                    {selectedUsuario
                      ? "Gestiona los roles asignados a este usuario"
                      : "Selecciona un usuario para gestionar sus roles"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!selectedUsuario ? (
                    <div className="flex items-center justify-center py-4">
                      <p className="text-muted-foreground">Selecciona un usuario para ver sus roles</p>
                    </div>
                  ) : loadingRoles ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roles.map((rol) => (
                          <div key={rol.id} className="flex items-start space-x-2 p-3 rounded-md border">
                            <Checkbox
                              id={`rol-${rol.id}`}
                              checked={isRolAsignado(rol.id)}
                              onCheckedChange={(checked) => handleToggleRol(rol, checked === true)}
                            />
                            <div className="grid gap-1.5">
                              <Label htmlFor={`rol-${rol.id}`} className="font-medium">
                                {rol.nombre}
                              </Label>
                              {rol.descripcion && <p className="text-sm text-muted-foreground">{rol.descripcion}</p>}
                              {rol.isDefault && (
                                <Badge variant="outline" className="w-fit">
                                  Predeterminado
                                </Badge>
                              )}
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
        </div>
      </PermissionGuard>
    </AppLayout>
  )
}
