import { UrlMatcher } from '@lowgular/testgular';
import { APP_URL } from './app-config';

export enum Routes {
  HOMEPAGE = '',
  BACKOFFICE_LOGIN = 'panel/login',
  BACKOFFICE_DASHBOARD = 'panel',
  BACKOFFICE_MOVIE_GENRE_LIST = 'panel/movie-genre',

  BACKOFFICE_USER_LIST = 'panel/user',
  BACKOFFICE_USER_CREATE = 'panel/user/create',
}

export const MOVIE_SLUG_PATTERN = '[1-9]\\d*\\-[a-z0-9\\-]+';
export const GENRE_SLUG_PATTERN = '[a-z\\-]+';

export const RoutesPattern = {
  MOVIE_DETAILS: UrlMatcher.startsWith(
    `${APP_URL}caly-film/`,
    MOVIE_SLUG_PATTERN
  ),
  MOVIE_GENRES: UrlMatcher.startsWith(`${APP_URL}filmy/`, GENRE_SLUG_PATTERN),
  TV_DETAILS: UrlMatcher.startsWith(
    `${APP_URL}caly-serial/`,
    MOVIE_SLUG_PATTERN
  ),
  TV_GENRES: UrlMatcher.startsWith(`${APP_URL}seriale/`, GENRE_SLUG_PATTERN),
};

export const BackofficeRoutesPattern = {
  MOVIE_EDIT: `${APP_URL}panel/movie/\\d+/edit`,
  TV_EDIT: `${APP_URL}panel/tv/\\d+/edit`,

  MOVIE_GENRE_EDIT: `${APP_URL}panel/movie-genre/\\d+/edit`,

  USER_EDIT: `${APP_URL}panel/user/\\d+/edit`,
};
