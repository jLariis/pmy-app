"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar className={sidebarOpen ? "" : "-translate-x-full"} />

      <div className={`transition-all duration-300 ${sidebarOpen ? "pl-64" : "pl-0"}`}>
        <div className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-brand-brown">
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">{sidebarOpen ? "Close sidebar" : "Open sidebar"}</span>
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex-1" />
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
