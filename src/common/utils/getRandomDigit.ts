export const getRandomDigit = (base: number): string => {
  return Math.floor(Math.random() * base).toString(base);
};
