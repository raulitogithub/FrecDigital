import Image from 'next/image';

// Icono de FrecBot: render 3D de un asistente con forma de globo de chat, en los
// colores de la marca, recortado en círculo con fondo transparente (256×256 px).
// Se usa en el botón flotante (56 px), la cabecera del chat (36 px) y junto a cada
// mensaje del bot (24 px). Decorativo: el texto accesible lo pone el elemento que
// lo contiene (p. ej. aria-label="Abrir chat con FrecBot").
export default function ChatBotIcon({ size = 56, className = '', priority = false }) {
  return (
    <Image
      src="/images/frecbot-ia.webp"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full ${className}`}
    />
  );
}
