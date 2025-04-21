import type React from "react"
import { Sidebar, MobileSidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:z-20 md:h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-[20rem]">
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-white px-4">
          <div className="md:hidden">
            <MobileSidebar />
          </div>
          <h2 className="text-lg font-semibold text-brand-brown">Dashboard</h2>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-white">{children}</main>
      </div>
    </div>
  )
}
