'use client';

import { usePathname } from 'next/navigation';
import FrecBot from '@/components/FrecBot';

export default function ChatWrapper() {
  const pathname = usePathname();
  if (pathname?.startsWith('/cortrip')) return null;
  return <FrecBot />;
}
