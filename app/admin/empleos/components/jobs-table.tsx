"use client"

import { useState } from "react"
import Link from "next/link"
import type { Job } from "@/types/job"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, AlertCircle } from "lucide-react"
import { deleteJob } from "../actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface JobsTableProps {
  jobs: Job[]
}

export function JobsTable({ jobs }: JobsTableProps) {
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!jobToDelete) return

    setIsDeleting(true)
    const result = await deleteJob(jobToDelete.id)
    setIsDeleting(false)

    if (result.success) {
      toast({
        title: "Empleo eliminado",
        description: `El empleo "${jobToDelete.title}" ha sido eliminado correctamente.`,
      })
      // Recargar la página para reflejar los cambios
      window.location.reload()
    } else {
      toast({
        title: "Error al eliminar",
        description: result.message || "Ha ocurrido un error al eliminar el empleo.",
        variant: "destructive",
      })
    }

    setJobToDelete(null)
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, { label: string; className: string }> = {
      construccion: { label: "Construcción", className: "bg-orange-100 text-orange-800" },
      seguridad: { label: "Seguridad", className: "bg-blue-100 text-blue-800" },
      tecnologia: { label: "Tecnología", className: "bg-purple-100 text-purple-800" },
    }

    return categories[category] || { label: category, className: "bg-gray-100 text-gray-800" }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-empresa-light">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-empresa-primary uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-empresa-primary uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-empresa-primary uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-empresa-primary uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-empresa-primary uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-empresa-primary uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p>No hay ofertas de empleo disponibles.</p>
                    <p className="text-sm">Crea una nueva oferta para comenzar.</p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const category = getCategoryLabel(job.category)
                return (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-empresa-primary">{job.title}</div>
                      <div className="text-xs text-muted-foreground">ID: {job.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.job_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={category.className}>{category.label}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={job.is_active ? "default" : "outline"}
                        className={job.is_active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {job.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/empleos/aplicar/${job.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/empleos/editar/${job.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setJobToDelete(job)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la oferta de empleo &quot;{jobToDelete?.title}&quot;. Esta acción no
              se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
