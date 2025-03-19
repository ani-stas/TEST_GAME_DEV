import { IText } from "./text.interface";

export interface IButton {
  x: number;
  y: number;
  width: number;
  height: number;
  callback: Function;
  fill?: string;
  stroke?: string;
  interactive?: boolean;
  text?: IText;
}
