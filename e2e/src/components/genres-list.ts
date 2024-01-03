import {
  ContainerElement,
  StringOrRegExp,
  cssSelector,
} from '@lowgular/testgular';
import { GenresItemElement } from './genres-item';

export class GenresListElement extends ContainerElement {
  static Selector = cssSelector('.listing__genres');

  private _items = this.elementLocator.locateList(
    GenresItemElement,
    GenresItemElement.Selector
  );

  async expectChildrensData(urlPattern: StringOrRegExp) {
    await this._items.forEachChild(async (child: GenresItemElement) => {
      await child.expectData(urlPattern);
    });
  }
}
