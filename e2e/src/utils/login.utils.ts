import { ElementLocator, Router } from '@lowgular/testgular';
import { LoginFormElement } from '@components/backoffice';
import { BACKOFFICE_EMAIL, BACKOFFICE_PASSWORD, Routes } from '@shared';

const CREDENTIALS = {
  email: BACKOFFICE_EMAIL,
  password: BACKOFFICE_PASSWORD,
};

export const login = async (router: Router, el: ElementLocator) => {
  await router.navigateAndWait(Routes.BACKOFFICE_LOGIN);

  const form = el.locateChild(LoginFormElement, LoginFormElement.Selector);

  await form.setValues(CREDENTIALS);

  await form.submit();

  await router.expectAndWaitForUrl(Routes.BACKOFFICE);
};
