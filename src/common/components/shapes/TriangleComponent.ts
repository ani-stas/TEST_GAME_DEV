import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { CursorStyles } from "../../enums";
import { ISideShape } from "../../interfaces";

export class TriangleComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: ISideShape): Graphics {
    const { x, y, size } = input;
    const triangle = new Graphics();

    triangle
      .moveTo(x, y - size / 2) // top point
      .lineTo(x - size / 2, y + size / 2) // bottom-left point
      .lineTo(x + size / 2, y + size / 2) // bottom-right pint
      .closePath();

    if (input.fill) triangle.fill(input.fill);
    if (input.stroke) triangle.fill(input.stroke);

    if (input.interactive) {
      triangle.interactive = true;
      triangle.cursor = CursorStyles.POINTER;
    }

    return triangle;
  }

  calculateArea(input: ISideShape): number {
    return (Math.sqrt(3) / 4) * Math.pow(input.size, 2);
  }
}
