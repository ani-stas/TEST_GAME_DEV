import { Application, Graphics } from "pixi.js";
import { MultipleSideShapeComponent } from "../../components";
import { ISideShape } from "../../interfaces";

export class FiveSideShapeComponent extends MultipleSideShapeComponent {
  constructor(app: Application) {
    super(app);
  }

  calculateArea(input: ISideShape): number {
    return (5 * input.size * input.size) / (4 * Math.tan(Math.PI / 5));
  }
}
