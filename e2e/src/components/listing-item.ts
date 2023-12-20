import {
  ButtonElement,
  ContainerElement,
  FileMatcher,
  ImageElement,
  NumberMatcher,
  SimpleElement,
  StringOrRegExp,
  TextElement,
  UrlMatcher,
  cssSelector,
} from '@lowgular/testgular';
import { IMAGE_URL } from '../shared/app-config';
import { NOT_EMPTY_MATCHER } from '../shared/custom-matchers';

export class ListingItemElement extends ContainerElement {
  static Selector = cssSelector('.listing__item');

  private _ratesCount = 5;

  private _link = this.elementLocator.locateChild(
    ButtonElement,
    cssSelector('.listing__link')
  );
  private _image = this.elementLocator.locateChild(
    ImageElement,
    cssSelector('.listing__image')
  );
  private _title = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.listing__title')
  );
  private _rates = this.elementLocator.locateList(
    SimpleElement,
    cssSelector('.listing__rate i')
  );
  private _genres = this.elementLocator.locateChild(
    TextElement,
    cssSelector('.listing__genres')
  );

  private async _getYear() {
    const infoItems = this.elementLocator.locateList(
      TextElement,
      cssSelector('.listing__short-info-item')
    );

    const infoItemsLength = await infoItems.length();

    return await infoItems.getNthElement(infoItemsLength - 1);
  }

  async expectData(url: StringOrRegExp) {
    await this._link.expectAttribute('href', url);

    await this._image.expectAttribute(
      'data-src',
      UrlMatcher.startsWith(
        IMAGE_URL,
        FileMatcher.fileName(FileMatcher.imageExtension)
      )
    );

    await this._title.expectContent(NOT_EMPTY_MATCHER);

    await this._rates.expectToHaveLength(this._ratesCount);

    await this._genres.expectContent(NOT_EMPTY_MATCHER);

    const year = await this._getYear();

    await year.expectContent(NumberMatcher.positive());
  }
}
