export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  createdAt: Date
  status: 'new' | 'read' | 'replied' | 'archived'
  _id?: string
}
