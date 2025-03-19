import { Application, Container, Graphics } from "pixi.js";

export class BaseComponent {
  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  createScene(): void {}

  addElemToScene(elem: Graphics | Container): void {
    this.app.stage.addChild(elem);
  }
}
