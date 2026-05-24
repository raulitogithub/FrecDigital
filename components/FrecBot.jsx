'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function FrecBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const messagesEndRef = useRef(null);

  // Mensaje de bienvenida automático
  useEffect(() => {
    if (isOpen && !hasOpenedOnce) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          // CAMBIO 3: Mensaje de bienvenida acortado
          text: '¡Hola! ¿Cómo te ayudo?',
          timestamp: new Date(),
        },
      ]);
      setHasOpenedOnce(true);
    }
  }, [isOpen, hasOpenedOnce]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: trimmedMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Preparar historial para enviar al API
      const history = messages.map((msg) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: history,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener respuesta');
      }

      const data = await response.json();

      // Agregar respuesta del bot
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);

      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: ' Lo siento, tuve un problema procesando tu mensaje. Intenta de nuevo.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* CAMBIO 1: Botón flotante estilo WhatsApp pero en cian con imagen */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform overflow-hidden border-2 border-cyan-600"
            aria-label="Abrir chat"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} color="#fff" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src="/images/avatar1.png"
                    alt="FrecBot"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[380px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden z-40"
          >
            {/* CAMBIO 2: Header con avatar, nombre y estado */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 border-b border-blue-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/avatar1.png"
                  alt="FrecBot"
                  width={36}
                  height={36}
                  className="rounded-full object-cover border-2 border-cyan-500"
                />
                <div>
                  <h2 className="text-white font-semibold text-sm">FrecBot</h2>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    En línea
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-slate-900 to-slate-950">
              {/* CAMBIO 3: Mensajes más pequeños, avatar reducido, gap menor */}
              <div className="flex flex-col gap-1">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden shadow-md">
                        <Image
                          src="/images/avatar1.png"
                          alt="FrecBot Avatar"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-2 py-1 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-cyan-500 text-white rounded-br-none shadow-md'
                          : 'bg-slate-800 text-gray-200 rounded-bl-none border border-slate-700 shadow-md'
                      }`}
                    >
                      <p className="text-xs leading-tight whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`text-[10px] mt-0.5 ${
                          message.type === 'user' ? 'text-cyan-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Indicador de escritura */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start gap-2"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
                    <Image
                      src="/images/avatar1.png"
                      alt="FrecBot Avatar"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-800 text-gray-400 px-4 py-2 rounded-lg rounded-bl-none border border-slate-700">
                    <div className="flex gap-1 items-center">
                      <motion.div
                        className="w-2 h-2 bg-cyan-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-cyan-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-cyan-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-slate-800 px-4 py-3 border-t border-slate-700 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                disabled={isLoading}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                aria-label="Enviar mensaje"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
