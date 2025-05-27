import type { Sucursal, IngresoRuta, CategoriaGasto, Gasto } from "./types"

// Datos de ejemplo para sucursales
export const sucursales: Sucursal[] = [
  {
    id: "1",
    nombre: "Villa Juárez DHL",
    direccion: "Calle Principal #123, Villa Juárez",
    telefono: "123-456-7890",
    activo: true,
  },
  {
    id: "2",
    nombre: "Álamos",
    direccion: "Av. Central #456, Álamos",
    telefono: "987-654-3210",
    activo: true,
  },
]

// Datos de ejemplo para categorías de gastos
export const categoriasGasto: CategoriaGasto[] = [
  { id: "1", nombre: "Nómina", descripcion: "Pagos de nómina a empleados" },
  { id: "2", nombre: "Renta", descripcion: "Renta de edificios y locales" },
  { id: "3", nombre: "Recarga", descripcion: "Recargas telefónicas y servicios" },
  { id: "4", nombre: "Peajes", descripcion: "Pagos de peajes en carreteras" },
  { id: "5", nombre: "Servicios", descripcion: "Servicios básicos (luz, agua, etc.)" },
  { id: "6", nombre: "Combustible", descripcion: "Combustible para vehículos" },
  { id: "7", nombre: "Otros gastos", descripcion: "Gastos varios no categorizados" },
  { id: "8", nombre: "Mantenimiento", descripcion: "Mantenimiento de unidades y equipos" },
  { id: "9", nombre: "Impuestos", descripcion: "Pagos de impuestos" },
  { id: "10", nombre: "Seguros", descripcion: "Pagos de seguros" },
]

// Función para generar fechas de abril 2024
const getAbrilDate = (day: number) => new Date(2024, 3, day)

// Datos de ejemplo para ingresos
export const ingresos: IngresoRuta[] = [
  {
    id: "1",
    sucursalId: "1",
    fecha: getAbrilDate(14),
    ok: 39,
    ba: 0,
    recolecciones: 0,
    total: 39,
    totalIngresos: 1755,
  },
  {
    id: "2",
    sucursalId: "1",
    fecha: getAbrilDate(15),
    ok: 0,
    ba: 0,
    recolecciones: 0,
    total: 0,
    totalIngresos: 0,
  },
  {
    id: "3",
    sucursalId: "1",
    fecha: getAbrilDate(16),
    ok: 15,
    ba: 0,
    recolecciones: 0,
    total: 15,
    totalIngresos: 675,
  },
  {
    id: "4",
    sucursalId: "1",
    fecha: getAbrilDate(17),
    ok: 10,
    ba: 2,
    recolecciones: 0,
    total: 12,
    totalIngresos: 540,
  },
  {
    id: "5",
    sucursalId: "1",
    fecha: getAbrilDate(18),
    ok: 0,
    ba: 0,
    recolecciones: 0,
    total: 0,
    totalIngresos: 0,
  },
  {
    id: "6",
    sucursalId: "1",
    fecha: getAbrilDate(19),
    ok: 0,
    ba: 0,
    recolecciones: 0,
    total: 0,
    totalIngresos: 0,
  },
  {
    id: "7",
    sucursalId: "1",
    fecha: getAbrilDate(20),
    ok: 0,
    ba: 0,
    recolecciones: 0,
    total: 0,
    totalIngresos: 0,
  },
]

// Datos de ejemplo para gastos
export const gastos: Gasto[] = [
  // Gastos para Villa Juárez DHL
  {
    id: "1",
    sucursalId: "1",
    categoriaId: "1",
    categoriaNombre: "Nómina",
    fecha: getAbrilDate(14),
    monto: 285.71,
    descripcion: "Pago de nómina semanal",
    metodoPago: "Transferencia",
    responsable: "Juan Pérez",
    notas: "Pago correspondiente a la primera semana de abril",
  },
  {
    id: "2",
    sucursalId: "1",
    categoriaId: "2",
    categoriaNombre: "Renta",
    fecha: getAbrilDate(14),
    monto: 133.33,
    descripcion: "Renta mensual prorrateada",
    metodoPago: "Transferencia",
    responsable: "María López",
    notas: "Pago parcial correspondiente a la primera quincena",
  },
  {
    id: "3",
    sucursalId: "1",
    categoriaId: "6",
    categoriaNombre: "Combustible",
    fecha: getAbrilDate(15),
    monto: 450.0,
    descripcion: "Carga de combustible para unidad #123",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Carlos Rodríguez",
    notas: "Ticket #45678 - Gasolinera PEMEX",
  },
  {
    id: "4",
    sucursalId: "1",
    categoriaId: "4",
    categoriaNombre: "Peajes",
    fecha: getAbrilDate(15),
    monto: 120.5,
    descripcion: "Peajes ruta Villa Juárez - Hermosillo",
    metodoPago: "Efectivo",
    responsable: "Carlos Rodríguez",
    notas: "Viaje de entrega urgente",
  },
  {
    id: "5",
    sucursalId: "1",
    categoriaId: "9",
    categoriaNombre: "Impuestos",
    fecha: getAbrilDate(16),
    monto: 598.02,
    descripcion: "Pago de impuestos municipales",
    metodoPago: "Transferencia",
    responsable: "María López",
    notas: "Pago trimestral",
  },
  {
    id: "6",
    sucursalId: "1",
    categoriaId: "5",
    categoriaNombre: "Servicios",
    fecha: getAbrilDate(16),
    monto: 245.75,
    descripcion: "Pago de servicio de electricidad",
    metodoPago: "Transferencia",
    responsable: "María López",
    notas: "Factura #CFE-123456",
  },
  {
    id: "7",
    sucursalId: "1",
    categoriaId: "7",
    categoriaNombre: "Otros gastos",
    fecha: getAbrilDate(17),
    monto: 85.3,
    descripcion: "Compra de artículos de limpieza",
    metodoPago: "Efectivo",
    responsable: "Ana Martínez",
    notas: "Para mantenimiento de oficina",
  },
  {
    id: "8",
    sucursalId: "1",
    categoriaId: "8",
    categoriaNombre: "Mantenimiento",
    fecha: getAbrilDate(17),
    monto: 750.0,
    descripcion: "Servicio de mantenimiento preventivo unidad #123",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Carlos Rodríguez",
    notas: "Cambio de aceite y filtros",
  },
  {
    id: "9",
    sucursalId: "1",
    categoriaId: "3",
    categoriaNombre: "Recarga",
    fecha: getAbrilDate(18),
    monto: 200.0,
    descripcion: "Recarga de saldo para teléfonos de oficina",
    metodoPago: "Tarjeta de Débito",
    responsable: "Ana Martínez",
    notas: "Plan empresarial",
  },
  {
    id: "10",
    sucursalId: "1",
    categoriaId: "10",
    categoriaNombre: "Seguros",
    fecha: getAbrilDate(18),
    monto: 1250.0,
    descripcion: "Pago mensual de seguro de flotilla",
    metodoPago: "Transferencia",
    responsable: "María López",
    notas: "Póliza #SEG-78901",
  },
  {
    id: "11",
    sucursalId: "1",
    categoriaId: "6",
    categoriaNombre: "Combustible",
    fecha: getAbrilDate(19),
    monto: 380.25,
    descripcion: "Carga de combustible para unidad #124",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Pedro Gómez",
    notas: "Ticket #56789 - Gasolinera PEMEX",
  },
  {
    id: "12",
    sucursalId: "1",
    categoriaId: "7",
    categoriaNombre: "Otros gastos",
    fecha: getAbrilDate(19),
    monto: 150.0,
    descripcion: "Compra de agua purificada para oficina",
    metodoPago: "Efectivo",
    responsable: "Ana Martínez",
    notas: "3 garrafones",
  },
  {
    id: "13",
    sucursalId: "1",
    categoriaId: "1",
    categoriaNombre: "Nómina",
    fecha: getAbrilDate(20),
    monto: 285.71,
    descripcion: "Pago de nómina semanal",
    metodoPago: "Transferencia",
    responsable: "Juan Pérez",
    notas: "Pago correspondiente a la segunda semana de abril",
  },
  {
    id: "14",
    sucursalId: "1",
    categoriaId: "8",
    categoriaNombre: "Mantenimiento",
    fecha: getAbrilDate(20),
    monto: 320.0,
    descripcion: "Reparación de aire acondicionado de oficina",
    metodoPago: "Cheque",
    responsable: "María López",
    notas: "Servicio de emergencia",
  },

  // Gastos para Álamos
  {
    id: "15",
    sucursalId: "2",
    categoriaId: "1",
    categoriaNombre: "Nómina",
    fecha: getAbrilDate(14),
    monto: 285.71,
    descripcion: "Gasto en nómina",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Juan Pérez",
  },
  {
    id: "16",
    sucursalId: "2",
    categoriaId: "2",
    categoriaNombre: "Renta",
    fecha: getAbrilDate(14),
    monto: 133.33,
    descripcion: "Renta mensual prorrateada",
    metodoPago: "Transferencia",
    responsable: "María López",
  },
  {
    id: "17",
    sucursalId: "2",
    categoriaId: "1",
    categoriaNombre: "Nómina",
    fecha: getAbrilDate(15),
    monto: 285.71,
    descripcion: "Gasto en nómina",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Juan Pérez",
  },
  {
    id: "18",
    sucursalId: "2",
    categoriaId: "2",
    categoriaNombre: "Renta",
    fecha: getAbrilDate(15),
    monto: 133.33,
    descripcion: "Renta mensual prorrateada",
    metodoPago: "Transferencia",
    responsable: "María López",
  },
  {
    id: "19",
    sucursalId: "2",
    categoriaId: "1",
    categoriaNombre: "Nómina",
    fecha: getAbrilDate(16),
    monto: 285.71,
    descripcion: "Gasto en nómina",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Juan Pérez",
  },
  {
    id: "20",
    sucursalId: "2",
    categoriaId: "2",
    categoriaNombre: "Renta",
    fecha: getAbrilDate(16),
    monto: 133.33,
    descripcion: "Renta mensual prorrateada",
    metodoPago: "Transferencia",
    responsable: "María López",
  },
  {
    id: "21",
    sucursalId: "2",
    categoriaId: "4",
    categoriaNombre: "Peajes",
    fecha: getAbrilDate(16),
    monto: 109.0,
    descripcion: "Peajes de ruta",
    metodoPago: "Efectivo",
    responsable: "Carlos Rodríguez",
  },
  {
    id: "22",
    sucursalId: "2",
    categoriaId: "6",
    categoriaNombre: "Combustible",
    fecha: getAbrilDate(16),
    monto: 500.0,
    descripcion: "Combustible para vehículos",
    metodoPago: "Tarjeta de Débito",
    responsable: "Juan Pérez",
  },
  {
    id: "23",
    sucursalId: "2",
    categoriaId: "9",
    categoriaNombre: "Impuestos",
    fecha: getAbrilDate(12),
    monto: 598.02,
    descripcion: "Gasto en impuestos",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Juan Pérez",
  },
  {
    id: "24",
    sucursalId: "2",
    categoriaId: "10",
    categoriaNombre: "Seguros",
    fecha: getAbrilDate(22),
    monto: 399.28,
    descripcion: "Gasto en seguros",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Juan Pérez",
  },
  {
    id: "25",
    sucursalId: "2",
    categoriaId: "6",
    categoriaNombre: "Combustible",
    fecha: getAbrilDate(13),
    monto: 54.06,
    descripcion: "Gasto en combustible",
    metodoPago: "Cheque",
    responsable: "Juan Pérez",
  },
  {
    id: "26",
    sucursalId: "2",
    categoriaId: "6",
    categoriaNombre: "Combustible",
    fecha: getAbrilDate(4),
    monto: 347.52,
    descripcion: "Gasto en combustible",
    metodoPago: "Cheque",
    responsable: "Juan Pérez",
  },
  {
    id: "27",
    sucursalId: "2",
    categoriaId: "7",
    categoriaNombre: "Otros gastos",
    fecha: getAbrilDate(19),
    monto: 105.83,
    descripcion: "Gasto en otros",
    metodoPago: "Tarjeta de Crédito",
    responsable: "Juan Pérez",
  },
  {
    id: "28",
    sucursalId: "2",
    categoriaId: "6",
    categoriaNombre: "Combustible",
    fecha: getAbrilDate(24),
    monto: 840.14,
    descripcion: "Gasto en combustible",
    metodoPago: "Transferencia",
    responsable: "Juan Pérez",
  },
]

// Funciones para manipular los datos (simulando una base de datos)

// Sucursales
export function getSucursales(): Sucursal[] {
  return [...sucursales]
}

export function getSucursalById(id: string): Sucursal | undefined {
  return sucursales.find((s) => s.id === id)
}

export function addSucursal(sucursal: Omit<Sucursal, "id">): Sucursal {
  const newSucursal = {
    ...sucursal,
    id: Date.now().toString(),
  }
  sucursales.push(newSucursal)
  return newSucursal
}

export function updateSucursal(id: string, data: Partial<Sucursal>): Sucursal | undefined {
  const index = sucursales.findIndex((s) => s.id === id)
  if (index !== -1) {
    sucursales[index] = { ...sucursales[index], ...data }
    return sucursales[index]
  }
  return undefined
}

// Ingresos
export function getIngresosBySucursal(sucursalId: string): IngresoRuta[] {
  if (!sucursalId) return []
  return ingresos.filter((i) => i.sucursalId === sucursalId)
}

export function addIngreso(ingreso: Omit<IngresoRuta, "id">): IngresoRuta {
  const newIngreso = {
    ...ingreso,
    id: Date.now().toString(),
  }
  ingresos.push(newIngreso)
  return newIngreso
}

export function updateIngreso(id: string, data: Partial<IngresoRuta>): IngresoRuta | undefined {
  const index = ingresos.findIndex((i) => i.id === id)
  if (index !== -1) {
    ingresos[index] = { ...ingresos[index], ...data }
    return ingresos[index]
  }
  return undefined
}

// Categorías de Gasto
export function getCategorias(): CategoriaGasto[] {
  return [...categoriasGasto]
}

export function addCategoria(categoria: Omit<CategoriaGasto, "id">): CategoriaGasto {
  const newCategoria = {
    ...categoria,
    id: Date.now().toString(),
  }
  categoriasGasto.push(newCategoria)
  return newCategoria
}

// Gastos
export function getGastosBySucursal(sucursalId: string): Gasto[] {
  if (!sucursalId) return []
  return gastos.filter((g) => g.sucursalId === sucursalId)
}

export function addGasto(gasto: Omit<Gasto, "id">): Gasto {
  const newGasto = {
    ...gasto,
    id: Date.now().toString(),
  }
  gastos.push(newGasto)
  return newGasto
}

export function updateGasto(id: string, data: Partial<Gasto>): Gasto | undefined {
  const index = gastos.findIndex((g) => g.id === id)
  if (index !== -1) {
    gastos[index] = { ...gastos[index], ...data }
    return gastos[index]
  }
  return undefined
}

// Resumen financiero
export function getResumenFinanciero(sucursalId: string, fechaInicio: Date, fechaFin: Date) {
  try {
    if (!sucursalId || !fechaInicio || !fechaFin) {
      return {
        ingresos: 0,
        gastos: 0,
        balance: 0,
        periodo: "Sin datos",
      }
    }

    const ingresosFiltered = ingresos.filter(
      (i) => i.sucursalId === sucursalId && i.fecha >= fechaInicio && i.fecha <= fechaFin,
    )

    const gastosFiltered = gastos.filter(
      (g) => g.sucursalId === sucursalId && g.fecha >= fechaInicio && g.fecha <= fechaFin,
    )

    const totalIngresos = ingresosFiltered.reduce((sum, i) => sum + (i.totalIngresos || 0), 0)
    const totalGastos = gastosFiltered.reduce((sum, g) => sum + (g.monto || 0), 0)

    return {
      ingresos: totalIngresos,
      gastos: totalGastos,
      balance: totalIngresos - totalGastos,
      periodo: `${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`,
    }
  } catch (error) {
    console.error("Error en getResumenFinanciero:", error)
    return {
      ingresos: 0,
      gastos: 0,
      balance: 0,
      periodo: "Error al calcular",
    }
  }
}
