'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

export default function PricingSection() {
    const [time, setTime] = useState(2 * 3600 + 34 * 60 + 53);
    const formRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [shouldLoadForm, setShouldLoadForm] = useState(false);

    useEffect(() => {
        if (time <= 0) return;
        const interval = setInterval(() => setTime(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoadForm(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoadForm || !formRef.current || formRef.current.childNodes.length > 0) return;

        const container = formRef.current;
        const widget = document.createElement('mengantar-form-widget');
        widget.setAttribute('id', 'mengantar-form-widget');
        widget.setAttribute('url', '3-hari-jago-inggris-');
        widget.setAttribute('domain', 'jadilebihbaik.form.id');
        widget.setAttribute('embed', 'true');
        widget.setAttribute('settings', JSON.stringify({
            type: 'page',
            popupButtonText: 'Klik untuk pemesanan',
            popupText: 'Form Pemesanan',
            popupButtonColor: '#2e47ba',
            redirectTo: 'https://jadilebihbaik.form.id',
            isFbPixel: 'true',
            isHideBackground: 'true',
            isNoMargin: 'false',
            isGtm: 'true'
        }));
        container.appendChild(widget);

        if (!document.querySelector('script[src="https://jadilebihbaik.form.id/app.js"]')) {
            const s = document.createElement('script');
            s.src = 'https://jadilebihbaik.form.id/app.js';
            s.async = true;
            document.body.appendChild(s);
        }
    }, [shouldLoadForm]);

    const timeDisplay = useMemo(() => ({
        hours: String(Math.floor(time / 3600)).padStart(2, '0'),
        minutes: String(Math.floor((time % 3600) / 60)).padStart(2, '0'),
        seconds: String(time % 60).padStart(2, '0'),
    }), [time]);

    return (
        <section
            ref={sectionRef}
            style={{
                background: '#ffffff',
                padding: '24px 20px',
            }}
        >
            <div
                style={{
                    maxWidth: '860px', margin: '0 auto',
                    background: '#ffffff',
                    borderRadius: '24px', overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
            >
                <div style={{ padding: '30px 28px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff3e8', border: '1px solid #ffd0a0', borderRadius: '100px', padding: '5px 14px', marginBottom: '12px' }}>
                        <span style={{ color: '#e65c00', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>🏆 Paket Super Lengkap</span>
                    </div>

                    <h3 style={{ color: '#1a0800', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, lineHeight: 1.2, margin: '0 0 16px' }}>
                        Worksheet 3 Hari<br />Jago Inggris
                    </h3>

                    <div style={{
                        background: '#fff0f0',
                        border: '1px solid #ffcdd2',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '20px',
                    }}>
                        <p style={{ color: '#d32f2f', fontSize: '12px', fontWeight: 600, margin: '0 0 8px' }}>⏰ Penawaran berakhir dalam</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                            {[timeDisplay.hours, timeDisplay.minutes, timeDisplay.seconds].map((v, i) => (
                                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{
                                        background: '#d32f2f',
                                        color: '#ffffff',
                                        fontSize: 'clamp(20px, 3vw, 28px)',
                                        fontWeight: 900,
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontVariantNumeric: 'tabular-nums',
                                        minWidth: '44px',
                                        display: 'inline-block',
                                    }}>{v}</span>
                                    {i < 2 && <span style={{ color: '#d32f2f', fontSize: '18px', fontWeight: 700 }}>:</span>}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#94a3b8', fontSize: '18px', textDecoration: 'line-through', fontWeight: 600 }}>Rp 423.000</span>
                        <span style={{ background: '#FF8A00', color: '#ffffff', fontSize: '12px', fontWeight: 800, padding: '3px 10px', borderRadius: '100px' }}>HEMAT 77%</span>
                    </div>
                    <p style={{ color: '#1a0800', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 900, margin: '4px 0 6px', lineHeight: 1 }}>Rp 99.000</p>
                    <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>⏰ Sisa slot: hanya untuk 500 Bundda pertama!</p>
                </div>

                <div style={{ padding: '30px 28px', textAlign: 'center' }}>
                    <h4 id="order" style={{ color: '#1a0800', fontSize: '20px', fontWeight: 800, margin: '0 0 16px' }}>
                        🎁 Pesan Paket Lengkap Sekarang
                    </h4>

                    <div ref={formRef} />
                </div>
            </div>
        </section>
    );
}
