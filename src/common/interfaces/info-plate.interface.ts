import { IText } from "./text.interface";

export interface IInfoPlate {
  containerX: number;
  containerY: number;
  plateX: number;
  plateY: number;
  width: number;
  height: number;
  text: IText;
  fill?: string;
  stroke?: string;
}
