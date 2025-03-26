import {
  CircleComponent,
  EllipseComponent,
  FiveSideShapeComponent,
  RectangleComponent,
  SixSideShapeComponent,
  StarComponent,
  TriangleComponent,
} from "../components";
import {
  cirlceShapeSettings,
  ellipseShapeSettings,
  fiveSideShapeSettings,
  rectangleShapeSettings,
  sixSideShapeSettings,
  starShapeSettings,
  triangleShapeSettings,
} from "../../shapesMechanic/config";

export const shapeParamsMapper: Record<string, any> = {
  [CircleComponent.name]: cirlceShapeSettings,
  [EllipseComponent.name]: ellipseShapeSettings,
  [TriangleComponent.name]: triangleShapeSettings,
  [RectangleComponent.name]: rectangleShapeSettings,
  [FiveSideShapeComponent.name]: fiveSideShapeSettings,
  [SixSideShapeComponent.name]: sixSideShapeSettings,
  [StarComponent.name]: starShapeSettings,
};
