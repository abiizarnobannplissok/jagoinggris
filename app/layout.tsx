import type { Metadata } from 'next';
import { fontInter } from './fonts';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: '3 Hari Jago Inggris - Worksheet untuk Anak',
  description: 'Program mini 3 hari yang bikin anak naik level pelan-pelan: mulai dari kenal lewat gambar, lanjut main kosakata, lalu latihan baca & tulis kata pertamanya.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://zobook.form.id" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            #app{background-color:transparent !important;text-align:left} 
            .embed-sealHide, .embed-leftHide, .bottom-bar-text{display:none !important;} 
            .embed-rightHide{flex: 0 0 100% !important; width: 100% !important; max-width:100% !important; margin:auto;} 
            .embed-bgHide{box-shadow:none !important; background:transparent; border:none !important; padding: 1px 20px !important; margin:0;} 
            .embed-topSpace{margin:auto !important;} 
            .embed-wrapper{height: auto !important; overflow:initial !important;} 
            .embed-notopMargin{margin:0 !important; .embed-gap{gap: 10px !important;}}
          `,
        }} />
      </head>
      <body className={fontInter.className}>
        {children}
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
              fbq('track', 'PageView');
            `,
          }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
