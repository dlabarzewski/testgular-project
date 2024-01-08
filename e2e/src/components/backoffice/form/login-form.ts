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

type LoginFormModel = {
  email: string;
  password: string;
};

export class LoginFormElement extends FormAbstractElement<LoginFormModel> {
  protected _selectors: SelectorsType = {
    email: cssSelector('#email'),
    password: cssSelector('#password'),
    submit: textSelector(exactCaseInsensitiveRegexp('SIGN IN')),
  };

  protected _controls: ControlsType = {
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
