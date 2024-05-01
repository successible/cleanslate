import React from "react";
import { store } from "../store/store";

export const useOffline = () => {
  React.useEffect(() => {
    window.addEventListener("offline", () => {
      store.dispatch("isOffline", true);
    });
    window.addEventListener("online", () => {
      store.dispatch("isOffline", false);
    });
  }, []);
};
