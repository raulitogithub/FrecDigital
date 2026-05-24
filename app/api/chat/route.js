import { getChatbotResponse } from '@/lib/frecbot-local';

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    // Validar que el mensaje no esté vacío
    if (!message || message.trim() === '') {
      return Response.json(
        { error: 'El mensaje no puede estar vacío' },
        { status: 400 }
      );
    }

    // Usar la lógica local del chatbot (sin API externa)
    const botResponse = getChatbotResponse(message);

    return Response.json({
      success: true,
      message: botResponse,
      stop_reason: 'end_turn',
    });
  } catch (error) {
    console.error('Error en el chat API:', {
      message: error.message,
      stack: error.stack
    });

    return Response.json(
      { error: 'Error al procesar tu mensaje. Intenta más tarde.' },
      { status: 500 }
    );
  }
}
