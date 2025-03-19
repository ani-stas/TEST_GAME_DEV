import { IText } from "./text.interface";

export interface IInfoPlate {
  x: number;
  y: number;
  width: number;
  height: number;
  text: IText;
  fill?: string;
  stroke?: string;
}
