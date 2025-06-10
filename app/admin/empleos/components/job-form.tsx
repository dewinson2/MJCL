"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Job } from "@/types/job"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJob, updateJob } from "../actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface JobFormProps {
  job?: Job
  isEditing?: boolean
}

export function JobForm({ job, isEditing = false }: JobFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData(e.currentTarget)

      let result
      if (isEditing && job) {
        result = await updateJob(job.id, formData)
      } else {
        result = await createJob(formData)
      }

      if (result.success) {
        setSuccess(isEditing ? "Empleo actualizado correctamente." : "Empleo creado correctamente.")

        // Esperar un momento antes de redirigir para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          router.push("/admin/empleos")
          router.refresh() // Forzar actualización de datos
        }, 1500)
      } else {
        setError(result.message || "Ha ocurrido un error al procesar el formulario.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título del Empleo</Label>
          <Input id="title" name="title" placeholder="Ej: Ingeniero Civil" defaultValue={job?.title || ""} required />
        </div>

        {isEditing && (
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" name="slug" placeholder="Ej: ingeniero-civil" defaultValue={job?.slug || ""} required />
            <p className="text-xs text-muted-foreground">
              Identificador único para la URL. Cámbialo solo si es necesario.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            name="location"
            placeholder="Ej: Ciudad Capital"
            defaultValue={job?.location || ""}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_type">Tipo de Empleo</Label>
          <Select name="job_type" defaultValue={job?.job_type || "Tiempo Completo"}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo de empleo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tiempo Completo">Tiempo Completo</SelectItem>
              <SelectItem value="Medio Tiempo">Medio Tiempo</SelectItem>
              <SelectItem value="Por Proyecto">Por Proyecto</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select name="category" defaultValue={job?.category || "construccion"}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="construccion">Construcción</SelectItem>
              <SelectItem value="seguridad">Seguridad</SelectItem>
              <SelectItem value="tecnologia">Tecnología</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 h-full">
          <Checkbox id="is_active" name="is_active" defaultChecked={job?.is_active !== false} />
          <Label htmlFor="is_active" className="font-normal">
            Publicar oferta (activa y visible en el sitio)
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción del Empleo</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe las responsabilidades y detalles del puesto..."
          className="min-h-[120px]"
          defaultValue={job?.description || ""}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="requirements">Requisitos</Label>
          <Textarea
            id="requirements"
            name="requirements"
            placeholder="Escribe cada requisito en una línea separada..."
            className="min-h-[150px]"
            defaultValue={job?.requirements?.join("\n") || ""}
            required
          />
          <p className="text-xs text-muted-foreground">Escribe cada requisito en una línea separada.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits">Beneficios</Label>
          <Textarea
            id="benefits"
            name="benefits"
            placeholder="Escribe cada beneficio en una línea separada..."
            className="min-h-[150px]"
            defaultValue={job?.benefits?.join("\n") || ""}
            required
          />
          <p className="text-xs text-muted-foreground">Escribe cada beneficio en una línea separada.</p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-empresa-primary hover:bg-empresa-dark" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Empleo" : "Crear Empleo"}
        </Button>
      </div>
    </form>
  )
}
