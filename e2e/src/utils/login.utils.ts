import { ElementLocator, Router } from '@lowgular/testgular';
import { LoginFormElement } from '../components/form/login-form';
import { PANEL_EMAIL, PANEL_PASSWORD, Routes } from '@shared';

const CREDENTIALS = {
  email: PANEL_EMAIL,
  password: PANEL_PASSWORD,
};

export const login = async (router: Router, el: ElementLocator) => {
  await router.navigateAndWait(Routes.PANEL_LOGIN);

  const form = el.locateChild(LoginFormElement, LoginFormElement.Selector);

  await form.setValues(CREDENTIALS);

  await form.submit();
};
