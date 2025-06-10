"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    try {
      // Eliminar la autenticación
      localStorage.removeItem("adminAuth")

      // Redirigir al login
      router.push("/admin/login")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
      <LogOut className="h-4 w-4" />
      Cerrar Sesión
    </Button>
  )
}
