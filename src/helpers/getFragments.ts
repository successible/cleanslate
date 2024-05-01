import { EXERCISE_LOG_FRAGMENT } from "../graphql/exerciseLog";
import { FOOD_FRAGMENT } from "../graphql/food";
import { INGREDIENT_FRAGMENT } from "../graphql/ingredient";
import { LOG_FRAGMENT } from "../graphql/log";
import { PROFILE_FRAGMENT } from "../graphql/profile";
import { QUICK_LOG_FRAGMENT } from "../graphql/quickLog";
import {
  INGREDIENT_BASE_FRAGMENT,
  RECIPE_BASE_FRAGMENT,
  RECIPE_FRAGMENT,
} from "../graphql/recipe";

export const getFragments = () => {
  return `
${PROFILE_FRAGMENT}
${FOOD_FRAGMENT}
${LOG_FRAGMENT}
${QUICK_LOG_FRAGMENT}
${EXERCISE_LOG_FRAGMENT}
${INGREDIENT_BASE_FRAGMENT}
${INGREDIENT_FRAGMENT}
${RECIPE_BASE_FRAGMENT}
${RECIPE_FRAGMENT}
`;
};
