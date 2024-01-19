import {
  ButtonElement,
  InputFormControl,
  exactCaseInsensitiveRegexp,
  labelSelector,
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
  protected _selectors: SelectorsType = {
    name: labelSelector(exactCaseInsensitiveRegexp('nazwa')),
    email: labelSelector(exactCaseInsensitiveRegexp('email')),
    password: labelSelector(exactCaseInsensitiveRegexp('hasło')),
    submit: textSelector(exactCaseInsensitiveRegexp('zapisz')),
  };

  protected _controls: ControlsType = {
    name: this.elementLocator.locateChild(
      InputFormControl,
      this._selectors['name']
    ),
    email: this.elementLocator.locateChild(
      InputFormControl,
      this._selectors['email']
    ),
    password: this.elementLocator.locateChild(
      InputFormControl,
      this._selectors['password']
    ),
    submit: this.elementLocator.locateChild(
      ButtonElement,
      this._selectors['submit']
    ),
  };
}
