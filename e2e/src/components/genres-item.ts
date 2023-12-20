import {
  ButtonElement,
  ContainerElement,
  StringOrRegExp,
  cssSelector,
} from '@lowgular/testgular';
import { NOT_EMPTY_MATCHER } from '../shared/custom-matchers';

export class GenresItemElement extends ContainerElement {
  static Selector = cssSelector('.listing__genres-item');

  private _link = this.elementLocator.locateChild(
    ButtonElement,
    cssSelector('a')
  );

  async expectData(url: StringOrRegExp) {
    await this._link.expectAttribute('href', url);

    await this.expectContent(NOT_EMPTY_MATCHER);
  }
}
