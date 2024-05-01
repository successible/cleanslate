export const isIpad = () =>
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
