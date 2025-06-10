import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { JobForm } from "../components/job-form"
import { AdminHeader } from "../../components/admin-header"

export default function NewJobPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/admin/empleos" className="flex items-center text-muted-foreground">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Volver a Empleos
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-empresa-primary mb-2">Crear Nueva Oferta de Empleo</h1>
          <p className="text-muted-foreground">Completa el formulario para crear una nueva oferta de empleo.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <JobForm />
        </div>
      </main>
    </div>
  )
}
