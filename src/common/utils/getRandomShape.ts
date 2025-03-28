import { ShapeComponent } from "../../shapesMechanic/interfaces";

export const getRandomShape = (shapes: ShapeComponent[]): ShapeComponent => {
  const randomShapeIndex = Math.floor(Math.random() * shapes.length);

  return shapes[randomShapeIndex];
};
