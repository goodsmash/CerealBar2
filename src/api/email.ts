import { API_KEY, API_URL } from '@/lib/email-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: "Sweet & Comfy Boston",
          email: "noreply@sweetandcomfyboston.com"
        },
        to: [{
          email: import.meta.env.VITE_CONTACT_EMAIL,
          name: "Sweet & Comfy Boston"
        }],
        subject: body.subject,
        htmlContent: body.message,
        replyTo: {
          email: body.email,
          name: body.name
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ 
        success: false, 
        error: `API Error: ${response.status} ${response.statusText} - ${errorText}` 
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Email proxy error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
