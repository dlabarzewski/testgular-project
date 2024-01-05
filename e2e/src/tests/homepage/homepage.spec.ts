import {
  HeaderElement,
  SubHeaderElement,
  ListingListElement,
  GenresListElement,
} from '@components/front';
import {
  App,
  it,
  describe,
  Router,
  ElementLocator,
  escapeRegExp,
  ContainerElement,
} from '@lowgular/testgular';
import { APP_CONFIG, Routes, RoutesPattern } from '@shared';

describe('Homepage', () => {
  // headers
  [
    {
      testcase: 'Main section',
      when: {
        id: 'main-section',
      },
      then: {
        header: 'Całe filmy i seriale online',
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test homepage headers: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.HOMEPAGE);

        const section = el.locateChild(ContainerElement, when.id);

        const header = section.elementLocator.locateChild(
          HeaderElement,
          HeaderElement.Selector
        );
        await header.expectContent(escapeRegExp(then.header));
      }
    );
  });

  // sub headers
  [
    {
      testcase: 'Movies section',
      when: {
        id: 'movies-section',
      },
      then: {
        subheader: 'Popularne filmy',
      },
    },
    {
      testcase: 'Movie genres section',
      when: {
        id: 'movie-genres-section',
      },
      then: {
        subheader: 'Gatunki filmów',
      },
    },
    {
      testcase: 'Middle section',
      when: {
        id: 'secondary-section',
      },
      then: {
        subheader: 'Gdzie obejrzeć po polsku filmy bez reklam?',
      },
    },
    {
      testcase: 'Tvs section',
      when: {
        id: 'tvs-section',
      },
      then: {
        subheader: 'Popularne seriale',
      },
    },
    {
      testcase: 'Tv genres section',
      when: {
        id: 'tv-genres-section',
      },
      then: {
        subheader: 'Gatunki seriali',
      },
    },
    {
      testcase: 'Bottom section',
      when: {
        id: 'tertiary-section',
      },
      then: {
        subheader: 'Dowiedz się gdzie obejrzeć ulubione produkcje',
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test homepage subheaders: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.HOMEPAGE);

        const section = el.locateChild(ContainerElement, when.id);

        const header = section.elementLocator.locateChild(
          SubHeaderElement,
          SubHeaderElement.Selector
        );
        await header.expectContent(escapeRegExp(then.subheader));
      }
    );
  });

  // items lists
  [
    {
      testcase: 'Movies list',
      when: {
        id: 'movies-section',
      },
      then: {
        itemsCount: 8,
        urlPattern: RoutesPattern.MOVIE_DETAILS,
      },
    },
    {
      testcase: 'Tvs list',
      when: {
        id: 'tvs-section',
      },
      then: {
        itemsCount: 8,
        urlPattern: RoutesPattern.TV_DETAILS,
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test homepage items list: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.HOMEPAGE);

        const section = el.locateChild(ContainerElement, when.id);

        const itemsList = section.elementLocator.locateChild(
          ListingListElement,
          ListingListElement.Selector
        );
        await itemsList.expectChildrensLength(then.itemsCount);
        await itemsList.expectChildrensData(then.urlPattern);
      }
    );
  });

  // genres lists
  [
    {
      testcase: 'Movies genres',
      when: {
        id: 'movie-genres-section',
      },
      then: {
        urlPattern: RoutesPattern.MOVIE_GENRES,
      },
    },
    {
      testcase: 'Tvs genres',
      when: {
        id: 'tv-genres-section',
      },
      then: {
        urlPattern: RoutesPattern.TV_GENRES,
      },
    },
  ].forEach(({ testcase, when, then }) => {
    it(
      `Should test homepage genres list: ${testcase}`,
      APP_CONFIG,
      async (app: App) => {
        const router = app.inject(Router);
        const el = app.inject(ElementLocator);

        await router.navigateAndWait(Routes.HOMEPAGE);

        const section = el.locateChild(ContainerElement, when.id);

        const itemsList = section.elementLocator.locateChild(
          GenresListElement,
          GenresListElement.Selector
        );
        await itemsList.expectChildrensData(then.urlPattern);
      }
    );
  });
});
