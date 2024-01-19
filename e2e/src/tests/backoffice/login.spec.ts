import { App, describe, it } from '@lowgular/testgular';
import { LoginPage } from '../../pages/login.page';
import { APP_CONFIG, Routes } from '../../shared';

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
          email: 'This field requires a valid e-mail address',
        },
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test login form errors: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const loginPage = await app.navigateToRoute<LoginPage>(
          Routes.BACKOFFICE_LOGIN
        );

        await loginPage.typeLoginValues(when.values);

        await loginPage.expectState({
          values: when.values,
          errors: then.values,
        });
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
          email: 'This field is required',
          password: 'This field is required',
        },
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test login form errors: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const loginPage = await app.navigateToRoute<LoginPage>(
          Routes.BACKOFFICE_LOGIN
        );
        await loginPage.typeLoginValues(when.startValues);
        await loginPage.typeLoginValues(when.values);

        await loginPage.expectState({
          values: when.values,
          errors: then.values,
        });
      }
    );
  });

  [
    {
      testcase: 'empty fields after submit',
      then: {
        values: {
          email: 'This field is required',
          password: 'This field is required',
        },
      },
    },
  ].forEach(({ testcase, then }) => {
    it(
      `Should test login form errors: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const loginPage = await app.navigateToRoute<LoginPage>(
          Routes.BACKOFFICE_LOGIN
        );

        await loginPage.submit();

        await loginPage.expectState({
          values: { email: '', password: '' },
          errors: then.values,
        });
      }
    );
  });

  // it(`Should test login action`, APP_CONFIG, async (app: App) => {
  //   const loginPage = await app.navigateToRoute<LoginPage>(
  //     Routes.BACKOFFICE_LOGIN
  //   );

  //   // await loginPage.typeLoginValues()
  //   // await loginPage.submit()

  //   // await loginPage.expectSubmitSuccess()
  // });
});
