import React from 'react'

export default function ContactPage() {
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
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-text"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-primary px-6 py-3 rounded-md hover:bg-accent transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-text-light">contact@flipflopsafterfive.com</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 