import { getOAuth2Client } from '@/lib/gmail';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  try {
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    return Response.json({
      success: true,
      refresh_token: tokens.refresh_token,
      message: 'Copia el refresh_token y agrégalo a tu .env.local',
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
