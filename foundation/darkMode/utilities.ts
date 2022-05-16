import { Mode } from './types';

export function setDarkModeCookieValue(mode: Mode) {
  return window.localStorage.setItem('dark_mode', mode);
}

export function getDarkModeCookieValue() {
  return window.localStorage.getItem('dark_mode');
}

export function getPreferredTheme(): Mode {
  if (
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined'
  ) {
    return '';
  }

  const preferredTheme = getDarkModeCookieValue();
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  return (
    (preferredTheme as Mode) || ((darkQuery.matches ? 'dark' : 'light') as Mode)
  );
}
