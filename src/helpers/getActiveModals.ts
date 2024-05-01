import { getStore } from "./getStore";

/** Get all modals currently spawned by the navbar  */
export const getActiveModals = () => {
  return getStore().get().navbar.activeModals;
};
