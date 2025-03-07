import type React from "react";
import { AppSidebar, MobileSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Importa el SidebarProvider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider> {/* Envuelve todo con SidebarProvider */}
      <div className="relative flex min-h-screen flex-col md:flex-row">
        {/* Sidebar para móviles (ícono de hamburguesa) */}
        <div className="md:hidden fixed top-0 right-0 z-50 p-2">
          <MobileSidebar />
        </div>

        {/* Sidebar para desktop (oculto en móviles) */}
        <div className="hidden md:block md:w-320 md:flex-shrink-0">
          <AppSidebar />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto">
          <main className="flex-1 p-4 md:p-6 bg-white">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}