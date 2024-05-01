import { useStoreon } from "storeon/react";
import type { NavbarState } from "../store/navbar/types";

export const useOfflineStatus = () => {
  const { navbar }: { navbar: NavbarState } = useStoreon("navbar");
  return navbar.offline;
};
