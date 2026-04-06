'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Script from 'next/script';

const ThankYou = dynamic(() => import('@/components/ThankYou'));

export default function ThankYouPage() {
  useEffect(() => {
    const firePurchasePixel = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', { 
          currency: 'IDR', 
          value: 99000 
        });
        console.log('Purchase pixel fired');
      }
    };

    if ((window as any).fbq) {
      firePurchasePixel();
    } else {
      window.addEventListener('fbq-ready', firePurchasePixel);
      setTimeout(firePurchasePixel, 1000);
    }
  }, []);

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4478788099110803');
            window.dispatchEvent(new Event('fbq-ready'));
          `,
        }}
        strategy="beforeInteractive"
      />
      <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        <ThankYou />
      </div>
    </>
  );
}
