import { Application, Graphics } from "pixi.js";
import { BaseComponent } from "../../../BaseComponent";
import { CursorStyles } from "../../enums";
import { ISideShape } from "../../interfaces";
import { TWO_PI_RADIANS } from "../../constants";

export class MultipleSideShapeComponent extends BaseComponent {
  constructor(app: Application) {
    super(app);
  }

  create(input: ISideShape): Graphics {
    const multipleSideShape = new Graphics();
    const angle = TWO_PI_RADIANS / input.numberOfSides;

    for (let i = 0; i < input.numberOfSides; i++) {
      const px = input.x + input.size * Math.cos(i * angle - Math.PI / 2);
      const py = input.y + input.size * Math.sin(i * angle - Math.PI / 2);

      if (i === 0) {
        multipleSideShape.moveTo(px, py);
      } else {
        multipleSideShape.lineTo(px, py);
      }
    }

    multipleSideShape.closePath();

    if (input.fill) multipleSideShape.fill(input.fill);
    if (input.stroke) multipleSideShape.fill(input.stroke);

    if (input.interactive) {
      multipleSideShape.interactive = true;
      multipleSideShape.cursor = CursorStyles.POINTER;
    }

    return multipleSideShape;
  }
}
