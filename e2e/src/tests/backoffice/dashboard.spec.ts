import {
  App,
  it,
  describe,
  Router,
  ElementLocator,
  exactCaseInsensitiveRegexp,
} from '@lowgular/testgular';
import { login } from '@utils';
import { APP_CONFIG, BackofficeRoutesPattern } from '@shared';
import { DashboardCardElement } from '@components/backoffice';

describe('Backoffice: Dashboard', () => {
  it(`Should test dashboard cards`, APP_CONFIG, async (app: App) => {
    const router = app.inject(Router);
    const el = app.inject(ElementLocator);

    await login(router, el);

    const expectedContent = [
      {
        title: 'Najnowsze Filmy',
        urlPattern: BackofficeRoutesPattern.MOVIE_EDIT,
      },
      {
        title: 'Najnowsze Seriale',
        urlPattern: BackofficeRoutesPattern.TV_EDIT,
      },
      {
        title: 'Najnowsze Filmy Bez Opisu',
        urlPattern: BackofficeRoutesPattern.MOVIE_EDIT,
      },
      {
        title: 'Najnowsze Seriale Bez Opisu',
        urlPattern: BackofficeRoutesPattern.TV_EDIT,
      },
    ];

    const cards = el.locateList(
      DashboardCardElement,
      DashboardCardElement.Selector
    );

    await cards.forEachChild(
      async (card: DashboardCardElement, index: number) => {
        const data = expectedContent[index];

        if (data) {
          await card.expectTitle(exactCaseInsensitiveRegexp(data.title));

          await card.expectChildrensData(data.urlPattern);
        }
      }
    );
  });
});
