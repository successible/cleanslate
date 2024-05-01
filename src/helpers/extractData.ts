import { store } from "../store/store";

export const extractData = (data = store.get().data) => {
  const { basicFoods, profiles } = data;
  const profile = profiles[0];
  const { exercise_logs, logs, quick_logs, recipes } = profile;
  const customFoods = profile.foods;
  const foods = [...basicFoods, ...customFoods];
  return { exercise_logs, foods, logs, profile, quick_logs, recipes };
};
