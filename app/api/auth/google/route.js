import { oauth2Client } from '@/lib/gmail';

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.modify',
    ],
    prompt: 'consent',
  });
  return Response.redirect(url);
}
