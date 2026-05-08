'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import '../app/n8n-chat.css';
import { createChat } from '@n8n/chat';

export default function N8nChat() {
  useEffect(() => {
    createChat({
      webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
      initialMessages: [
        '¡Hola!  Soy el asistente virtual de FrecDigital. ¿En qué puedo ayudarte hoy?'
      ],
      i18n: {
        en: {
          title: 'FrecDigital',
          subtitle: 'Asistente virtual',
          footer: '',
          getStarted: 'Iniciar conversación',
          inputPlaceholder: 'Escribe tu mensaje...',
          closeButtonTooltip: 'Cerrar chat',
        }
      },
      theme: {
        primaryColor: '#1a3a6b',
        secondaryColor: '#00b4d8',
      }
    });
  }, []);

  return <div></div>;
}
