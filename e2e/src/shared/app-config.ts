require('dotenv').config();

export const APP_URL = process.env['APP_URL'];
export const IMAGE_URL = process.env['IMAGE_URL'];

export const PANEL_EMAIL = process.env['PANEL_EMAIL'];
export const PANEL_PASSWORD = process.env['PANEL_PASSWORD'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {},
  module: {},
};
