import {
  CircleComponent,
  EllipseComponent,
  FiveSideShapeComponent,
  RectangleComponent,
  SixSideShapeComponent,
  StarComponent,
  TriangleComponent,
} from "../../common/components";

export type ShapeComponent =
  | RectangleComponent
  | CircleComponent
  | EllipseComponent
  | TriangleComponent
  | FiveSideShapeComponent
  | SixSideShapeComponent
  | StarComponent;
