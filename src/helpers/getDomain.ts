import { isProduction } from "./isProduction";

export const getDomain = () =>
  isProduction() ? window.location.hostname : "localhost";
