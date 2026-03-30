import { useEffect, useRef, memo } from 'react';

const ThankYou = memo(function ThankYou() {
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const lottieLoaded = useRef(false);

  useEffect(() => {
    if (lottieLoaded.current || !lottieContainerRef.current) return;
    
    const container = lottieContainerRef.current;
    
    const loadLottie = () => {
      if (lottieLoaded.current || !container) return;
      
      container.innerHTML = '';
      const player = document.createElement('lottie-player');
      player.setAttribute('src', '/animation.json');
      player.setAttribute('background', 'transparent');
      player.setAttribute('speed', '1');
      player.setAttribute('loop', '');
      player.setAttribute('autoplay', '');
      (player as HTMLElement).style.width = '150px';
      (player as HTMLElement).style.height = '150px';
      container.appendChild(player);
      lottieLoaded.current = true;
    };

    if ((window as any).customElements?.get('lottie-player')) {
      loadLottie();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.2/dist/lottie-player.js';
      script.async = true;
      script.onload = loadLottie;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section style={{
      background: 'linear-gradient(180deg, #fff8f2 0%, #ffffff 100%)',
      minHeight: '100vh',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 'clamp(20px, 5vh, 40px)'
    }}>
      <div 
        ref={lottieContainerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
          minHeight: '150px'
        }}
      />

      <h1 style={{
        fontSize: 'clamp(20px, 4vw, 32px)',
        fontWeight: 900,
        color: '#1a0800',
        lineHeight: 1.3,
        margin: '0 0 12px',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <span style={{ color: '#e65c00' }}>
          Selamat Bunda, pembayaran berhasil!
        </span><br />
        Bunda bisa akses worksheet-nya melalui link di bawah ini.
      </h1>

      <p style={{
        color: '#64748b',
        fontSize: 'clamp(14px, 2.5vw, 16px)',
        lineHeight: 1.6,
        margin: '0 0 20px',
        textAlign: 'center'
      }}>
        Program 3 hari untuk si kecil sudah siap Bunda akses.
      </p>

      <p style={{
        color: '#374151',
        fontSize: 'clamp(14px, 2.5vw, 15px)',
        fontWeight: 600,
        margin: '0 0 16px',
        textAlign: 'center'
      }}>
        Bunda bisa mengakses worksheet-nya melalui link di bawah ini.
      </p>

      <a
        href="https://drive.google.com/drive/folders/1NGnQSbY0d-4l2xTArLTdIp4q0sTxEGHM"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #e65c00, #ff8c00)',
          color: 'white',
          fontWeight: 800,
          fontSize: 'clamp(14px, 2.5vw, 16px)',
          padding: '14px 28px',
          borderRadius: '100px',
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(230,92,0,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          marginBottom: '24px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(230,92,0,0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(230,92,0,0.4)';
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
        </svg>
        Akses Worksheet via Google Drive
      </a>

      <div style={{
        background: '#f0f9ff',
        borderRadius: '12px',
        padding: '16px 20px',
        border: '1px solid #bae6fd',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <p style={{
          color: '#0369a1',
          fontSize: 'clamp(13px, 2vw, 14px)',
          lineHeight: 1.7,
          margin: '0'
        }}>
          <strong>Silakan cek email Bunda sekarang.</strong> Tenang Bun, Bunda bisa akses worksheet ini kapan saja karena sudah dikirim melalui email. Setelah dibuka, Bunda bisa langsung download dan belajar bersama si kecil hari ini.
        </p>
      </div>
    </section>
  );
});

export default ThankYou;
