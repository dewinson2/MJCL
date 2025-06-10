"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

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

// Datos de contacto predeterminados
function getDefaultContactInfo() {
  return {
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
  }
}
