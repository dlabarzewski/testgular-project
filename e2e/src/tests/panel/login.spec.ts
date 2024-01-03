import {
  App,
  it,
  describe,
  Router,
  ElementLocator,
  escapeRegExp,
} from '@lowgular/testgular';
import { LoginFormElement } from '@components';
import { login } from '@utils';
import { APP_CONFIG, Routes } from '@shared';

describe('Login Page', () => {
  [
    {
      testcase: 'incorrect email',
      when: {
        values: {
          email: 'test',
          password: 'test',
        },
      },
      then: {
        values: {
          email: escapeRegExp('This field requires a valid e-mail address'),
        },
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test login form errors: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.PANEL_LOGIN);

        const form = el.locateChild(
          LoginFormElement,
          LoginFormElement.Selector
        );

        await form.setValues(when.values);

        await form.expectValues(when.values);

        await form.expectErrors(then.values);
      }
    );
  });

  [
    {
      testcase: 'empty fields',
      when: {
        startValues: {
          email: 'test',
          password: 'test',
        },
        values: {
          email: '',
          password: '',
        },
      },
      then: {
        values: {
          email: escapeRegExp('This field is required'),
          password: escapeRegExp('This field is required'),
        },
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test login form errors: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.PANEL_LOGIN);

        const form = el.locateChild(
          LoginFormElement,
          LoginFormElement.Selector
        );

        await form.setValues(when.startValues);

        await form.setValues(when.values);

        await form.expectErrors(then.values);
      }
    );
  });

  [
    {
      testcase: 'empty fields after submit',
      then: {
        values: {
          email: escapeRegExp('This field is required'),
          password: escapeRegExp('This field is required'),
        },
      },
    },
  ].forEach(({ testcase, then }) => {
    it(
      `Should test login form errors: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.PANEL_LOGIN);

        const form = el.locateChild(
          LoginFormElement,
          LoginFormElement.Selector
        );

        await form.submit();

        await form.expectErrors(then.values);
      }
    );
  });

  it(`Should test login action`, APP_CONFIG, async (app: App) => {
    const router = app.inject(Router);
    const el = app.inject(ElementLocator);

    await login(router, el);

    await router.expectAndWaitForUrl(Routes.PANEL);
  });
});
