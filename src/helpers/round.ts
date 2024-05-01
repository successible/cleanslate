export const round = (number: number, place: number) => {
  if (place === 0) {
    return Math.round(number);
  }
  if (place === 1) {
    return Math.floor(number * 10) / 10;
  }
  if (place === 2) {
    return Math.floor(number * 100) / 100;
  }
  if (place === 3) {
    return Math.floor(number * 1000) / 1000;
  }
  if (place === 4) {
    return Math.floor(number * 10000) / 10000;
  }
  if (place === 5) {
    return Math.floor(number * 100000) / 100000;
  }
  if (place === 6) {
    return Math.floor(number * 1000000) / 1000000;
  }
  if (place === 7) {
    return Math.floor(number * 10000000) / 10000000;
  }
  if (place === 8) {
    return Math.floor(number * 100000000) / 100000000;
  }

  throw Error("You must specify a place for the round function to work!");
};
