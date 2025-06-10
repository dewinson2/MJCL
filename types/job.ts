export type Job = {
  id: number
  title: string
  location: string
  job_type: string
  description: string
  requirements: string[]
  benefits: string[]
  category: string
  is_active: boolean
  slug: string
  created_at: string
  updated_at: string
}

export type JobFormData = Omit<Job, "id" | "created_at" | "updated_at">
