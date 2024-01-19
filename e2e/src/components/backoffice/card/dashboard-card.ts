import {
  ButtonElement,
  ContainerElement,
  StringOrRegExp,
  TextElement,
  cssSelector,
} from '@lowgular/testgular';
import { DATETIME_MATCHER } from '../../../shared';
import { CardElement } from './card';

export class DashboardCardElement extends CardElement {
  private _items = this.elementLocator.locateList(
    ContainerElement,
    cssSelector('.list.border-bottom')
  );

  async expectChildrensData(urlPattern: StringOrRegExp) {
    await this._items.forEachChild(async (child: ContainerElement) => {
      const link = child.elementLocator.locateChild(
        ButtonElement,
        cssSelector('.btn')
      );

      await link.expectAttribute('href', urlPattern);

      const date = child.elementLocator.locateChild(
        TextElement,
        cssSelector('p.text-small')
      );

      await date.expectContent(DATETIME_MATCHER);
    });
  }
}
