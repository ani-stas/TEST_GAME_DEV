import { Application, Container, Graphics } from "pixi.js";
import { RectangleComponent } from "../components";

export class MaskComponent extends RectangleComponent {
  constructor(app: Application) {
    super(app);
  }

  applyMaskToParent(mask: Graphics, parent: Container): void {
    parent.addChild(mask);

    parent.mask = mask;
  }
}
