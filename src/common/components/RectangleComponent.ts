import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../BaseComponent";
import { IRectangle } from "../interfaces";

export class RectangleComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: IRectangle): Graphics {
    const rect = new Graphics();

    rect.rect(0, 0, input.width, input.height);
    rect.fill(input.fill || 0x000000);
    rect.stroke(input.stroke || 0x000000);

    return rect;
  }
}
