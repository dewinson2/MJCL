import { createClient } from "@supabase/supabase-js"

// Crear cliente para el servidor
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    // En lugar de lanzar un error, devolvemos un cliente simulado
    console.warn("Variables de entorno de Supabase no disponibles. Usando cliente simulado.")
    return createMockSupabaseClient()
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Crear cliente para el cliente (navegador)
export const createBrowserSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // En lugar de lanzar un error, devolvemos un cliente simulado
    console.warn("Variables de entorno de Supabase no disponibles. Usando cliente simulado.")
    return createMockSupabaseClient()
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Cliente simulado para cuando no hay variables de entorno
function createMockSupabaseClient() {
  // Datos de ejemplo para usar cuando no hay conexión a Supabase
  const mockData = {
    contact_info: [
      {
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
      },
    ],
    jobs: [
      {
        id: 1,
        title: "Técnico de Seguridad",
        slug: "tecnico-de-seguridad",
        description: "Responsable de la instalación y mantenimiento de sistemas de seguridad.",
        location: "Ciudad Capital",
        category: "Seguridad",
        job_type: "Tiempo Completo",
        requirements: ["Experiencia en sistemas de seguridad", "Licencia de conducir"],
        benefits: ["Seguro médico", "Bonificaciones"],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Ingeniero de Telecomunicaciones",
        slug: "ingeniero-de-telecomunicaciones",
        description: "Responsable del diseño e implementación de redes de telecomunicaciones.",
        location: "Ciudad Capital",
        category: "Telecomunicaciones",
        job_type: "Tiempo Completo",
        requirements: ["Ingeniería en Telecomunicaciones", "3 años de experiencia"],
        benefits: ["Seguro médico", "Bonificaciones", "Desarrollo profesional"],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  }

  // Devolvemos un objeto que simula la API de Supabase
  return {
    from: (table) => ({
      select: (columns = "*") => ({
        eq: (column, value) => ({
          single: () => {
            const result = mockData[table]?.find((item) => item[column] === value) || null
            return Promise.resolve({ data: result, error: null })
          },
          limit: (limit) => ({
            order: (column, { ascending }) => {
              let results = [...(mockData[table] || [])]
              if (results.length > 0) {
                results = results.filter((item) => item[column] === value)
                results = results.sort((a, b) => {
                  return ascending ? a[column] - b[column] : b[column] - a[column]
                })
                results = results.slice(0, limit)
              }
              return Promise.resolve({ data: results, error: null })
            },
          }),
        }),
        order: (column, { ascending = true } = {}) => ({
          limit: (limit) => {
            let results = [...(mockData[table] || [])]
            if (results.length > 0) {
              results = results.sort((a, b) => {
                return ascending ? a[column] - b[column] : b[column] - a[column]
              })
              results = results.slice(0, limit)
            }
            return Promise.resolve({ data: results, error: null })
          },
          single: () => {
            let results = [...(mockData[table] || [])]
            if (results.length > 0) {
              results = results.sort((a, b) => {
                return ascending ? a[column] - b[column] : b[column] - a[column]
              })
              return Promise.resolve({ data: results[0], error: null })
            }
            return Promise.resolve({ data: null, error: null })
          },
        }),
        limit: (limit) => ({
          single: () => {
            const result = mockData[table]?.[0] || null
            return Promise.resolve({ data: result, error: null })
          },
        }),
        single: () => {
          const result = mockData[table]?.[0] || null
          return Promise.resolve({ data: result, error: null })
        },
      }),
      insert: (data) => {
        console.log("Mock insert:", data)
        return Promise.resolve({ data: null, error: null })
      },
      update: (data) => ({
        eq: (column, value) => {
          console.log("Mock update:", data)
          return Promise.resolve({ data: null, error: null })
        },
      }),
      delete: () => ({
        eq: (column, value) => {
          console.log("Mock delete:", column, value)
          return Promise.resolve({ data: null, error: null })
        },
      }),
    }),
  }
}
