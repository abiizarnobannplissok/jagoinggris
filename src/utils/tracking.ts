declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => void;
    _fbq: unknown;
  }
}

function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function sendCapiEvent(payload: Record<string, unknown>) {
  const send = () => {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(send, { timeout: 5000 });
  } else {
    setTimeout(send, 3000);
  }
}

function waitForFbq(callback: () => void, maxAttempts = 20) {
  let attempts = 0;
  const check = () => {
    attempts++;
    if (typeof window.fbq === 'function') {
      callback();
    } else if (attempts < maxAttempts) {
      setTimeout(check, 100);
    } else {
      console.warn('Facebook Pixel not loaded after maximum attempts');
    }
  };
  check();
}

export function trackPageView() {
  const eventId = generateEventId();

  waitForFbq(() => {
    window.fbq('track', 'PageView', {}, { eventID: eventId });
  });

  sendCapiEvent({
    event_name: 'PageView',
    event_id: eventId,
  });
}

export function trackInitiateCheckout() {
  const eventId = generateEventId();

  waitForFbq(() => {
    window.fbq('track', 'InitiateCheckout', { currency: 'IDR', value: 99000 }, { eventID: eventId });
  });

  sendCapiEvent({
    event_name: 'InitiateCheckout',
    event_id: eventId,
    custom_data: {
      currency: 'IDR',
      value: 99000,
    },
  });
}

export function trackPurchase() {
  const eventId = generateEventId();

  waitForFbq(() => {
    window.fbq('track', 'Purchase', {
      currency: 'IDR',
      value: 99000,
      content_name: '3 Hari Jago Inggris',
      content_type: 'product',
    }, { eventID: eventId });
  });

  sendCapiEvent({
    event_name: 'Purchase',
    event_id: eventId,
    custom_data: {
      currency: 'IDR',
      value: 99000,
      content_name: '3 Hari Jago Inggris',
      content_type: 'product',
    },
  });
}
