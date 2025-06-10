"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase"

// Función para convertir un string a slug
const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

// Función para generar un slug único
async function generateUniqueSlug(title: string, currentId?: number) {
  const supabase = createServerSupabaseClient()
  let slug = slugify(title)
  let isUnique = false
  let counter = 0
  const maxAttempts = 10

  // Verificar si el slug ya existe
  while (!isUnique && counter < maxAttempts) {
    const currentSlug = counter === 0 ? slug : `${slug}-${counter}`

    try {
      let query = supabase.from("jobs").select("id").eq("slug", currentSlug)

      // Si estamos actualizando un trabajo existente, excluir su propio ID
      if (currentId) {
        query = query.neq("id", currentId)
      }

      const { data, error } = await query.single()

      if (error || !data) {
        // El slug no existe o pertenece al trabajo actual, es único
        isUnique = true
        slug = currentSlug
      } else {
        // El slug ya existe, incrementar contador
        counter++
      }
    } catch (error) {
      console.error("Error checking slug uniqueness:", error)
      // En caso de error, añadir un timestamp para garantizar unicidad
      return `${slug}-${Date.now()}`
    }
  }

  // Si después de varios intentos no encontramos un slug único, añadir timestamp
  if (!isUnique) {
    slug = `${slug}-${Date.now()}`
  }

  return slug
}

// Obtener todos los trabajos
export async function getJobs() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Unexpected error in getJobs:", error)
    return []
  }
}

// Obtener un trabajo por ID
export async function getJobById(id: number) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching job by ID:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error in getJobById:", error)
    return null
  }
}

// Crear un nuevo trabajo
export async function createJob(formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Extraer datos del formulario
    const title = formData.get("title") as string
    const location = formData.get("location") as string
    const job_type = formData.get("job_type") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const is_active = formData.get("is_active") === "on"

    // Validar datos requeridos
    if (!title || !location || !job_type || !description || !category) {
      return { success: false, message: "Todos los campos requeridos deben ser completados." }
    }

    // Procesar arrays
    const requirementsStr = formData.get("requirements") as string
    const benefitsStr = formData.get("benefits") as string

    const requirements = requirementsStr.split("\n").filter((item) => item.trim() !== "")
    const benefits = benefitsStr.split("\n").filter((item) => item.trim() !== "")

    // Generar slug único
    const slug = await generateUniqueSlug(title)

    // Crear el trabajo
    const { error } = await supabase.from("jobs").insert({
      title,
      location,
      job_type,
      description,
      requirements,
      benefits,
      category,
      is_active,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error creating job:", error)
      return { success: false, message: error.message }
    }

    // Revalidar rutas
    revalidatePath("/admin/empleos")
    revalidatePath("/empleos")

    return { success: true }
  } catch (error) {
    console.error("Unexpected error in createJob:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido al crear el empleo",
    }
  }
}

// Actualizar un trabajo existente
export async function updateJob(id: number, formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Extraer datos del formulario
    const title = formData.get("title") as string
    const location = formData.get("location") as string
    const job_type = formData.get("job_type") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const is_active = formData.get("is_active") === "on"
    let slug = formData.get("slug") as string

    // Validar datos requeridos
    if (!title || !location || !job_type || !description || !category || !slug) {
      return { success: false, message: "Todos los campos requeridos deben ser completados." }
    }

    // Procesar arrays
    const requirementsStr = formData.get("requirements") as string
    const benefitsStr = formData.get("benefits") as string

    const requirements = requirementsStr.split("\n").filter((item) => item.trim() !== "")
    const benefits = benefitsStr.split("\n").filter((item) => item.trim() !== "")

    // Verificar si el slug ha cambiado
    const { data: existingJob } = await supabase.from("jobs").select("slug").eq("id", id).single()

    // Si el slug ha cambiado, verificar que el nuevo slug sea único
    if (existingJob && existingJob.slug !== slug) {
      // Verificar si el nuevo slug ya existe
      const { data: slugExists } = await supabase.from("jobs").select("id").eq("slug", slug).neq("id", id).single()

      if (slugExists) {
        // El slug ya existe, generar uno nuevo
        slug = await generateUniqueSlug(title, id)
      }
    }

    // Actualizar el trabajo
    const { error } = await supabase
      .from("jobs")
      .update({
        title,
        location,
        job_type,
        description,
        requirements,
        benefits,
        category,
        is_active,
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating job:", error)
      return { success: false, message: error.message }
    }

    // Revalidar rutas
    revalidatePath("/admin/empleos")
    revalidatePath("/empleos")
    revalidatePath(`/empleos/${slug}`)

    return { success: true }
  } catch (error) {
    console.error("Unexpected error in updateJob:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido al actualizar el empleo",
    }
  }
}

// Eliminar un trabajo
export async function deleteJob(id: number) {
  try {
    const supabase = createServerSupabaseClient()

    // Obtener el slug antes de eliminar para revalidar la ruta
    const { data: job } = await supabase.from("jobs").select("slug").eq("id", id).single()

    // Eliminar el trabajo
    const { error } = await supabase.from("jobs").delete().eq("id", id)

    if (error) {
      console.error("Error deleting job:", error)
      return { success: false, message: error.message }
    }

    // Revalidar rutas
    revalidatePath("/admin/empleos")
    revalidatePath("/empleos")
    if (job?.slug) {
      revalidatePath(`/empleos/${job.slug}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error in deleteJob:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido al eliminar el empleo",
    }
  }
}
