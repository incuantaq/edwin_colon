export const prerender = false;

// Zoho OAuth Config
const CLIENT_ID = import.meta.env.CLIENT_ID;
const CLIENT_SECRET = import.meta.env.CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.REFRESH_TOKEN;

async function refreshAccessToken() {
    try {
        const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
              refresh_token: REFRESH_TOKEN,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              grant_type: 'refresh_token',
          }),
        });

        const data = await response.json();

        if (response.ok) {
        return data;
        } else {
        console.error('Error refreshing token:', data);
        return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function POST({ request }) {
  try {
    const token = await refreshAccessToken();
    const formData = await request.json();
    const { firstName, lastName, email, phone, street, description, source } = formData;

    if (!firstName || !lastName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Missing data' }),
        { status: 400 }
      );
    }
    const apiUrl = 'https://www.zohoapis.com/crm/v2/Leads';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [{
          First_Name: firstName,
          Last_Name: lastName,
          Phone: phone,
          Email: email,
          Street: street,
          Description: description,
          Lead_Source: source,
        }]
      })
    });

    if (response.ok) {
      const result = await response.json();
      return new Response(
        JSON.stringify({ message: 'Lead created', data: result }),
        { status: 200 }
      );
    } else {
      const error = await response.json();
      return new Response(
        JSON.stringify({ error: error.message || 'Error' }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error' }),
      { status: 500 }
    );
  }
}
