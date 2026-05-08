'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = '593984563874';
  const message = '“Hola. Me interesa conocer más sobre sus servicios, ¿podrían brindarme más información? Muchas gracias.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-24 right-6 z-50 group">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full border-2 border-white/30 shadow-xl shadow-[#25D366]/40 hover:bg-[#20c55e] hover:shadow-[#25D366]/60 transition-colors duration-300"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <FaWhatsapp className="text-3xl text-white" />

        
      </motion.a>

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
        <div className="bg-white text-[#1a3a6b] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
          Escríbenos por WhatsApp
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
