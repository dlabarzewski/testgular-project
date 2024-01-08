import {
  ContainerElement,
  StringOrRegExp,
  TextElement,
  cssSelector,
} from '@lowgular/testgular';

export class CardElement extends ContainerElement {
  static Selector = cssSelector('.card');

  private _title = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.card-title')
  );

  async expectTitle(value: StringOrRegExp) {
    await this._title.expectContent(value);
  }
}
