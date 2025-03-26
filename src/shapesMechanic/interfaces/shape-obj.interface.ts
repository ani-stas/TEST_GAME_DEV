import { Graphics } from "pixi.js";
import {
  CircleComponent,
  EllipseComponent,
  FiveSideShapeComponent,
  RectangleComponent,
  SixSideShapeComponent,
  StarComponent,
  TriangleComponent,
} from "../../common/components";

export interface IShapeObj {
  shape: Graphics;
  instance:
    | RectangleComponent
    | CircleComponent
    | EllipseComponent
    | TriangleComponent
    | FiveSideShapeComponent
    | SixSideShapeComponent
    | StarComponent;
}
