import { uuid } from "../helpers/uuid";
import type { ExerciseLog } from "./exerciseLog";
import type { Food } from "./food";
import type { Ingredient } from "./ingredient";
import type { Log } from "./log";
import type { QuickLog } from "./quickLog";
import type { Recipe } from "./recipe";

// The default targets are ludicrous by design
// That is how progress bars will know to show the placeholder
export const defaultTargets = [100000, 100000];
export const defaultStartTime = "00:00:00";

export class Profile {
  // Data
  apiToken = uuid();
  calorieTarget: number; // Default 2000
  convertBetweenUnits: boolean; // Default to false
  countDown: boolean; // Default to true
  enablePlanning: boolean; // Default to false
  hidePWAPrompt: boolean; // Default to false
  metricSystem: boolean; // Default to false
  proteinTarget: number; // Default 150
  showCalories: boolean; // Default to True
  showDensities: boolean; // Default to false
  startTime: string; // No longer used
  timezone: string;

  // Relationships
  foods: Food[];
  logs: Log[];
  recipes: Recipe[];
  ingredients: Ingredient[];
  quick_logs: QuickLog[];
  exercise_logs: ExerciseLog[];

  // Foreign keys
  authId = uuid();

  // Metadata
  id = uuid();
  updatedAt = new Date();
  createdAt = new Date();
  type: "profile";

  constructor() {
    this.foods = [] as Food[];
    this.recipes = [] as Recipe[];
    this.logs = [] as Log[];
    this.ingredients = [] as Ingredient[];
    this.quick_logs = [] as QuickLog[];
    this.exercise_logs = [] as ExerciseLog[];
    this.calorieTarget = defaultTargets[0];
    this.proteinTarget = defaultTargets[1];
    this.startTime = defaultStartTime;
    // We do not want to accidentally show the PWAPrompt if fetching data fails
    this.hidePWAPrompt = true;
  }
}
