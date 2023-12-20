require('dotenv').config();

export const APP_URL = process.env['APP_URL'];
export const IMAGE_URL = process.env['IMAGE_URL'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {},
  module: {},
};
