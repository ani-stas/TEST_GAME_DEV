import { IText } from "./text.interface";

export interface IButton {
  containerX: number;
  containerY: number;
  buttonX: number;
  buttonY: number;
  width: number;
  height: number;
  callback: Function;
  fill?: string;
  stroke?: string;
  interactive?: boolean;
  text?: IText;
}
