import {
  ButtonElement,
  ContainerElement,
  ElementSelector,
  InputFormControl,
  cssSelector,
  exactCaseInsensitiveRegexp,
  textSelector,
} from '@lowgular/testgular';
import { FormGroupElement } from './form-group';

interface LoginFormModel {
  email: string;
  password: string;
}

type LoginFormSelectors = {
  [key in keyof LoginFormModel]: ElementSelector;
} & {
  submit: ElementSelector;
};

export class LoginFormElement extends ContainerElement {
  static Selector = cssSelector('form');

  private _selectors: LoginFormSelectors = {
    email: cssSelector('#email'),
    password: cssSelector('#password'),
    submit: textSelector(exactCaseInsensitiveRegexp('SIGN IN')),
  };

  private _emailControl = this.elementLocator.locateChild(
    InputFormControl,
    this._selectors.email
  );
  private _passwordControl = this.elementLocator.locateChild(
    InputFormControl,
    this._selectors.password
  );
  private _submitButton = this.elementLocator.locateChild(
    ButtonElement,
    this._selectors.submit
  );

  async setValues(values: LoginFormModel) {
    await this._emailControl.setValue(values.email);
    await this._passwordControl.setValue(values.password);
  }

  async expectValues(values: LoginFormModel) {
    await this._emailControl.expectValue(values.email);
    await this._passwordControl.expectValue(values.password);
  }

  async expectErrors(messages: Partial<LoginFormModel>) {
    const formGroups = this.elementLocator.locateList(
      FormGroupElement,
      FormGroupElement.Selector
    );

    for (let key in messages) {
      const formGroup = await formGroups.findOrThrow(
        async (child: FormGroupElement) => {
          const input = child.elementLocator.locateChild(
            InputFormControl,
            this._selectors[key]
          );

          return await input.isVisible(true);
        }
      );

      await formGroup.expectError(messages[key]);
    }
  }

  async submit() {
    await this._submitButton.click();
  }
}
