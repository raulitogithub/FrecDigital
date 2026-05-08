import { google } from 'googleapis';

// Validar que las variables de entorno estén definidas
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID no está definido en variables de entorno');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET no está definido en variables de entorno');
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error('GOOGLE_REFRESH_TOKEN no está definido en variables de entorno');
}

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
