import {
  calculateFoodDensities,
  calculateRecipeDensities,
} from "../components/macros/helpers/calculateDensities";
import { calculatePerMacroPerRecipe } from "../components/macros/helpers/calculateMacros";
import type { Food } from "../models/food";
import type { Recipe } from "../models/recipe";
import { categoriesToIgnore } from "./sortByCaloricDensity";

export const sortByCombinedDensity = (items: (Food | Recipe)[]) => {
  return items
    .sort((itemsA, itemsB) => {
      const A =
        itemsA.type === "food"
          ? calculateFoodDensities(itemsA)[2]
          : calculateRecipeDensities(
              1,
              calculatePerMacroPerRecipe(itemsA, "CALORIE", 1, "COUNT"),
              calculatePerMacroPerRecipe(itemsA, "PROTEIN", 1, "COUNT"),
              itemsA,
            )[2];

      const B =
        itemsB.type === "food"
          ? calculateFoodDensities(itemsB)[2]
          : calculateRecipeDensities(
              1,
              calculatePerMacroPerRecipe(itemsB, "CALORIE", 1, "COUNT"),
              calculatePerMacroPerRecipe(itemsB, "PROTEIN", 1, "COUNT"),
              itemsB,
            )[2];

      return B - A;
    })
    .filter((food) => {
      if (food.type === "food" && categoriesToIgnore.includes(food.category)) {
        return false;
      }
      return true;
    });
};
