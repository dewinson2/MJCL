"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, Briefcase, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/empleos", label: "Empleos", icon: Briefcase },
    { href: "/admin/usuarios", label: "Usuarios", icon: Users },
    { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  ]

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 font-bold text-empresa-primary mr-8">
            <Image src="/logo-mjcl.png" alt="MJCL Servicios Logo" width={32} height={32} className="h-8 w-auto" />
            <span>MJCL ADMIN</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-empresa-primary" : "text-muted-foreground hover:text-empresa-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/" target="_blank">
              Ver Sitio
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 bg-white">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 py-3 px-4 rounded-md ${
                    isActive(item.href)
                      ? "bg-empresa-light text-empresa-primary"
                      : "text-muted-foreground hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-2 py-3 px-4 mt-2 rounded-md border text-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ver Sitio
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
