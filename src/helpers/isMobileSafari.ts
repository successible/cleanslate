import { isIpad } from "./isIpad";

export const isMobileSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const isMobileSafari = iOS && webkit && !ua.match(/CriOS/i);
  return isMobileSafari || isIpad();
};
