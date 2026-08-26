'use client';

import { useEffect, useRef, useState } from 'react';

const gold = '#c9a227';
const navy = '#081539';

export default function VideoIntro({ src }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [visible]);

  function startClose() {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      setClosing(true);
      setTimeout(() => setVisible(false), 400);
    }, 3000);
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
          muted={false}
          controls={false}
          style={{ display: 'block', width: '100%', maxHeight: '80vh', objectFit: 'contain', background: '#000' }}
          onEnded={startClose}
        />

        {/* Barra inferior con botón cerrar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px 16px',
          background: 'linear-gradient(transparent, rgba(8,21,57,0.9))',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
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
