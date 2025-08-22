'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Have questions about travel planning or want to collaborate? I'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          
          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <h3 className="font-semibold mb-2">Message Sent Successfully!</h3>
              <p>Thank you for your message. I've received it and will get back to you as soon as possible.</p>
              <p className="mt-2 text-sm">You should also receive a confirmation email shortly.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <h3 className="font-semibold mb-2">Error Sending Message</h3>
              <p>{errorMessage}</p>
              <p className="mt-2 text-sm">Please try again or email me directly at contact@flipflopsafterfive.com</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
                disabled={isSubmitting}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
                disabled={isSubmitting}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
                disabled={isSubmitting}
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
                disabled={isSubmitting}
                placeholder="Tell me more about your inquiry..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-primary px-6 py-3 rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-text-light">contact@flipflopsafterfive.com</p>
              <p className="text-sm text-text-light mt-1">I'll respond within 24-48 hours</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Social Media</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/flipflopsafterfive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-text transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://twitter.com/flipflopsafterfive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-text transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://pinterest.com/flipflopsafterfive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-text transition-colors"
                >
                  Pinterest
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-text-light">Based in Mumbai, India</p>
              <p className="text-sm text-text-light mt-1">Available for travel collaborations worldwide</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Response Time</h3>
              <p className="text-text-light">24-48 hours</p>
              <p className="text-sm text-text-light mt-1">For urgent matters, please email directly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 