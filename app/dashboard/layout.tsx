import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      <div className="md:w-64 md:flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        {/*<header className="sticky top-0 z-40 border-b bg-white">
          <div className="flex h-16 items-center px-4 md:px-6">
            <h2 className="text-lg font-semibold text-brand-brown">Dashboard</h2>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>*/}
        <main className="flex-1 p-4 md:p-6 bg-white">{children}</main>
      </div>
    </div>
  )
}

