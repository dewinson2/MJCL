"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  items: {
    href: string
    label: string
  }[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Cerrar el menú cuando se cambia el tamaño de la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-empresa-primary"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}></div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-empresa-primary"
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-lg font-medium text-empresa-primary hover:text-empresa-secondary transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <Button className="w-full bg-empresa-primary hover:bg-empresa-dark text-white" asChild>
            <Link href="#contacto" onClick={() => setIsOpen(false)}>
              Contáctanos
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
