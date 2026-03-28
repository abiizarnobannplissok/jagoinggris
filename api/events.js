const PIXEL_ID = '4478788099110803';
const ACCESS_TOKEN = 'EAARLk6jJbsABRH6ZCDPYo4o9r3TgGOInyZAXNnvoodp8ASw5qaTyTAMI1FYwbZAfzVHgZBV1MAmXjEm8HTYWza0HuggNZCTSygG76EjPV6oAhpEHSSsTJC0uLIA3ZAgKRSTMIZCYPp5ZCBu2reVLmL0S132fLoOq7W2AU2ws3narIYraeKJId0HEZBB0XY3ZBQC5ZAW4gZDZD';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event_name, event_id, user_data, custom_data, action_source } = req.body;

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          action_source: action_source || 'website',
          event_id,
          user_data: {
            client_ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            client_user_agent: req.headers['user-agent'],
            ...user_data
          },
          custom_data
        }
      ]
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook CAPI Error:', result);
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('CAPI Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
