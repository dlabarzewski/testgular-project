import {
  App,
  ElementLocator,
  NumberMatcher,
  Router,
  describe,
  exactCaseInsensitiveRegexp,
  it,
} from '@lowgular/testgular';
import { login } from '@utils';
import { TableCardElement } from '../../components/backoffice';
import {
  APP_CONFIG,
  BackofficeRoutesPattern,
  DATETIME_MATCHER,
  GENRE_SLUG_PATTERN,
  NOT_EMPTY_MATCHER,
  Routes,
  YES_OR_NOT_MATCHER,
} from '../../shared';

describe('Backoffice: Movie genre', () => {
  it(`Should test movie genres table content`, APP_CONFIG, async (app: App) => {
    const router = app.inject(Router);
    const el = app.inject(ElementLocator);

    await login(router, el);

    await router.navigateAndWait(Routes.BACKOFFICE_MOVIE_GENRE_LIST);

    const expectedData = {
      title: exactCaseInsensitiveRegexp('Lista Gatunków Filmów'),
      header: [
        'ID',
        'TMDB ID',
        'Nazwa',
        'Slug',
        'Opis',
        'Tytuł SEO',
        'Opis SEO',
        'Utworzony',
        'Opcje',
      ],
      content: [
        NumberMatcher.positive(),
        NumberMatcher.positive(),
        NOT_EMPTY_MATCHER,
        GENRE_SLUG_PATTERN,
        YES_OR_NOT_MATCHER,
        YES_OR_NOT_MATCHER,
        YES_OR_NOT_MATCHER,
        DATETIME_MATCHER,
        [
          {
            text: 'Edytuj',
            urlPattern: BackofficeRoutesPattern.MOVIE_GENRE_EDIT,
          },
          {
            text: 'Usuń',
            urlPattern: undefined,
          },
        ],
      ],
    };

    const card = el.locateChild(TableCardElement, TableCardElement.Selector);

    await card.expectData(expectedData);
  });
});
