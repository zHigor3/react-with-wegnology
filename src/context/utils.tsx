import { User, Item } from "./interfaces/UserContextInterface";

const STALE_MILLIS = 6

export const craftLoadingObj = (current = {}): User | {} => ({
  isLoaded: false,
  ...current, // so isLoaded will overwrite if set
  isLoading: true,
  isError: false,
  tms: Date.now()
});

export const craftLoadedObj = (item: Item): User | {} => ({
  isLoaded: true,
  isLoading: false,
  isError: false,
  tms: Date.now(),
  item: item
});

export const craftErrorObj = (error = {}): User | {} => ({
  isLoaded: false,
  isLoading: false,
  isError: true,
  tms: Date.now(),
  error: typeof error === 'object' ? error : { message: error }
});

export const isNotRequested = (item: User) => !item || !Object.keys(item).length;
export const isLoading = (item: User) => item?.isLoading;
export const isInitialLoading = (item: User) => isNotRequested(item) || (item?.isLoading && !item?.isLoaded);
export const isReloading = (item: User) => item?.isLoading && item?.isLoaded;
export const isError = (item: User) => item?.isError;
export const isLoaded = (item: User) => item?.isLoaded;
export const isStale = (item: User) => item?.isLoaded && item?.tms && ((item?.tms + STALE_MILLIS) < Date.now());