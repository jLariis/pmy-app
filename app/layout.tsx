import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import "leaflet/dist/leaflet.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Del Yaqui - Sistema de Paquetería",
  description: "Sistema de gestión para empresa de paquetería Del Yaqui",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-white`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
