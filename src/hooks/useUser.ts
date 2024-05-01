import { useStoreon } from "storeon/react";
import type { NavbarState } from "../store/navbar/types";

export const useUser = () => {
  const { navbar }: { navbar: NavbarState } = useStoreon("navbar");
  const { user } = navbar;
  return user;
};
