import { UrlMatcher } from '@lowgular/testgular';
import { APP_URL } from './app-config';

export enum Routes {
  HOMEPAGE = '/',
  BACKOFFICE_LOGIN = '/panel/login',
  BACKOFFICE = '/panel',
}

const MOVIE_SLUG_PATTERN = '[1-9]\\d*\\-[a-z0-9\\-]+';
const GENRE_SLUG_PATTERN = '[a-z\\-]+';

export const RoutesPattern = {
  MOVIE_DETAILS: UrlMatcher.startsWith(
    `${APP_URL}/caly-film/`,
    MOVIE_SLUG_PATTERN
  ),
  MOVIE_GENRES: UrlMatcher.startsWith(
    `${APP_URL}/filmy/`,
    GENRE_SLUG_PATTERN
  ),
  TV_DETAILS: UrlMatcher.startsWith(
    `${APP_URL}/caly-serial/`,
    MOVIE_SLUG_PATTERN
  ),
  TV_GENRES: UrlMatcher.startsWith(
    `${APP_URL}/seriale/`,
    GENRE_SLUG_PATTERN
  ),
};
