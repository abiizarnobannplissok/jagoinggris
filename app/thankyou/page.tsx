'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const ThankYou = dynamic(() => import('@/components/ThankYou'));

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { 
        currency: 'IDR', 
        value: 99000 
      });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <ThankYou />
    </div>
  );
}
