import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import clientPromise from '@/lib/mongodb'
import { ContactSubmission } from '@/types/contact'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // your-email@gmail.com
    pass: process.env.EMAIL_PASS  // your-app-password
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Store in MongoDB
    const submission = await storeSubmission({ 
      name, 
      email, 
      subject, 
      message, 
      timestamp: new Date().toISOString() 
    })

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'contact@flipflopsafterfive.com', // Your email
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from your website contact form</em></p>
        <p><em>Submission ID: ${submission.insertedId}</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        
        Sent from your website contact form
        Submission ID: ${submission.insertedId}
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting FlipFlopsAfterFive',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to me. I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Urvish Shah<br>FlipFlopsAfterFive</p>
      `
    }

    try {
      await transporter.sendMail(userMailOptions)
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      // Don't fail the main request if confirmation email fails
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

// MongoDB storage function
async function storeSubmission(data: Omit<ContactSubmission, 'createdAt' | 'status' | '_id'>) {
  try {
    const client = await clientPromise
    const db = client.db('flipflopsafterfive') // Your database name
    
    // Create contacts collection if it doesn't exist
    const collection = db.collection('contacts')
    
    // Insert the submission
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
      status: 'new'
    })
    
    console.log('Contact form submission stored in MongoDB:', result.insertedId)
    return result
    
  } catch (error) {
    console.error('Error storing submission in MongoDB:', error)
    throw error
  }
}
