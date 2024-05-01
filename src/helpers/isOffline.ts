import { store } from "../store/store";
import { isBrowser } from "./isBrowser";

export const isOffline = (offline?: boolean) =>
  isBrowser() &&
  (offline !== undefined
    ? undefined
    : store.get().navbar.offline === true || window.navigator.onLine === false);
