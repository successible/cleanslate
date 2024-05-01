import { getActiveModals } from "./getActiveModals";

/** Check if any of the modals controlled by the navbar are current spawned.
 * If any are, return true. Otherwise, return false. */
export const modalsAreActive = (): boolean => {
  return getActiveModals().length > 0;
};
