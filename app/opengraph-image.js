import { ImageResponse } from 'next/og';
import { company } from '@/lib/seo-metadata';

// Imagen para compartir en redes (Open Graph), generada en build a 1200×630.
export const alt = `${company.name} · ${company.shortDescription}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const countries = company.locations.map((l) => l.countryName).join(' · ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', width: 120, height: 8, borderRadius: 4, background: '#00b4d8', marginBottom: 40 }} />
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>
          {company.name}
        </div>
        <div style={{ display: 'flex', fontSize: 42, color: '#00b4d8', marginTop: 16 }}>
          {company.shortDescription}
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: 'rgba(255,255,255,0.7)', marginTop: 48 }}>
          {countries}
        </div>
      </div>
    ),
    size
  );
}
