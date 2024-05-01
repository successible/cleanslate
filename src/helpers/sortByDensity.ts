import type { Density, Food } from "../models/food";
import type { Recipe } from "../models/recipe";
import { sortByCaloricDensity } from "./sortByCaloricDensity";
import { sortByCombinedDensity } from "./sortByCombinedDensity";
import { sortByProteinDensity } from "./sortByProteinDensity";

export const sortByDensity = (
  density: Density,
  items: Food[],
): (Food | Recipe)[] => {
  if (density === "caloric-density") {
    return sortByCaloricDensity(items);
  }
  if (density === "protein-density") {
    return sortByProteinDensity(items);
  }
  if (density === "combined-density") {
    return sortByCombinedDensity(items);
  }
  throw Error(
    `Error: sortRecipesByDensity: ${JSON.stringify({ density, items })}`,
  );
};
