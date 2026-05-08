'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderCheck, Users, Star, Calendar } from 'lucide-react';

export default function StatCounter({ endValue, label, prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  // Determinar ícono basado en el label
  const getIcon = () => {
    if (label.includes('Proyectos')) return FolderCheck;
    if (label.includes('Clientes')) return Users;
    if (label.includes('Satisfacción')) return Star;
    if (label.includes('Años')) return Calendar;
    return FolderCheck;
  };

  const IconComponent = getIcon();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;

          // Animate the counter
          let current = 0;
          const increment = endValue / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
              setCount(endValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [endValue]);

  return (
    <motion.div 
      ref={ref} 
      className="bg-white/80 rounded-2xl p-8 text-center border border-[#b0cfe8] hover:border-[#00b4d8]/40 hover:shadow-xl hover:shadow-[#00b4d8]/20 transition-all duration-500 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Línea decorativa superior que crece en hover */}
      <div className="w-12 h-1 bg-[#00b4d8] rounded-full mx-auto mb-6 group-hover:w-20 transition-all duration-500" />

      {/* Ícono decorativo */}
      <div className="w-12 h-12 bg-[#e8f4fc] rounded-full flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-6 h-6 text-[#00b4d8]" />
      </div>

      {/* Contador */}
      <div className="text-5xl font-bold text-[#1a3a6b] mb-2">
        <span className="text-[#00b4d8]">{prefix}</span>
        {count}
        {label.includes('Satisfacción') && <span className="text-[#00b4d8]">%</span>}
      </div>

      {/* Label */}
      <p className="text-[#64748b] text-sm font-medium uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}
