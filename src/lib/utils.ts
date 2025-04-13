import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { PER_PAGE } from '@/lib/constants';
import { type StudioValue } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}

type QueryValue = string | string[] | undefined | null;

export function parseQuery(value: QueryValue) {
  return typeof value === 'string' ? value : '';
}

export function parsePageQuery(value: QueryValue) {
  return typeof value === 'string' ? parseInt(value) : 1;
}

export function parsePerPageQuery(value: QueryValue) {
  const { SMALL, MEDIUM, LARGE } = PER_PAGE;
  const perPage = typeof value === 'string' ? parseInt(value) : PER_PAGE.SMALL;

  if (perPage === SMALL) return SMALL;
  if (perPage === MEDIUM) return MEDIUM;
  if (perPage === LARGE) return LARGE;
  return SMALL;
}

export function parseStudioQuery(value: QueryValue): StudioValue {
  return value === 'true' ? value : 'false';
}

export function parseAdminQuery(query: Record<string, QueryValue>) {
  return {
    artist: parseQuery(query.artist),
    page: parsePageQuery(query.page),
    perPage: parsePerPageQuery(query.perPage),
    sort: parseQuery(query.sort),
    studio: parseStudioQuery(query.studio),
    title: parseQuery(query.title),
  };
}

export async function wait(ms = 0) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
