import { API_KEY } from '../lib/email-service';

export async function handleEmailRequest(req: Request) {
  const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;
  
  // Log environment check
  console.log('Environment check:', {
    hasApiKey: !!API_KEY,
    hasContactEmail: !!CONTACT_EMAIL
  });

  if (!API_KEY) {
    console.error('API key missing in environment');
    return new Response(
      JSON.stringify({ error: 'Configuration error' }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, api-key'
        } 
      }
    );
  }

  if (!CONTACT_EMAIL) {
    console.error('Contact email missing in environment');
    return new Response(
      JSON.stringify({ error: 'Configuration error' }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, api-key'
        } 
      }
    );
  }

  try {
    let body;
    try {
      body = await req.json();
      console.log('Received request body:', JSON.stringify(body, null, 2));
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, api-key'
          } 
        }
      );
    }

    // Validate required fields
    if (!body.htmlContent) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: htmlContent' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, api-key'
          } 
        }
      );
    }

    if (!body.to || !Array.isArray(body.to) || !body.to.length) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid recipients' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, api-key'
          } 
        }
      );
    }

    // Send email via Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        ...body,
        sender: body.sender || {
          name: 'Sweet & Comfy Boston',
          email: CONTACT_EMAIL
        }
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Brevo API error:', responseData);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { 
          status: response.status,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, api-key'
          } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.messageId }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, api-key'
        } 
      }
    );
  } catch (error) {
    console.error('Email handler error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, api-key'
        } 
      }
    );
  }
}
