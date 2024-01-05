import { TextElement, cssSelector } from '@lowgular/testgular';

export class HeaderElement extends TextElement {
  static Selector = cssSelector('h1');
}
