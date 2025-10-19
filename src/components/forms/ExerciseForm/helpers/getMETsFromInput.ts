import {
  type LiftingActivity,
  liftingMET,
  type OtherActivity,
  otherMet,
  type SwimmingActivity,
  swimmingMET,
} from '../constants'
import type { ExerciseGroup } from '../ExerciseForm'
import { getCyclingMET } from './getCyclingMET'
import { getRowingMET } from './getRowingMET'
import { getRunningMET } from './getRunningMET'
import { getWalkingMET } from './getWalkingMET'

/*

The formulas for these activities, rowing, running, and cycling, are calculated
Using static values at certain mph/watts from the reference link below and a linear regression with scipy in the Python snippet below
The formulas for this activity, walking, is an existing one: ACSM Walking Equation: https://exrx.net/Calculators/WalkRunMETs
The formulas for every other activity are simply static values (across mph/watt) from the reference link below 
Look at the test: src/components/forms/ExerciseForm/helpers/getMETs.test.ts for a sense of the numbers that are calculated

// Reference Link: https://web.archive.org/web/20230326114223/https://community.plu.edu/~chasega/met.html

import pandas as pd
from pathlib import Path
from scipy import stats
import json

def load_df(path):
    data = json.loads(Path(path).read_text())
    df = pd.DataFrame(list(data.items()))
    df.columns = ["met", "mph/watt"]
    df["met"] = pd.to_numeric(df["met"], errors="coerce")
    df["mph/watt"] = pd.to_numeric(df["mph/watt"], errors="coerce")
    return df

cycling_df = load_df("data/MET/cyclingMET.json")
rowing_df = load_df("data/MET/rowingMET.json")
running_df = load_df("data/MET/runningMET.json")

for name, df in [
    ("running", running_df),
    ("cycling", cycling_df),
    ("rowing", rowing_df),
]:
    x = df["met"]
    y = df["mph/watt"]
    output = stats.linregress(x, y)
    print(name)
    print(f"{round(output.slope, 4)} {round(output.intercept, 4)}")
    print(output.rvalue)

*/

export const getMETsFromInput = (
  exerciseGroup: ExerciseGroup,
  otherActivity: OtherActivity,
  swimmingActivity: SwimmingActivity,
  liftingActivity: LiftingActivity,
  mph: number,
  incline: number,
  watts: number
): number => {
  if (exerciseGroup === 'Cycling') {
    return getCyclingMET(mph)
  }
  if (exerciseGroup === 'Running') {
    return getRunningMET(mph)
  }
  if (exerciseGroup === 'Walking') {
    return getWalkingMET(mph, incline)
  }
  if (exerciseGroup === 'Rowing') {
    return getRowingMET(watts)
  }
  if (exerciseGroup === 'Other') {
    return otherMet[otherActivity]
  }
  if (exerciseGroup === 'Swimming') {
    return swimmingMET[swimmingActivity]
  }
  if (exerciseGroup === 'Lifting') {
    return liftingMET[liftingActivity]
  }
  if (exerciseGroup === 'Custom') {
    return 0 // Dummy value
  }
  throw Error(
    `Error: getMETsFromInput: ${JSON.stringify({
      exerciseGroup,
      incline,
      liftingActivity,
      mph,
      otherActivity,
      swimmingActivity,
      watts,
    })}`
  )
}
