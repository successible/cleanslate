import matplotlib.pyplot as plt
import pandas as pd
from scipy import stats

cols = ["mph", "met"]
dtype = {"mph": float, "met": float}
running_df = pd.read_csv("mets_running.csv", usecols=cols, dtype=dtype)
cycling_df = pd.read_csv("mets_cycling.csv", usecols=cols, dtype=dtype)

for name, df in [("running", running_df), ("cycling", cycling_df)]:
    x = df["mph"]
    y = df["met"]
    output = stats.linregress(x, y)
    print(name)
    print(f"{round(output.slope, 4)} {round(output.intercept, 4)}")
    print(output.rvalue)

    plt.plot(x, y, "o", label="original data")
    plt.plot(x, output.intercept + output.slope * x, "r", label="fitted line")
    plt.legend()
    plt.show()


