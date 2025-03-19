import { Application, Graphics, EventEmitter } from "pixi.js";
import { BaseComponent } from "../../BaseComponent";
import { ICircle } from "../interfaces";
import { CursorStyles } from "../enums";

export class CircleComponent extends BaseComponent {
  public eventEmitter: EventEmitter;

  constructor(app: Application) {
    super(app);

    this.eventEmitter = new EventEmitter();
  }

  create(input: ICircle): Graphics {
    const circle = new Graphics();

    circle.circle(input.x, input.y, input.radius);
    circle.fill(input.fill || 0x000000);
    circle.stroke(input.stroke || 0x000000);
    circle.interactive = input.interactive || false;
    circle.cursor = CursorStyles.POINTER;

    return circle;
  }

  calculateArea(circle: Graphics): number {
    const circleRadius = circle.width / 2;

    return Math.PI * Math.pow(circleRadius, 2);
  }
}
