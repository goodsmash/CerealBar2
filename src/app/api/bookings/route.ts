import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const formatCurrency = (value: string) => {
  const [min, max] = value.split('-').map(v => parseInt(v.replace(/\D/g, '')));
  return max ? `$${min.toLocaleString()}-$${max.toLocaleString()}` : `$${min.toLocaleString()}+`;
};

const generateBusinessEmailContent = (data: any) => {
  const eventDate = new Date(data.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    New Event Booking Request

    Event Details:
    -------------
    Type: ${data.eventType}
    Date: ${formattedDate}
    Time: ${data.preferredTime}
    Duration: ${data.duration} hours
    Location: ${data.location === 'onsite' ? 'At Sweet & Comfy Boston' : 'Off-site'}
    Guest Count: ${data.guestCount}
    Estimated Budget: ${formatCurrency(data.budget)}

    Customer Information:
    -------------------
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    How they found us: ${data.hearAboutUs}

    Dietary Restrictions:
    -------------------
    ${data.dietaryRestrictions.length > 0 ? data.dietaryRestrictions.join(', ') : 'None specified'}

    Special Requests:
    ---------------
    ${data.specialRequests || 'None'}

    Action Required:
    --------------
    1. Review event details and availability
    2. Check staff availability for the requested date/time
    3. Contact customer within 24 hours
    4. Prepare preliminary quote based on requirements

    This is an automated message from your booking system.
  `;
};

const generateCustomerEmailContent = (data: any) => {
  const eventDate = new Date(data.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    Dear ${data.name},

    Thank you for choosing Sweet & Comfy Boston for your upcoming event!

    We're excited to help make your event special. Here's a summary of your booking request:

    Event Details:
    ------------
    Event Type: ${data.eventType}
    Date: ${formattedDate}
    Time: ${data.preferredTime}
    Duration: ${data.duration} hours
    Location: ${data.location === 'onsite' ? 'At Sweet & Comfy Boston' : 'At Your Location'}
    Number of Guests: ${data.guestCount}

    What's Next?
    -----------
    1. Our events team will review your request
    2. We'll contact you within 24 hours to:
       - Confirm availability
       - Discuss your vision in detail
       - Provide pricing information
       - Answer any questions you may have

    Need to make changes or have questions?
    ------------------------------------
    • Email: info@sweetandcomfyboston.com
    • Phone: (123) 456-7890
    • Address: 6 Tremont St, Brighton, MA

    Follow us on social media for inspiration and updates:
    • Instagram: @sweetandcomfyboston
    • Facebook: @sweetandcomfyboston

    We can't wait to be part of your special event!

    Sweet regards,
    The Sweet & Comfy Boston Team

    P.S. Save this email for your records. Your booking reference number is: ${Date.now().toString(36).toUpperCase()}
  `;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'eventType', 'location', 'date'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const eventDate = new Date(body.date);
    if (eventDate < new Date()) {
      return NextResponse.json(
        { error: 'Event date must be in the future' },
        { status: 400 }
      );
    }

    // Send email to business
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'info@sweetandcomfyboston.com',
      subject: `New Event Booking: ${body.eventType} - ${body.name}`,
      text: generateBusinessEmailContent(body),
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: body.email,
      subject: 'Sweet & Comfy Boston - Event Booking Confirmation',
      text: generateCustomerEmailContent(body),
    });

    // Store booking in database (implement your database logic here)
    // For now, we'll just return success
    return NextResponse.json({ 
      success: true,
      message: 'Booking request received successfully',
      reference: Date.now().toString(36).toUpperCase()
    });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}
