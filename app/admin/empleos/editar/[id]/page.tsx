import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { JobForm } from "../../components/job-form"
import { getJobById } from "../../actions"
import { AdminHeader } from "../../../components/admin-header"

interface EditJobPageProps {
  params: {
    id: string
  }
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const jobId = Number.parseInt(params.id)

  if (isNaN(jobId)) {
    notFound()
  }

  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

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

          <h1 className="text-3xl font-bold text-empresa-primary mb-2">Editar Oferta de Empleo</h1>
          <p className="text-muted-foreground">Actualiza la información de la oferta de empleo.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <JobForm job={job} isEditing={true} />
        </div>
      </main>
    </div>
  )
}
