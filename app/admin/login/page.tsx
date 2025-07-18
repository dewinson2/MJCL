"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Este es el código de acceso - en una aplicación real debería estar en una variable de entorno
const ACCESS_CODE = "Mjcl1820"

export default function AdminLoginPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Verificar el código
      if (code === ACCESS_CODE) {
        // Guardar en localStorage que el usuario está autenticado
        localStorage.setItem("adminAuth", "true")
        // Redirigir al dashboard
        router.push("/admin")
      } else {
        setError("Código incorrecto. Por favor, inténtelo de nuevo.")
      }
    } catch (error) {
      console.error("Error en login:", error)
      setError("Ha ocurrido un error. Por favor, inténtelo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-empresa-accent" />
          </div>
          <CardTitle className="text-2xl font-bold">MJCL ADMIN</CardTitle>
          <CardDescription>Ingrese el código de acceso para continuar</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Input
                id="code"
                type="password"
                placeholder="Código de acceso"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-empresa-primary hover:bg-empresa-dark" disabled={isLoading}>
              {isLoading ? "Verificando..." : "Acceder"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
