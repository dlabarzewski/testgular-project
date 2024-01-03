import {
  ContainerElement,
  StringOrRegExp,
  cssSelector,
} from '@lowgular/testgular';
import { ListingItemElement } from './listing-item';

export class ListingListElement extends ContainerElement {
  static Selector = cssSelector('.listing__list');

  private _items = this.elementLocator.locateList(
    ListingItemElement,
    ListingItemElement.Selector
  );

  async expectChildrensData(urlPattern: StringOrRegExp) {
    await this._items.forEachChild(async (child: ListingItemElement) => {
      await child.expectData(urlPattern);
    });
  }

  async expectChildrensLength(length: number) {
    await this._items.expectToHaveLength(length);
  }
}
