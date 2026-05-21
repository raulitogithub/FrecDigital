import { google } from 'googleapis';

let oauth2ClientInstance = null;
let gmailInstance = null;

// Función para inicializar el cliente (lazy initialization)
function initializeClient() {
  if (oauth2ClientInstance) {
    return oauth2ClientInstance;
  }

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

  oauth2ClientInstance = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
  );

  oauth2ClientInstance.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oauth2ClientInstance;
}

// Getters para acceso lazy
export const getOAuth2Client = () => initializeClient();

export const getGmail = () => {
  if (!gmailInstance) {
    gmailInstance = google.gmail({ version: 'v1', auth: getOAuth2Client() });
  }
  return gmailInstance;
};

// Mantener compatibilidad con código existente usando getters
export const oauth2Client = new Proxy({}, {
  get: () => initializeClient(),
});

export const gmail = new Proxy({}, {
  get: () => getGmail(),
});
