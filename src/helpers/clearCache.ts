import { basicFoodsKey, fetchBasicFoodsKey, profileKey } from "./constants";
import { getStore } from "./getStore";

export const clearCache = () => {
  localStorage.setItem(profileKey, "null");
  localStorage.setItem(basicFoodsKey, "null");
  localStorage.setItem(fetchBasicFoodsKey, "null");
  getStore().dispatch("clearData", null);
};
