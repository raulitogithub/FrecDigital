'use client';

import Image from 'next/image';

export default function Logo({ className = 'w-10 h-10' }) {
  return (
    <Image
      src="/images/logo1.webp"
      alt="FrecDigital Logo"
      width={40}
      height={40}
      className={className}
      priority
    />
  );
}
