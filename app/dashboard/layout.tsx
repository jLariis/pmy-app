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
      <div className="md:w-320 md:flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="flex-1 p-4 md:p-6 bg-white">{children}</main>
      </div>
    </div>
  )
}

