import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { CursorStyles } from "../../enums";
import { IStar } from "../../interfaces";
import { TWO_PI_RADIANS } from "../../constants";

export class StarComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: IStar): Graphics {
    const star = this.drawStar(input);

    if (input.fill) star.fill(input.fill);
    if (input.stroke) star.fill(input.stroke);

    if (input.interactive) {
      star.interactive = true;
      star.cursor = CursorStyles.POINTER;
    }

    return star;
  }

  private drawStar(input: IStar): Graphics {
    const { x, y, outerRadius, innerRadius } = input;
    const star = new Graphics();

    const step = Math.PI / input.numberOfPoints; // Angle step between points
    let angle = -TWO_PI_RADIANS; // Start at the top of the star

    star.moveTo(
      x + outerRadius * Math.cos(angle),
      y + outerRadius * Math.sin(angle)
    );

    for (let i = 0; i < input.numberOfPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);

      star.lineTo(px, py);
      angle += step;
    }

    star.closePath();

    return star;
  }

  calculateArea(input: IStar): number {
    return (
      (5 / 2) *
      input.outerRadius *
      input.innerRadius *
      Math.sin((2 * Math.PI) / 5)
    );
  }
}
