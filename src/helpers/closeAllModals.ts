import { store } from "../store/store";

export const closeAllModals = () => {
  store.dispatch("closeAllModals");
};
