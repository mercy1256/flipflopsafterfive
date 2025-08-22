import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ContactSubmission } from '@/types/contact'

export async function GET(request: NextRequest) {
  try {
    // Basic authentication (you can improve this later)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db('flipflopsafterfive')
    const collection = db.collection('contacts')

    // Get all submissions, sorted by newest first
    const submissions = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(submissions)

  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('flipflopsafterfive')
    const collection = db.collection('contacts')

    // Update the submission status
    const result = await collection.updateOne(
      { _id: id },
      { $set: { status } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Status updated successfully' })

  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    )
  }
}
