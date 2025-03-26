import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { CursorStyles } from "../../enums";
import { IEllipse } from "../../interfaces";
import { TWO_PI_RADIANS } from "../../constants";

export class EllipseComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: IEllipse): Graphics {
    const ellipse = this.drawEllipse(input);

    if (input.interactive) {
      ellipse.interactive = true;
      ellipse.cursor = CursorStyles.POINTER;
    }

    return ellipse;
  }

  private drawEllipse(input: IEllipse): Graphics {
    const { x, y, width, height } = input;
    const ellipse = new Graphics();
    const step = Math.PI / input.step;

    ellipse.moveTo(x + width, y);

    for (let theta = 0; theta <= TWO_PI_RADIANS; theta += step) {
      const px = x + width * Math.cos(theta);
      const py = y + height * Math.sin(theta);

      ellipse.lineTo(px, py);
    }

    if (input.fill) ellipse.fill(input.fill);
    if (input.stroke) ellipse.stroke(input.stroke);

    ellipse.closePath();

    return ellipse;
  }

  calculateArea(input: IEllipse): number {
    return Math.PI * input.width * input.height;
  }
}
