"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { ContactFormData } from "@/types/contact"

export async function getContactInfo() {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single()

    if (error) {
      console.error("Error fetching contact info:", error)
      return getDefaultContactInfo()
    }

    return data || getDefaultContactInfo()
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return getDefaultContactInfo()
  }
}

export async function updateContactInfo(formData: ContactFormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Obtener el ID del registro existente
    const { data: existingData } = await supabase.from("contact_info").select("id").limit(1).single()

    if (!existingData) {
      // Si no existe un registro, crear uno nuevo
      const { error: insertError } = await supabase.from("contact_info").insert(formData)

      if (insertError) {
        console.error("Error creating contact info:", insertError)
        return { success: false, message: "Error al crear la información de contacto" }
      }
    } else {
      // Si existe, actualizar el registro
      const { error: updateError } = await supabase
        .from("contact_info")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingData.id)

      if (updateError) {
        console.error("Error updating contact info:", updateError)
        return { success: false, message: "Error al actualizar la información de contacto" }
      }
    }

    revalidatePath("/admin/configuracion")
    revalidatePath("/")

    return { success: true, message: "Información de contacto actualizada correctamente" }
  } catch (error) {
    console.error("Error updating contact info:", error)
    return { success: false, message: "Error al actualizar la información de contacto" }
  }
}

// Datos de contacto predeterminados
function getDefaultContactInfo() {
  return {
    id: 1,
    phone1: "+123 456 7890",
    phone2: "+123 456 7891",
    email1: "info@mjclservicios.com",
    email2: "ventas@mjclservicios.com",
    address_line1: "Av. Principal #123",
    address_line2: "Ciudad Capital",
    facebook_url: "https://facebook.com/mjclservicios",
    twitter_url: "https://twitter.com/mjclservicios",
    instagram_url: "https://instagram.com/mjclservicios",
    linkedin_url: "https://linkedin.com/company/mjclservicios",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
