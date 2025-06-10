export interface ContactInfo {
  id?: number
  phone1: string
  phone2?: string
  email1: string
  email2?: string
  address_line1: string
  address_line2?: string
  facebook_url?: string
  twitter_url?: string
  instagram_url?: string
  linkedin_url?: string
  created_at?: string
  updated_at?: string
}

export type ContactFormData = Omit<ContactInfo, "id" | "created_at" | "updated_at">
