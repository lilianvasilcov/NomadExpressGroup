import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // TODO: Implement email sending or database storage
    console.log('Contact form submitted:', body);
    
    // Example: Send email using nodemailer or save to database
    // await sendEmail({
    //   to: 'info@nomadexpress.com',
    //   subject: `Contact Form: ${body.subject}`,
    //   body: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\n\nMessage:\n${body.message}`
    // });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully. We will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}

