import Link from "next/link"
import Image from "next/image"
import { MapPin, ChevronRight, Check, Construction, Shield, Headphones, Phone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionTitle } from "@/components/section-title"
import { DecorativeDots } from "@/components/decorative-dots"
import { MobileMenu } from "@/components/mobile-menu"
import { createServerSupabaseClient } from "@/lib/supabase"

// Datos de ejemplo para usar cuando no hay conexión a Supabase
const fallbackJobs = [
  {
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
  {
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
  {
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
]

export default async function EmpleosPage() {
  let jobs = []

  try {
    const supabase = createServerSupabaseClient()

    // Obtener todos los trabajos activos
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      jobs = fallbackJobs
    } else {
      jobs = data || fallbackJobs
    }
  } catch (error) {
    console.error("Error connecting to Supabase:", error)
    jobs = fallbackJobs
  }

  // Agrupar trabajos por categoría
  const jobsByCategory: Record<string, any[]> = {
    todos: jobs,
    construccion: jobs.filter((job) => job.category === "construccion"),
    seguridad: jobs.filter((job) => job.category === "seguridad"),
    tecnologia: jobs.filter((job) => job.category === "tecnologia"),
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
            <Image src="/logo-mjcl.png" alt="MJCL Servicios Logo" width={40} height={40} className="h-10 w-auto" />
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
        <section className="w-full py-12 md:py-24 lg:py-32 gradient-animation text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            ></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4 animate-fade-in max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-shadow">
                  Oportunidades Laborales
                </h1>
                <p className="mx-auto max-w-[700px] text-white/90 md:text-xl lg:text-2xl">
                  Únete a nuestro equipo y sé parte de proyectos que mejoran la calidad de vida de las personas.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Button
                  className="bg-empresa-accent hover:bg-empresa-accent/90 text-black font-bold px-6 py-6 text-lg depth-shadow"
                  asChild
                >
                  <a href="#vacantes" className="group">
                    Ver Vacantes
                    <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white/20 px-6 py-6 text-lg"
                  asChild
                >
                  <Link href="/#contacto">Contáctanos</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <DecorativeDots className="top-10 right-10" />
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <SectionTitle
                  title="¿Por qué trabajar con nosotros?"
                  subtitle="Ofrecemos un ambiente de trabajo dinámico y oportunidades de crecimiento profesional."
                />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={100}>
                <Card className="card-3d bg-white border-empresa-primary/10 overflow-hidden">
                  <div className="h-2 bg-empresa-primary"></div>
                  <CardHeader>
                    <CardTitle className="text-empresa-primary flex items-center">
                      <div className="bg-empresa-primary/10 p-2 rounded-full mr-3">
                        <svg
                          className="h-5 w-5 text-empresa-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      Desarrollo Profesional
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ofrecemos capacitación continua y oportunidades de crecimiento dentro de la empresa. Valoramos el
                      talento y promovemos el desarrollo de habilidades.
                    </p>
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {["Programas de capacitación", "Plan de carrera", "Certificaciones"].map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-empresa-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Card className="card-3d bg-white border-empresa-primary/10 overflow-hidden">
                  <div className="h-2 bg-empresa-secondary"></div>
                  <CardHeader>
                    <CardTitle className="text-empresa-primary flex items-center">
                      <div className="bg-empresa-primary/10 p-2 rounded-full mr-3">
                        <svg
                          className="h-5 w-5 text-empresa-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      Ambiente Laboral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Fomentamos un ambiente de trabajo colaborativo y respetuoso, donde cada miembro del equipo es
                      valorado por sus contribuciones.
                    </p>
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {["Trabajo en equipo", "Comunicación abierta", "Eventos de integración"].map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-empresa-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <Card className="card-3d bg-white border-empresa-primary/10 overflow-hidden">
                  <div className="h-2 bg-empresa-accent"></div>
                  <CardHeader>
                    <CardTitle className="text-empresa-primary flex items-center">
                      <div className="bg-empresa-primary/10 p-2 rounded-full mr-3">
                        <svg
                          className="h-5 w-5 text-empresa-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8v1"
                          />
                        </svg>
                      </div>
                      Beneficios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ofrecemos beneficios competitivos, incluyendo seguro médico, bonos por desempeño y horarios
                      flexibles para mantener un equilibrio entre la vida laboral y personal.
                    </p>
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {["Seguro médico", "Bonos por desempeño", "Horarios flexibles"].map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-empresa-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="vacantes" className="w-full py-12 md:py-24 lg:py-32 bg-empresa-light relative">
          <DecorativeDots className="bottom-10 left-10" />
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <SectionTitle
                  title="Vacantes Disponibles"
                  subtitle="Explora nuestras oportunidades laborales actuales y encuentra la que mejor se adapte a tu perfil."
                />
              </div>
            </ScrollReveal>

            <Tabs defaultValue="todos" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-empresa-light">
                <TabsTrigger
                  value="todos"
                  className="data-[state=active]:bg-empresa-primary data-[state=active]:text-white"
                >
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="construccion"
                  className="data-[state=active]:bg-empresa-primary data-[state=active]:text-white"
                >
                  Construcción
                </TabsTrigger>
                <TabsTrigger
                  value="seguridad"
                  className="data-[state=active]:bg-empresa-primary data-[state=active]:text-white"
                >
                  Seguridad
                </TabsTrigger>
                <TabsTrigger
                  value="tecnologia"
                  className="data-[state=active]:bg-empresa-primary data-[state=active]:text-white"
                >
                  Tecnología
                </TabsTrigger>
              </TabsList>

              {/* Contenido para "Todos" */}
              <TabsContent value="todos" className="mt-6 space-y-6">
                {jobsByCategory.todos.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-muted-foreground">No hay vacantes disponibles en este momento.</p>
                  </div>
                ) : (
                  jobsByCategory.todos.map((job, index) => (
                    <ScrollReveal key={job.id} delay={index * 100}>
                      <Card className="hover-lift bg-white overflow-hidden">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-empresa-primary flex items-center">
                                <div className="mr-2 bg-empresa-primary/10 p-1 rounded-full">
                                  {job.category === "construccion" ? (
                                    <Construction className="h-4 w-4 text-empresa-primary" />
                                  ) : job.category === "seguridad" ? (
                                    <Shield className="h-4 w-4 text-empresa-primary" />
                                  ) : (
                                    <Headphones className="h-4 w-4 text-empresa-primary" />
                                  )}
                                </div>
                                {job.title}
                              </CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1 text-empresa-secondary" /> {job.location}
                              </CardDescription>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {job.job_type}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-empresa-primary">Descripción:</h4>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-empresa-primary">Requisitos:</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {job.requirements.map((req: string, i: number) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-empresa-light/50 pt-4">
                          <Button className="w-full bg-empresa-primary hover:bg-empresa-dark text-white group" asChild>
                            <Link href={`/empleos/aplicar/${job.slug}`}>
                              Aplicar Ahora
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </ScrollReveal>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-empresa-primary/5 skew-y-3 transform -translate-y-1/4 -z-10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <SectionTitle
                  title="Proceso de Selección"
                  subtitle="Conoce los pasos de nuestro proceso de selección para unirte a nuestro equipo."
                />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <ScrollReveal delay={100}>
                <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-lg depth-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-empresa-primary text-white text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-xl text-empresa-primary">Aplicación</h3>
                  <p className="text-muted-foreground">
                    Envía tu currículum y completa el formulario de aplicación para la vacante de tu interés.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-lg depth-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-empresa-primary text-white text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-xl text-empresa-primary">Preselección</h3>
                  <p className="text-muted-foreground">
                    Nuestro equipo de recursos humanos revisará tu aplicación y te contactará si cumples con el perfil.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-lg depth-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-empresa-primary text-white text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-bold text-xl text-empresa-primary">Entrevistas</h3>
                  <p className="text-muted-foreground">
                    Participarás en entrevistas con el equipo de recursos humanos y los responsables del área.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-lg depth-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-empresa-primary text-white text-xl font-bold">
                    4
                  </div>
                  <h3 className="font-bold text-xl text-empresa-primary">Contratación</h3>
                  <p className="text-muted-foreground">
                    Si eres seleccionado, recibirás una oferta formal y comenzarás el proceso de incorporación.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-empresa-light relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231e5f74' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            ></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="space-y-4 max-w-3xl">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-empresa-primary text-shadow">
                    ¿No encuentras lo que buscas?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Envíanos tu currículum y te tendremos en cuenta para futuras oportunidades.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-empresa-primary hover:bg-empresa-dark text-white group depth-shadow" asChild>
                    <Link href="/#contacto">
                      Enviar CV
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-12 bg-empresa-dark text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 font-bold text-white">
                <Image src="/logo-mjcl.png" alt="MJCL Servicios Logo" width={32} height={32} className="h-8 w-auto" />
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
