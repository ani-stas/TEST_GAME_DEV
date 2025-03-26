import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { IRectangle } from "../../interfaces";
import { CursorStyles } from "../../enums";

export class RectangleComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: IRectangle): Graphics {
    const rect = new Graphics();

    rect.rect(input.x, input.y, input.width, input.height);
    rect.fill(input.fill || 0x000000);

    if (input.stroke) rect.stroke(input.stroke);

    if (input.interactive) {
      rect.interactive = true;
      rect.cursor = CursorStyles.POINTER;
    }

    return rect;
  }

  calculateArea(input: IRectangle): number {
    return input.width * input.height;
  }
}
