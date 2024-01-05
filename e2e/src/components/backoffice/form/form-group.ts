import {
  CssClassBasedActivableElement,
  TextElement,
  cssSelector,
  escapeRegExp,
} from '@lowgular/testgular';

export class FormGroupElement extends CssClassBasedActivableElement {
  static Selector = cssSelector('.form-group');

  private _errorClass = 'has-danger';
  private _errorMessageSelector = cssSelector('.pristine-error');

  async expectError(message: string) {
    await this.expectActive(this._errorClass);

    const errorMessage = this.elementLocator.locateChild(
      TextElement,
      this._errorMessageSelector
    );

    await errorMessage.expectContent(escapeRegExp(message));
  }
}
