import {
  Component,
  ElementLocator,
  HttpClient,
  Router,
} from '@lowgular/testgular';
import { LoginFormElement } from '../components/backoffice/form';

export interface LoginValues {
  readonly email: string;
  readonly password: string;
}

@Component()
export class LoginPage {
  private form = this.el.locateChild(
    LoginFormElement,
    LoginFormElement.Selector
  );
  constructor(
    private readonly el: ElementLocator,
    private readonly client: HttpClient,
    private readonly router: Router
  ) {}

  async typeLoginValues(values: LoginValues) {
    await this.form.setValues(values);
  }

  async submit() {
    await this.form.submit();
  }

  async expectState(state: {
    values: LoginValues;
    errors: Partial<LoginValues>;
  }) {
    await this.form.expectValues(state.values);
    await this.form.expectErrors(state.errors);
  }

  async expectSubmitSuccess(values: LoginValues) {
    await this.client.expectPost(``, {
      email: values.email,
      password: values.password,
    });
    await this.router.expectAndWaitForUrl('');
  }
}
