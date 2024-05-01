import { useEffect } from "react";
import { loginKey } from "../helpers/constants";
import { logout } from "../helpers/logout";

export const useLogoutOtherTab = () => {
  useEffect(() => {
    const isLoggedIn = (e: StorageEvent) => {
      e.newValue === "null" &&
        localStorage.getItem(loginKey) !== "null" &&
        logout();
    };
    window.addEventListener("storage", isLoggedIn);
    return () => {
      window.removeEventListener("storage", isLoggedIn);
    };
  }, []);
};
