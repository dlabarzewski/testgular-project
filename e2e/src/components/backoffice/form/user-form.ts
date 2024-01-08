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

interface UserFormModel {
  name: string;
  email: string;
  password: string;
}

type UserFormSelectors = {
  [key in keyof UserFormModel]: ElementSelector;
} & {
  submit: ElementSelector;
};

export class UserFormElement extends ContainerElement {
  static Selector = cssSelector('form');

  private _selectors: UserFormSelectors = {
    name: cssSelector('[name="name"]'),
    email: cssSelector('[name="email"]'),
    password: cssSelector('[name="password"]'),
    submit: textSelector(exactCaseInsensitiveRegexp('zapisz')),
  };

  private _nameControl = this.elementLocator.locateChild(
    InputFormControl,
    this._selectors.name
  );
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

  async setValues(values: UserFormModel) {
    await this._nameControl.setValue(values.name);
    await this._emailControl.setValue(values.email);
    await this._passwordControl.setValue(values.password);
  }

  async expectValues(values: UserFormModel) {
    await this._nameControl.expectValue(values.name);
    await this._emailControl.expectValue(values.email);
    await this._passwordControl.expectValue(values.password);
  }

  async expectErrors(messages: Partial<UserFormModel>) {
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
