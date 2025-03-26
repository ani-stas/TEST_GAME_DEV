import { Application } from "pixi.js";
import { MultipleSideShapeComponent } from "./MultipleSideShapeComponent";
import { ISideShape } from "../../interfaces";

export class SixSideShapeComponent extends MultipleSideShapeComponent {
  constructor(app: Application) {
    super(app);
  }

  calculateArea(input: ISideShape): number {
    return ((3 * Math.sqrt(3)) / 2) * Math.pow(input.size, 2);
  }
}
