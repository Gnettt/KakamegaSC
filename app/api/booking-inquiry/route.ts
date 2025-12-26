import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message
    } = body;

    // Validate required fields
    if (!name || !email || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend, SendGrid, or SMTP)
    // For now, just log the submission
    console.log('Booking Inquiry Submission:', {
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending
    // In production, integrate with your chosen email service

    return NextResponse.json(
      { message: 'Booking inquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing booking inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process booking inquiry' },
      { status: 500 }
    );
  }
}
