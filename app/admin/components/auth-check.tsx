"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthCheck() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar autenticación en localStorage
        const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"

        // Verificar autenticación en cookies como respaldo
        const hasCookie = document.cookie.split(";").some((item) => item.trim().startsWith("adminAuthenticated="))

        if (!isAuthenticated && !hasCookie) {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/admin/login")
      } finally {
        setIsChecking(false)
      }
    }

    // Verificar inmediatamente
    checkAuth()

    // Configurar un intervalo para verificar periódicamente
    const interval = setInterval(checkAuth, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [router])

  // Mientras se verifica, no renderizar nada
  if (isChecking) {
    return null
  }

  // Si llegamos aquí, la autenticación es válida
  return null
}
