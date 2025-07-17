import Link from "next/link"
import Image from "next/image"
import {
  Building2,
  Camera,
  Construction,
  Headphones,
  Shield,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionTitle } from "@/components/section-title"
import { DecorativeDots } from "@/components/decorative-dots"
import { MobileMenu } from "@/components/mobile-menu"
import { getContactInfo } from "./actions"

export default async function Home() {
  const contactInfo = await getContactInfo()

  const navItems = [
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "/empleos", label: "Empleos" },
    { href: "#contacto", label: "Contacto" },
  ]

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
  }

  const socialLinks = [
    { name: "facebook", url: contactInfo.facebook_url, icon: Facebook },
    { name: "twitter", url: contactInfo.twitter_url, icon: Twitter },
    { name: "instagram", url: contactInfo.instagram_url, icon: Instagram },
    { name: "linkedin", url: contactInfo.linkedin_url, icon: Linkedin },
  ].filter((social) => social.url)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 font-bold text-empresa-primary hover:text-empresa-secondary transition-colors"
            aria-label="Ir a la página principal"
            title="Ir a la página principal"
          >
            <Image src="/logo-mjcl.png" alt="MJCL Servicios Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="text-lg">Corporación MJCL</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-empresa-secondary relative group"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-empresa-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-empresa-primary hover:bg-empresa-dark text-white hidden md:flex" asChild>
              <Link href="#contacto">Contáctanos</Link>
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
                  Servicios Múltiples para Empresas Públicas y Privadas
                </h1>
                <p className="mx-auto max-w-[700px] text-white/90 md:text-xl lg:text-2xl">
                  Incorporamos y promovemos proyectos, mediante la contratación de personal para ejecución de obras y a
                  la vez brindar servicios para satisfacer la demanda de mano de obra en diferentes sectores.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Button
                  className="bg-empresa-accent hover:bg-empresa-accent/90 text-black font-bold px-6 py-6 text-lg depth-shadow"
                  asChild
                >
                  <Link href="#servicios" className="group">
                    Nuestros Servicios
                    <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white/20 px-6 py-6 text-lg bg-transparent"
                  asChild
                >
                  <Link href="#contacto">Contáctanos</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-white/80 text-sm">+500 clientes confían en nosotros</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 relative">
          <DecorativeDots className="top-10 right-10" />
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <SectionTitle
                  title="Nuestros Servicios"
                  subtitle="Ofrecemos una amplia gama de servicios especializados para satisfacer las necesidades de nuestros clientes."
                />
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <ScrollReveal delay={100}>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-3d bg-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-empresa-primary/5 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                  <Construction className="h-12 w-12 text-empresa-secondary animate-bounce-light relative z-10" />
                  <h3 className="text-xl font-bold text-empresa-primary relative z-10">Construcción</h3>
                  <p className="text-center text-muted-foreground relative z-10">
                    Servicios para compañías dedicadas a la construcción de viviendas y asfaltos.
                  </p>
                  <Button variant="ghost" className="text-empresa-secondary group relative z-10" asChild>
                    <Link href="#" className="flex items-center">
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-3d bg-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-empresa-primary/5 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                  <Headphones className="h-12 w-12 text-empresa-secondary animate-bounce-light relative z-10" />
                  <h3 className="text-xl font-bold text-empresa-primary relative z-10">Telecomunicaciones</h3>
                  <p className="text-center text-muted-foreground relative z-10">
                    Servicios para compañías de telecomunicaciones.
                  </p>
                  <Button variant="ghost" className="text-empresa-secondary group relative z-10" asChild>
                    <Link href="#" className="flex items-center">
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-3d bg-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-empresa-primary/5 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                  <Camera className="h-12 w-12 text-empresa-secondary animate-bounce-light relative z-10" />
                  <h3 className="text-xl font-bold text-empresa-primary relative z-10">Sistemas de Seguridad</h3>
                  <p className="text-center text-muted-foreground relative z-10">
                    Monitoreo de cámaras de vigilancia e inhibidores de frecuencias para sistemas penitenciarios.
                  </p>
                  <Button variant="ghost" className="text-empresa-secondary group relative z-10" asChild>
                    <Link href="#" className="flex items-center">
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-3d bg-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-empresa-primary/5 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                  <Shield className="h-12 w-12 text-empresa-secondary animate-bounce-light relative z-10" />
                  <h3 className="text-xl font-bold text-empresa-primary relative z-10">Seguridad e Inteligencia</h3>
                  <p className="text-center text-muted-foreground relative z-10">
                    Servicios de vigilancia, inteligencia y contra inteligencia para el sector público y privado.
                  </p>
                  <Button variant="ghost" className="text-empresa-secondary group relative z-10" asChild>
                    <Link href="#" className="flex items-center">
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={500}>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-3d bg-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-empresa-primary/5 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                  <Building2 className="h-12 w-12 text-empresa-secondary animate-bounce-light relative z-10" />
                  <h3 className="text-xl font-bold text-empresa-primary relative z-10">Servicios Corporativos</h3>
                  <p className="text-center text-muted-foreground relative z-10">
                    Soluciones integrales para empresas públicas y privadas.
                  </p>
                  <Button variant="ghost" className="text-empresa-secondary group relative z-10" asChild>
                    <Link href="#" className="flex items-center">
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-empresa-primary/5 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-empresa-accent/20 rounded-full"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-empresa-secondary/10 rounded-full"></div>
                  <div className="relative bg-white p-6 rounded-lg depth-shadow">
                    <h3 className="text-2xl font-bold text-empresa-primary mb-4">¿Por qué elegirnos?</h3>
                    <ul className="space-y-3">
                      {[
                        "Más de 10 años de experiencia en el sector",
                        "Personal altamente capacitado y certificado",
                        "Soluciones personalizadas para cada cliente",
                        "Tecnología de vanguardia",
                        "Servicio 24/7 los 365 días del año",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mr-2 mt-1 bg-empresa-accent/20 p-1 rounded-full">
                            <Check className="h-4 w-4 text-empresa-accent" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="space-y-4">
                  <div className="inline-block bg-empresa-accent/20 px-4 py-1 rounded-full text-empresa-accent font-medium text-sm">
                    Nuestros números
                  </div>
                  <h3 className="text-3xl font-bold text-empresa-primary">Resultados que hablan por sí mismos</h3>
                  <p className="text-muted-foreground">
                    Nuestro compromiso con la excelencia se refleja en los resultados que hemos logrado a lo largo de
                    los años.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[
                      { number: "500+", label: "Clientes satisfechos" },
                      { number: "1000+", label: "Proyectos completados" },
                      { number: "50+", label: "Profesionales certificados" },
                      { number: "24/7", label: "Soporte técnico" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg text-center depth-shadow">
                        <div className="text-3xl font-bold text-empresa-primary">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="nosotros" className="w-full py-12 md:py-24 lg:py-32 bg-empresa-light relative">
          <DecorativeDots className="bottom-10 left-10" />
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-4">
                  <div className="inline-block bg-empresa-primary/20 px-4 py-1 rounded-full text-empresa-primary font-medium text-sm">
                    Nuestra Misión
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-empresa-primary">
                    Transformando vidas y empresas
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Incorporar y promover proyectos, mediante la contratación de personal para ejecución de obras y a la
                    vez brindar servicios para satisfacer la demanda de mano de obra en diferentes sectores.
                  </p>
                  <div className="pt-4">
                    <Button className="bg-empresa-primary hover:bg-empresa-dark text-white group" asChild>
                      <Link href="#contacto">
                        Conoce más sobre nosotros
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="space-y-4">
                  <div className="inline-block bg-empresa-secondary/20 px-4 py-1 rounded-full text-empresa-secondary font-medium text-sm">
                    Nuestro Compromiso
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-empresa-primary">
                    Excelencia en cada servicio
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Nos comprometemos a ofrecer servicios de alta calidad, con personal capacitado y comprometido, para
                    satisfacer las necesidades de nuestros clientes y contribuir al desarrollo de la sociedad.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg depth-shadow">
                      <h4 className="font-bold text-empresa-primary">Valores</h4>
                      <p className="text-sm text-muted-foreground">Integridad, Compromiso, Excelencia, Innovación</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg depth-shadow">
                      <h4 className="font-bold text-empresa-primary">Visión</h4>
                      <p className="text-sm text-muted-foreground">
                        Ser líderes en servicios múltiples a nivel nacional
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-empresa-primary/5 skew-y-3 transform -translate-y-1/4 -z-10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <SectionTitle
                  title="Contáctanos"
                  subtitle="Estamos listos para atender tus necesidades. Ponte en contacto con nosotros."
                />
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <ScrollReveal>
                <div className="bg-white rounded-lg overflow-hidden depth-shadow">
                  <div className="bg-empresa-primary p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Información de Contacto</h3>
                    <p>Estamos disponibles para atenderte en cualquier momento.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-start">
                      <div className="bg-empresa-primary/10 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-empresa-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-empresa-primary">Teléfono</h4>
                        <p className="text-muted-foreground">{contactInfo.phone1}</p>
                        {contactInfo.phone2 && <p className="text-muted-foreground">{contactInfo.phone2}</p>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-empresa-primary/10 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-empresa-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-empresa-primary">Email</h4>
                        <p className="text-muted-foreground">{contactInfo.email1}</p>
                        {contactInfo.email2 && <p className="text-muted-foreground">{contactInfo.email2}</p>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-empresa-primary/10 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-empresa-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-empresa-primary">Dirección</h4>
                        <p className="text-muted-foreground">{contactInfo.address_line1}</p>
                        {contactInfo.address_line2 && (
                          <p className="text-muted-foreground">{contactInfo.address_line2}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      {socialLinks.map((social, i) => {
                        const SocialIcon = social.icon
                        return (
                          <a
                            key={i}
                            href={social.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-empresa-primary/10 p-2 rounded-full text-empresa-primary hover:bg-empresa-primary hover:text-white transition-colors"
                            aria-label={`Visita nuestro perfil de ${social.name}`}
                          >
                            <SocialIcon className="h-5 w-5" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-lg overflow-hidden depth-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-empresa-primary mb-4">Envíanos un mensaje</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="nombre"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-empresa-primary"
                          >
                            Nombre
                          </label>
                          <input
                            id="nombre"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empresa-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-empresa-primary"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empresa-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            placeholder="Tu email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="asunto"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-empresa-primary"
                        >
                          Asunto
                        </label>
                        <input
                          id="asunto"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empresa-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                          placeholder="Asunto del mensaje"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="mensaje"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-empresa-primary"
                        >
                          Mensaje
                        </label>
                        <textarea
                          id="mensaje"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empresa-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                          placeholder="Tu mensaje"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-empresa-primary hover:bg-empresa-dark text-white">
                        Enviar Mensaje
                      </Button>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-12 bg-empresa-dark text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3 font-bold text-white">
                <Image src="/logo-mjcl.png" alt="MJCL Servicios Logo" width={32} height={32} className="h-8 w-auto" />
                <span>Corporación MJCL</span>
              </Link>
              <p className="text-white/70 text-sm">
                Ofrecemos servicios múltiples dirigidos a compañías públicas y privadas, con el compromiso de mejorar la
                calidad de vida de las personas.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label={`Visita nuestro perfil de ${social.name}`}
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
