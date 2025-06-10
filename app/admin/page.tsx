import Link from "next/link"
import { getJobs } from "./empleos/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Eye, Settings, PlusCircle } from 'lucide-react'
import { AdminHeader } from "./components/admin-header"
import { AuthProvider } from "./components/auth-provider"

export default async function AdminDashboardPage() {
  // Obtener empleos con manejo de errores
  let jobs = []
  try {
    jobs = (await getJobs()) || []
  } catch (error) {
    console.error("Error loading jobs:", error)
    // Continuar con un array vacío
  }

  // Calcular empleos activos con manejo de errores
  let activeJobs = 0
  try {
    activeJobs = jobs.filter((job) => job.is_active).length
  } catch (error) {
    console.error("Error calculating active jobs:", error)
    // Continuar con 0 empleos activos
  }

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <main className="flex-1 container py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-empresa-primary mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Bienvenido al panel de administración de Corporación MJCL.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Empleos</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.length}</div>
                <p className="text-xs text-muted-foreground">
                  {activeJobs} activos, {jobs.length - activeJobs} inactivos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Módulo no implementado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Visitas</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Módulo no implementado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Configuración</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Módulo no implementado</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Empleos Recientes</CardTitle>
                <CardDescription>Últimas ofertas de empleo publicadas.</CardDescription>
              </CardHeader>
              <CardContent>
                {jobs.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No hay ofertas de empleo disponibles.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-muted-foreground">{job.location}</div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${job.is_active ? "bg-green-500" : "bg-gray-300"}`}
                          ></div>
                          <span className="text-sm text-muted-foreground">{job.is_active ? "Activo" : "Inactivo"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/empleos">Ver todos los empleos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Acciones comunes para gestionar el sitio.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild className="w-full bg-empresa-primary hover:bg-empresa-dark">
                    <Link href="/admin/empleos/nuevo" className="flex items-center justify-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crear Nueva Oferta de Empleo
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/" target="_blank" className="flex items-center justify-center">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Sitio Web
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
