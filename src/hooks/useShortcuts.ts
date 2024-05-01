import React from "react";

export const useShortcuts = (shortcuts: (event: KeyboardEvent) => void) => {
  React.useEffect(() => {
    window.addEventListener("keyup", shortcuts);
    return () => {
      window.removeEventListener("keyup", shortcuts);
    };
  }, [shortcuts]);
};
