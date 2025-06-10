"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const auth = localStorage.getItem("adminAuth") === "true"
    setIsAuthenticated(auth)

    // Si no está autenticado y no está en la página de login, redirigir
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Mostrar un loader mientras se verifica la autenticación
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-empresa-primary" />
      </div>
    )
  }

  // Si está en la página de login y ya está autenticado, redirigir al dashboard
  if (isAuthenticated && pathname === "/admin/login") {
    router.push("/admin")
    return null
  }

  // Si no está autenticado y no está en la página de login, no mostrar nada
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  // En cualquier otro caso, mostrar los children
  return <>{children}</>
}
