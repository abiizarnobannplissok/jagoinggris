declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => void;
    _fbq: unknown;
  }
}

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function trackPageView() {
  const eventId = generateEventId();

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView', {}, { eventID: eventId });
  }

  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'PageView',
        event_id: eventId
      })
    });
  } catch (error) {
    console.error('CAPI PageView error:', error);
  }
}

export async function trackInitiateCheckout() {
  const eventId = generateEventId();

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', { currency: 'IDR', value: 99000 }, { eventID: eventId });
  }

  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'InitiateCheckout',
        event_id: eventId,
        custom_data: {
          currency: 'IDR',
          value: 99000
        }
      })
    });
  } catch (error) {
    console.error('CAPI InitiateCheckout error:', error);
  }
}
