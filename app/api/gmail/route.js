import { getGmail } from '@/lib/gmail';

export async function GET() {
  try {
    const gmail = getGmail();
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'is:unread',
    });

    const messages = response.data.messages || [];

    if (messages.length === 0) {
      return Response.json({ success: true, emails: [] });
    }

    const emails = await Promise.all(
      messages.map(async (msg) => {
        const detail = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full',
        });

        const headers = detail.data.payload.headers;
        const subject = headers.find(h => h.name === 'Subject')?.value || 'Sin asunto';
        const from = headers.find(h => h.name === 'From')?.value || 'Desconocido';
        const date = headers.find(h => h.name === 'Date')?.value || '';
        const snippet = detail.data.snippet || '';

        return { id: msg.id, subject, from, date, snippet };
      })
    );

    return Response.json({ success: true, emails });

  } catch (error) {
    console.error('Error Gmail API:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
