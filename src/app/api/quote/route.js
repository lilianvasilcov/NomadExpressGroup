import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // TODO: Implement email sending or database storage
    // For now, just log the data
    console.log('Quote request received:', body);
    
    // Example: Send email using nodemailer or save to database
    // await sendEmail({
    //   to: 'info@nomadexpress.com',
    //   subject: 'New Quote Request',
    //   body: JSON.stringify(body, null, 2)
    // });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request received successfully. We will contact you within 24 hours.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}

