"use client"

import type React from "react"

import { useState } from "react"
import { updateContactInfo } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { ContactInfo } from "@/types/contact"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

interface ContactFormProps {
  initialData: ContactInfo | null
}

export function ContactForm({ initialData }: ContactFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactInfo>(
    initialData || {
      phone1: "",
      phone2: "",
      email1: "",
      email2: "",
      address_line1: "",
      address_line2: "",
      facebook_url: "",
      twitter_url: "",
      instagram_url: "",
      linkedin_url: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateContactInfo(formData)

      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating contact info:", error)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al actualizar la información de contacto.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Información de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone1">Teléfono Principal</Label>
            <Input
              id="phone1"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              placeholder="+123 456 7890"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone2">Teléfono Secundario</Label>
            <Input
              id="phone2"
              name="phone2"
              value={formData.phone2 || ""}
              onChange={handleChange}
              placeholder="+123 456 7891"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email1">Email Principal</Label>
            <Input
              id="email1"
              name="email1"
              type="email"
              value={formData.email1}
              onChange={handleChange}
              placeholder="info@mjclservicios.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email2">Email Secundario</Label>
            <Input
              id="email2"
              name="email2"
              type="email"
              value={formData.email2 || ""}
              onChange={handleChange}
              placeholder="ventas@mjclservicios.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address_line1">Dirección (Línea 1)</Label>
            <Input
              id="address_line1"
              name="address_line1"
              value={formData.address_line1}
              onChange={handleChange}
              placeholder="Av. Principal #123"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address_line2">Dirección (Línea 2)</Label>
            <Input
              id="address_line2"
              name="address_line2"
              value={formData.address_line2 || ""}
              onChange={handleChange}
              placeholder="Ciudad Capital"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Redes Sociales</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-2">
            <Facebook className="h-5 w-5 text-blue-600" />
            <Input
              id="facebook_url"
              name="facebook_url"
              value={formData.facebook_url || ""}
              onChange={handleChange}
              placeholder="https://facebook.com/mjclservicios"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Twitter className="h-5 w-5 text-blue-400" />
            <Input
              id="twitter_url"
              name="twitter_url"
              value={formData.twitter_url || ""}
              onChange={handleChange}
              placeholder="https://twitter.com/mjclservicios"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Instagram className="h-5 w-5 text-pink-600" />
            <Input
              id="instagram_url"
              name="instagram_url"
              value={formData.instagram_url || ""}
              onChange={handleChange}
              placeholder="https://instagram.com/mjclservicios"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Linkedin className="h-5 w-5 text-blue-700" />
            <Input
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/mjclservicios"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar Cambios"}
      </Button>
    </form>
  )
}
