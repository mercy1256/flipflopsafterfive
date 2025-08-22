'use client'

import React, { useState, useEffect } from 'react'
import { ContactSubmission } from '@/types/contact'

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [authToken, setAuthToken] = useState('')

  useEffect(() => {
    // Check if user is authenticated (you can improve this)
    const token = localStorage.getItem('adminToken')
    if (token) {
      setAuthToken(token)
      fetchSubmissions(token)
    } else {
      setError('Please authenticate to view submissions')
      setLoading(false)
    }
  }, [])

  const fetchSubmissions = async (token: string) => {
    try {
      const response = await fetch('/api/contact/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      } else {
        setError('Failed to fetch submissions')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/contact/submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        // Update local state
        setSubmissions(prev => 
          prev.map(sub => 
            sub._id === id ? { ...sub, status: status as any } : sub
          )
        )
      } else {
        setError('Failed to update status')
      }
    } catch (error) {
      setError('Network error')
    }
  }

  const authenticate = () => {
    const token = prompt('Enter admin token:')
    if (token) {
      localStorage.setItem('adminToken', token)
      setAuthToken(token)
      fetchSubmissions(token)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4">Loading submissions...</p>
        </div>
      </div>
    )
  }

  if (error && !authToken) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={authenticate}
            className="bg-secondary text-primary px-6 py-3 rounded-md hover:bg-accent transition-colors"
          >
            Authenticate
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <button
          onClick={() => fetchSubmissions(authToken)}
          className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-accent transition-colors"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{submission.subject}</h3>
                  <p className="text-sm text-gray-600">
                    From: {submission.name} ({submission.email})
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    submission.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                    submission.status === 'replied' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submission.status}
                  </span>
                  <select
                    value={submission.status}
                    onChange={(e) => updateStatus(submission._id!, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{submission.message}</p>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <a
                  href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
                  className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(submission.email)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  Copy Email
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
