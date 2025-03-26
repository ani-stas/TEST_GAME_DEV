import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { ICircle } from "../../interfaces";
import { CursorStyles } from "../../enums";

export class CircleComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: ICircle): Graphics {
    const circle = new Graphics();

    circle.circle(input.x, input.y, input.radius);

    if (input.fill) circle.fill(input.fill);
    if (input.stroke) circle.stroke(input.stroke);

    if (input.interactive) {
      circle.interactive = true;
      circle.cursor = CursorStyles.POINTER;
    }

    return circle;
  }

  calculateArea(input: ICircle): number {
    return Math.PI * Math.pow(input.radius, 2);
  }
}
