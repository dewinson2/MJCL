import { AdminHeader } from "../components/admin-header"
import { getContactInfo } from "./actions"
import { ContactForm } from "./components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ConfiguracionPage() {
  const contactInfo = await getContactInfo()

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-empresa-primary mb-2">Configuración</h1>
          <p className="text-muted-foreground">Gestiona la configuración de tu sitio web.</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Actualiza la información de contacto que se muestra en el sitio web.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm initialData={contactInfo} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
