import { LoginPage } from '../pages/login.page';

require('dotenv').config();

export const APP_URL = process.env['APP_URL'];
export const IMAGE_URL = process.env['IMAGE_URL'];

export const BACKOFFICE_EMAIL = process.env['BACKOFFICE_EMAIL'];
export const BACKOFFICE_PASSWORD = process.env['BACKOFFICE_PASSWORD'];

export const APP_CONFIG = {
  appUrl: APP_URL as string,
  routes: {
    'panel/login': LoginPage,
  },
  module: {},
};
