'use client';

import { useEffect, useRef, useState } from 'react';

const gold = '#c9a227';
export default function VideoIntro({ src }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visible && videoRef.current) {
      const v = videoRef.current;
      v.muted = false;
      v.play().catch(() => {
        // Navegador bloqueó autoplay con sonido → fallback silenciado
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
  }, [visible]);

  function toggleMute() {
    setMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  }

  function startClose() {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      setClosing(true);
      setTimeout(() => setVisible(false), 400);
    }, 2000);
  }

  function handleManualClose() {
    clearTimeout(timerRef.current);
    setClosing(true);
    setTimeout(() => setVisible(false), 400);
  }

  if (!visible) return null;

  return (
    <div
      onClick={handleManualClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(8,21,57,0.88)',
        backdropFilter: 'blur(6px)',
        transition: 'opacity 0.4s ease',
        opacity: closing ? 0 : 1,
        animation: closing ? undefined : 'fadeIn 0.4s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '92vw',
          maxWidth: 820,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: `0 0 0 2px ${gold}, 0 24px 60px rgba(0,0,0,0.7)`,
          animation: closing ? undefined : 'scaleIn 0.4s ease',
          transition: closing ? 'transform 0.4s ease, opacity 0.4s ease' : undefined,
          transform: closing ? 'scale(0.88)' : undefined,
          opacity: closing ? 0 : undefined,
        }}
      >
        <video
          ref={videoRef}
          src={src}
          playsInline
          style={{ display: 'block', width: '100%', maxHeight: '80vh', objectFit: 'contain', background: '#000' }}
          onEnded={startClose}
        />

        {/* Barra inferior */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px 16px',
          background: 'linear-gradient(transparent, rgba(8,21,57,0.95))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
          {/* Botón silencio / sonido */}
          <button
            onClick={toggleMute}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {muted ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
                Activar sonido
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                Silenciar
              </>
            )}
          </button>

          {/* Botón cerrar */}
          <button
            onClick={handleManualClose}
            style={{
              background: 'rgba(201,162,39,0.15)',
              border: `1px solid ${gold}`,
              color: gold,
              borderRadius: 8,
              padding: '6px 18px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            CERRAR ✕
          </button>
        </div>
      </div>
    </div>
  );
}
