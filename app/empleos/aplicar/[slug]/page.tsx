import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  CheckSquare,
  Check,
  UserPlus,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MobileMenu } from "@/components/mobile-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { createServerSupabaseClient } from "@/lib/supabase"

// Datos de ejemplo para usar cuando no hay conexión a Supabase
const fallbackJobs = {
  "ingeniero-civil": {
    id: 1,
    title: "Ingeniero Civil",
    location: "Ciudad Capital",
    job_type: "Tiempo Completo",
    description:
      "Buscamos un Ingeniero Civil con experiencia en proyectos de construcción residencial y comercial. Será responsable de supervisar proyectos, coordinar con contratistas y asegurar el cumplimiento de estándares de calidad.",
    requirements: [
      "Título en Ingeniería Civil",
      "Mínimo 3 años de experiencia en proyectos de construcción",
      "Conocimiento de normativas de construcción",
      "Habilidades de liderazgo y trabajo en equipo",
    ],
    benefits: ["Seguro médico", "Bonos por desempeño", "Horarios flexibles", "Oportunidades de crecimiento"],
    category: "construccion",
    is_active: true,
    slug: "ingeniero-civil",
  },
  "tecnico-seguridad": {
    id: 2,
    title: "Técnico en Seguridad",
    location: "Zona Norte",
    job_type: "Tiempo Completo",
    description:
      "Buscamos un Técnico en Seguridad para instalar y mantener sistemas de vigilancia y cámaras de seguridad. Trabajará en proyectos para clientes corporativos y gubernamentales.",
    requirements: [
      "Formación técnica en electrónica o seguridad",
      "Experiencia en instalación de sistemas CCTV",
      "Conocimientos básicos de redes",
      "Disponibilidad para trabajar en diferentes ubicaciones",
    ],
    benefits: ["Seguro médico", "Bonos por desempeño", "Horarios flexibles", "Oportunidades de crecimiento"],
    category: "seguridad",
    is_active: true,
    slug: "tecnico-seguridad",
  },
  "especialista-telecomunicaciones": {
    id: 3,
    title: "Especialista en Telecomunicaciones",
    location: "Ciudad Capital",
    job_type: "Medio Tiempo",
    description:
      "Buscamos un Especialista en Telecomunicaciones para diseñar e implementar soluciones de comunicación para nuestros clientes. Trabajará con tecnologías de punta en el sector.",
    requirements: [
      "Ingeniería en Telecomunicaciones o similar",
      "Experiencia en implementación de redes",
      "Conocimiento de protocolos de comunicación",
      "Certificaciones en tecnologías de telecomunicaciones (deseable)",
    ],
    benefits: ["Seguro médico", "Bonos por desempeño", "Horarios flexibles", "Oportunidades de crecimiento"],
    category: "tecnologia",
    is_active: true,
    slug: "especialista-telecomunicaciones",
  },
}

interface JobPageProps {
  params: {
    slug: string
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = params
  let job

  try {
    const supabase = createServerSupabaseClient()

    // Obtener el trabajo por slug
    const { data, error } = await supabase.from("jobs").select("*").eq("slug", slug).eq("is_active", true).single()

    if (error || !data) {
      // Si hay un error o no hay datos, verificar si existe en los datos de respaldo
      job = fallbackJobs[slug as keyof typeof fallbackJobs]
      if (!job) {
        notFound()
      }
    } else {
      job = data
    }
  } catch (error) {
    console.error("Error connecting to Supabase:", error)
    // Verificar si existe en los datos de respaldo
    job = fallbackJobs[slug as keyof typeof fallbackJobs]
    if (!job) {
      notFound()
    }
  }

  const navItems = [
    { href: "/#servicios", label: "Servicios" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/empleos", label: "Empleos" },
    { href: "/#contacto", label: "Contacto" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-empresa-primary">
            <Image src="/logo-mjcl.png" alt="MJCL Logo" width={40} height={40} className="h-10 w-auto" />
            <span>Corporación MJCL</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-empresa-secondary relative group ${
                  item.href === "/empleos" ? "text-empresa-secondary" : ""
                }`}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-empresa-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-empresa-primary hover:bg-empresa-dark text-white hidden md:flex" asChild>
              <Link href="/#contacto">Contáctanos</Link>
            </Button>
            <MobileMenu items={navItems} />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
          <ScrollReveal>
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="mr-4 text-empresa-primary hover:text-empresa-secondary hover:bg-empresa-light group"
              >
                <Link href="/empleos">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Volver a Empleos
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <ScrollReveal>
              <Card className="card-3d bg-white overflow-hidden">
                <CardHeader className="bg-empresa-light rounded-t-lg border-b border-empresa-primary/10">
                  <CardTitle className="text-empresa-primary">{job.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-col space-y-2 mt-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-empresa-secondary" />
                        <span className="font-medium text-empresa-primary">Ubicación:</span>
                        <span className="ml-2">{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-empresa-secondary" />
                        <span className="font-medium text-empresa-primary">Tipo:</span>
                        <span className="ml-2">{job.job_type}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4 space-y-6">
                  <div>
                    <h4 className="font-medium mb-2 text-empresa-primary flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-empresa-secondary" />
                      Descripción:
                    </h4>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-empresa-primary flex items-center">
                      <CheckSquare className="h-4 w-4 mr-2 text-empresa-secondary" />
                      Requisitos:
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 bg-empresa-accent/20 p-1 rounded-full">
                            <Check className="h-3 w-3 text-empresa-accent" />
                          </div>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-empresa-primary/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-empresa-primary">Beneficios:</h4>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 bg-empresa-secondary/20 p-1 rounded-full">
                            <Check className="h-3 w-3 text-empresa-secondary" />
                          </div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Card className="card-3d bg-white overflow-hidden">
                <CardHeader className="bg-empresa-primary text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Aplicar para {job.title}
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Complete el formulario a continuación para aplicar a esta posición.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-empresa-primary">
                          Nombre Completo
                        </Label>
                        <Input
                          id="nombre"
                          placeholder="Ingrese su nombre completo"
                          className="focus-visible:ring-empresa-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-empresa-primary">
                          Correo Electrónico
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          className="focus-visible:ring-empresa-secondary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="telefono" className="text-empresa-primary">
                          Teléfono
                        </Label>
                        <Input
                          id="telefono"
                          placeholder="Ingrese su número de teléfono"
                          className="focus-visible:ring-empresa-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ubicacion" className="text-empresa-primary">
                          Ubicación
                        </Label>
                        <Input
                          id="ubicacion"
                          placeholder="Ciudad, País"
                          className="focus-visible:ring-empresa-secondary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experiencia" className="text-empresa-primary">
                        Experiencia Relevante
                      </Label>
                      <Textarea
                        id="experiencia"
                        placeholder="Describa brevemente su experiencia relevante para este puesto"
                        className="min-h-[100px] focus-visible:ring-empresa-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cv" className="text-empresa-primary">
                        Currículum Vitae
                      </Label>
                      <div className="border-2 border-dashed border-empresa-primary/20 rounded-lg p-6 text-center hover:bg-empresa-primary/5 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-empresa-primary/50 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Arrastre y suelte su CV aquí o haga clic para seleccionar un archivo
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Formatos aceptados: PDF, DOC, DOCX (máx. 5MB)
                        </p>
                        <Input id="cv" type="file" className="hidden" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mensaje" className="text-empresa-primary">
                        Mensaje Adicional
                      </Label>
                      <Textarea
                        id="mensaje"
                        placeholder="¿Por qué está interesado en este puesto? ¿Qué puede aportar a nuestra empresa?"
                        className="min-h-[100px] focus-visible:ring-empresa-secondary"
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Acepto los términos y condiciones
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Al enviar este formulario, acepto que mis datos sean procesados de acuerdo con la política de
                          privacidad.
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-empresa-light/30 pt-6">
                  <Button
                    variant="outline"
                    asChild
                    className="border-empresa-primary text-empresa-primary hover:bg-empresa-light"
                  >
                    <Link href="/empleos">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="bg-empresa-primary hover:bg-empresa-dark text-white group">
                    Enviar Aplicación
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-12 bg-empresa-dark text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 font-bold text-white">
                <Image src="/logo-mjcl.png" alt="MJCL Logo" width={32} height={32} className="h-8 w-auto" />
                <span>Corporación MJCL</span>
              </Link>
              <p className="text-white/70 text-sm">
                Ofrecemos servicios múltiples dirigidos a compañías públicas y privadas, con el compromiso de mejorar la
                calidad de vida de las personas.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label={`Visita nuestro perfil de ${social}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Servicios</h3>
              <ul className="space-y-2">
                {[
                  "Construcción",
                  "Telecomunicaciones",
                  "Sistemas de Seguridad",
                  "Seguridad e Inteligencia",
                  "Servicios Corporativos",
                ].map((service, i) => (
                  <li key={i}>
                    <Link href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                {[
                  { label: "Inicio", href: "/" },
                  { label: "Servicios", href: "/#servicios" },
                  { label: "Nosotros", href: "/#nosotros" },
                  { label: "Empleos", href: "/empleos" },
                  { label: "Contacto", href: "/#contacto" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/70 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-empresa-accent" />
                  Av. Principal #123, Ciudad Capital
                </li>
                <li className="flex items-center text-white/70 text-sm">
                  <Phone className="h-4 w-4 mr-2 text-empresa-accent" />
                  +123 456 7890
                </li>
                <li className="flex items-center text-white/70 text-sm">
                  <Mail className="h-4 w-4 mr-2 text-empresa-accent" />
                  info@corporacionmjcl.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70">© 2025 Corporación MJCL. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
