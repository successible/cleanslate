import { loginKey, tokenKey } from "./constants";

export const clearLoginState = () => {
  // Remove any query parameters from the URL to prevent accidentally being logged back in
  window.history.replaceState(null, "null", window.location.pathname);

  localStorage.setItem(loginKey, "null");
  localStorage.setItem(tokenKey, "null");
  localStorage.setItem("JWT", "null");

  // Tell the other tab that the user has logged out
  window.dispatchEvent(new Event("storage"));
};
