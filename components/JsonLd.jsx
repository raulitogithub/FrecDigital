// Inserta datos estructurados JSON-LD. Escapa "<" para que el contenido
// no pueda cerrar la etiqueta <script> antes de tiempo.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
