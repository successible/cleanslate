import { tokenKey } from "./constants";

export const getToken = () => localStorage.getItem(tokenKey) || "";
