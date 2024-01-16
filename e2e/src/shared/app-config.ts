import { UserCreatePage } from "../pages/backoffice/user-create.page";
import { UserEditPage } from "../pages/backoffice/user-edit.page";
import { UserListPage } from "../pages/backoffice/user-list.page";

require('dotenv').config();

export const APP_URL = process.env['APP_URL'];
export const IMAGE_URL = process.env['IMAGE_URL'];

export const BACKOFFICE_EMAIL = process.env['BACKOFFICE_EMAIL'];
export const BACKOFFICE_PASSWORD = process.env['BACKOFFICE_PASSWORD'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {
    '/panel/user/create': UserCreatePage,
    '/panel/user/:id/edit': UserEditPage,
    '/panel/user': UserListPage,
  },
  module: {
    // declarations: [
    //   UserListPage, UserCreatePage, UserEditPage
    // ]
  },
};
