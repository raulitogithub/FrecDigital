'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

// Vídeo de un proyecto que, al ampliarlo, se abre en una ventana sobre la página
// (no a pantalla completa). Usa <dialog> nativo: Esc, foco atrapado y fondo inerte
// sin código extra. El vídeo ampliado continúa donde iba el pequeño, y al cerrar
// el pequeño queda en el mismo punto.
// heading: cabecera de la ventana con formato (por ejemplo, la marca en otro color); por defecto, title.
export default function ProjectVideo({ src, poster, captions, title, heading, label }) {
  const inlineRef = useRef(null);
  const modalRef = useRef(null);
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    const inline = inlineRef.current;
    const modal = modalRef.current;
    const wasPlaying = inline && !inline.paused;
    inline?.pause();
    dialogRef.current?.showModal();
    setOpen(true);
    if (modal && inline) {
      modal.currentTime = inline.currentTime;
      if (wasPlaying || inline.currentTime === 0) modal.play().catch(() => {});
    }
  };

  const closeModal = () => dialogRef.current?.close();

  // Al cerrar (botón, Esc o clic fuera): pausar y devolver la posición al vídeo pequeño
  const handleClose = () => {
    const modal = modalRef.current;
    const inline = inlineRef.current;
    modal?.pause();
    if (modal && inline && modal.currentTime > 0) inline.currentTime = modal.currentTime;
    setOpen(false);
  };

  // Navegadores que no respetan controlsList="nofullscreen" (Firefox, Safari):
  // si el vídeo pequeño entra en pantalla completa, salir y abrir la ventana.
  useEffect(() => {
    const onFullscreen = () => {
      if (document.fullscreenElement && document.fullscreenElement === inlineRef.current) {
        document.exitFullscreen().catch(() => {});
        openModal();
      }
    };
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  });

  // Sin desplazamiento de la página mientras la ventana está abierta
  useEffect(() => {
    if (!open) return undefined;
    const { documentElement } = document;
    const previous = documentElement.style.overflow;
    documentElement.style.overflow = 'hidden';
    return () => {
      documentElement.style.overflow = previous;
    };
  }, [open]);

  const tracks = captions ? <track kind="captions" src={captions} srcLang="es" label="Español" /> : null;

  return (
    <>
      <div className="relative w-full group/video">
        {/* preload="none": el vídeo solo se descarga si el visitante pulsa play */}
        <video
          ref={inlineRef}
          controls
          controlsList="nofullscreen"
          disablePictureInPicture
          playsInline
          preload="none"
          poster={poster}
          width={1920}
          height={1080}
          className="video-sin-pantalla-completa w-full h-auto aspect-video"
          aria-label={label}
          onDoubleClick={openModal}
        >
          <source src={src} type="video/mp4" />
          {tracks}
          Tu navegador no puede reproducir el vídeo. <a href={src}>Descárgalo aquí</a>.
        </video>
        <button
          type="button"
          onClick={openModal}
          aria-label="Ampliar el vídeo"
          title="Ampliar"
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[#00b4d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b4d8]"
        >
          <Maximize2 aria-hidden="true" size={14} />
          Ampliar
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
        className="m-auto w-[min(72rem,calc(100vw_-_2rem),calc((100dvh_-_7rem)*16/9_+_2.5rem))] max-w-none rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-[#0a1628]/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/images/logo1.webp"
              alt="FrecDigital"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 rounded-lg sm:h-10 sm:w-10"
            />
            <p className="truncate text-lg font-bold text-[#1a3a6b] font-display sm:text-xl">{heading ?? title}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Cerrar el vídeo"
            className="shrink-0 rounded-full p-1.5 text-[#1a3a6b] transition-colors hover:bg-[#e8f4fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00b4d8]"
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <div className="px-3 pb-3 sm:px-5 sm:pb-5">
          <video
            ref={modalRef}
            controls
            disablePictureInPicture
            playsInline
            preload="none"
            poster={poster}
            width={1920}
            height={1080}
            className="block w-full h-auto aspect-video rounded-xl bg-[#0a1628]"
            aria-label={label}
          >
            <source src={src} type="video/mp4" />
            {tracks}
          </video>
        </div>
      </dialog>
    </>
  );
}
