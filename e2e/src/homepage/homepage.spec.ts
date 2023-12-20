import {
  App,
  it,
  describe,
  Router,
  ElementLocator,
  escapeRegExp,
} from '@lowgular/testgular';
import { APP_CONFIG } from '../shared/app-config';
import { Routes, RoutesPattern } from '../shared/routes';
import { HeaderElement } from '../components/header';
import { SubHeaderElement } from '../components/sub-header';
import { ListingListElement } from '../components/listing-list';
import { GenresListElement } from '../components/genres-list';

describe('Homepage', () => {
  [
    {
      then: {
        header: 'Całe filmy i seriale online',
        subheaders: [
          'Popularne filmy',
          'Gatunki filmów',
          'Gdzie obejrzeć po polsku filmy bez reklam?',
          'Popularne seriale',
          'Gatunki seriali',
          'Dowiedz się gdzie obejrzeć ulubione produkcje',
        ],
      },
    },
  ].forEach(({ then }) => {
    it('Should test homepage content', APP_CONFIG, async (app: App) => {
      const router = app.inject(Router);
      const el = app.inject(ElementLocator);

      await router.navigateAndWait(Routes.HOMEPAGE);

      // h1
      const header = el.locateChild(HeaderElement, HeaderElement.Selector);
      await header.expectContent(escapeRegExp(then.header));

      // h2
      const subHeaders = el.locateList(
        SubHeaderElement,
        SubHeaderElement.Selector
      );
      await subHeaders.expectToHaveLength(then.subheaders.length);
      await subHeaders.forEachChild(
        async (subHeader: SubHeaderElement, index: number) => {
          await subHeader.expectContent(escapeRegExp(then.subheaders[index]));
        }
      );

      const itemsLists = el.locateList(
        ListingListElement,
        ListingListElement.Selector
      );

      // movies
      const moviesList = await itemsLists.getNthElement(0);
      await moviesList.expectChildrensLength(8);
      await moviesList.expectChildrensData(RoutesPattern.MOVIE_DETAILS);

      // tvs
      const tvsList = await itemsLists.getNthElement(1);
      await tvsList.expectChildrensLength(8);
      await tvsList.expectChildrensData(RoutesPattern.TV_DETAILS);

      const genresLists = el.locateList(
        GenresListElement,
        GenresListElement.Selector
      );

      // movie genres
      const moviesGenres = await genresLists.getNthElement(0);
      await moviesGenres.expectChildrensData(RoutesPattern.MOVIE_GENRES);

      // tv genres
      const tvsGenres = await genresLists.getNthElement(1);
      await tvsGenres.expectChildrensData(RoutesPattern.TV_GENRES);
    });
  });
});
