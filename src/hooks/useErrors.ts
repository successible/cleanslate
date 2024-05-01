import React from "react";
import { handleError } from "../helpers/handleError";

const listenToPromiseRejectionError = (e: PromiseRejectionEvent) =>
  handleError(e.reason);

const listenToError = (e: ErrorEvent) => handleError(e.message);

export const useErrors = () => {
  React.useEffect(() => {
    window.addEventListener("error", listenToError);
    window.addEventListener(
      "unhandledrejection",
      listenToPromiseRejectionError,
    );
    return () => {
      window.addEventListener("error", listenToError);
      window.removeEventListener(
        "unhandledrejection",
        listenToPromiseRejectionError,
      );
    };
  });
};
