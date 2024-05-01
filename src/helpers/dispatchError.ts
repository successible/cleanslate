import { getStore } from "./getStore";

export const dispatchError = (error: any) => {
  const store = getStore();
  if (error === "") {
    store.dispatch("closeError");
    // If any error exists, you should open the error modal but only if it is not already present
  } else if (store.get().navbar.errorVisibility === false) {
    store.dispatch("openError", error);
  } else {
    // Do nothing
  }
};
