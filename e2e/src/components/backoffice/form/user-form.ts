import {
  ButtonElement,
  InputFormControl,
  cssSelector,
  exactCaseInsensitiveRegexp,
  textSelector,
} from '@lowgular/testgular';
import {
  ControlsType,
  FormAbstractElement,
  SelectorsType,
} from './form.abstract';

type UserFormModel = {
  name: string;
  email: string;
  password: string;
};

export class UserFormElement extends FormAbstractElement<UserFormModel> {
  static Selector = cssSelector('form');

  protected _selectors: SelectorsType = {
    name: cssSelector('[name="name"]'),
    email: cssSelector('[name="email"]'),
    password: cssSelector('[name="password"]'),
    submit: textSelector(exactCaseInsensitiveRegexp('zapisz')),
  };

  protected _controls: ControlsType = {
    name: this.elementLocator.locateChild(
      InputFormControl,
      this._selectors.name
    ),
    email: this.elementLocator.locateChild(
      InputFormControl,
      this._selectors.email
    ),
    password: this.elementLocator.locateChild(
      InputFormControl,
      this._selectors.password
    ),
    submit: this.elementLocator.locateChild(
      ButtonElement,
      this._selectors.submit
    ),
  };
}
