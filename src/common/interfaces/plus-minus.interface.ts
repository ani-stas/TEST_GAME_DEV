import { IButton } from "./button.interface";
import { IText } from "./text.interface";

export interface IPlusMinus {
  x: number;
  y: number;
  buttonPlus: IButton;
  buttonMinus: IButton;
  text: IText;
  width?: number;
  height?: number;
}
