import Link from "next/link"
import { getJobs } from "./actions"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { JobsTable } from "./components/jobs-table"
import { AdminHeader } from "../components/admin-header"
import { AuthProvider } from "../components/auth-provider"

export default async function AdminEmpleosPage() {
  // Obtener empleos con manejo de errores
  let jobs = []
  try {
    jobs = (await getJobs()) || []
  } catch (error) {
    console.error("Error loading jobs:", error)
    // Continuar con un array vacío
  }

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <main className="flex-1 container py-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-empresa-primary mb-2">Administración de Empleos</h1>
              <p className="text-muted-foreground">Gestiona las ofertas de empleo que aparecen en el sitio web.</p>
            </div>
            <Button asChild className="bg-empresa-primary hover:bg-empresa-dark">
              <Link href="/admin/empleos/nuevo" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Empleo
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <JobsTable jobs={jobs} />
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
