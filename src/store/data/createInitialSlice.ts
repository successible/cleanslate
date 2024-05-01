import { getCachedData } from "../../helpers/getCachedData";
import type { DataSlice } from "./types";

export const createInitialSlice = (): DataSlice => {
  const { basicFoods, profiles } = getCachedData();
  return {
    currentWebsocketClient: null,
    data: { basicFoods, profiles },
  };
};
