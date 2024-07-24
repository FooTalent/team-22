import { google } from 'googleapis'
import { googleEnv } from '../../config/env.js';

const OAuth2 = google.auth.OAuth2;

export const oauth2Client = new OAuth2(
  googleEnv.clienId,
  googleEnv.clientSecret,
  googleEnv.redirecUri
);

export const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];