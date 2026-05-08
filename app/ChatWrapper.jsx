'use client';

import dynamic from 'next/dynamic';

const N8nChat = dynamic(() => import('@/components/N8nChat'), { ssr: false });

export default function ChatWrapper() {
  return <N8nChat />;
}
