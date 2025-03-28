import { Graphics } from "pixi.js";
import { ShapeComponent } from "./shape-component.interface";

export interface IShapeObj {
  shape: Graphics;
  instance: ShapeComponent;
}
