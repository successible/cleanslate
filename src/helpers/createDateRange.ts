import dayjs from "dayjs";

export const createDateRange = () => {
  const midnight = dayjs().startOf("day");
  return {
    today: midnight,
    tomorrow: midnight.add(24, "hour"),
  };
};
