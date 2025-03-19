import { TextStyleAlign } from "pixi.js";

export interface IText {
  content: string;
  fontFamily?: string;
  fontSize?: number;
  fill?: string;
  align?: TextStyleAlign;
}
