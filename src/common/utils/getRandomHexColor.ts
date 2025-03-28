import { HEX_BASE, HEX_COLOR_DIGITS_AMOUNT } from "../constants";
import { getRandomDigit } from "./getRandomDigit";

export const getRandomHexColor = (): string => {
  const hexColor = Array.from({ length: HEX_COLOR_DIGITS_AMOUNT }, () =>
    getRandomDigit(HEX_BASE)
  ).join("");

  return `#${hexColor}`;
};
