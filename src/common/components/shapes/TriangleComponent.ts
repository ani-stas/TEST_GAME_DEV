import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { CursorStyles } from "../../enums";
import { ISideShape } from "../../interfaces";

export class TriangleComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: ISideShape): Graphics {
    const { x = 100, y = 100, size } = input;
    const triangle = new Graphics();

    triangle
      .moveTo(x, y - size / 2) // Top point
      .lineTo(x - size / 2, y + size / 2) // Bottom-left
      .lineTo(x + size / 2, y + size / 2) // Bottom-right
      .closePath();

    triangle.fill(input.fill || 0x000000);
    triangle.stroke(input.stroke || 0x000000);

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
