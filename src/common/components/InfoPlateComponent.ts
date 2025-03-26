import { Application, Container } from "pixi.js";
import { BaseComponent } from "../../BaseComponent";
import { RectangleComponent, TextComponent } from "../components";
import { IInfoPlate } from "../interfaces";

export class InfoPlateComponent extends BaseComponent {
  private rectangle: RectangleComponent;
  private text: TextComponent;

  constructor(app: Application) {
    super(app);

    this.rectangle = new RectangleComponent(app);
    this.text = new TextComponent(app);
  }

  create(input: IInfoPlate): Container {
    const container = new Container();

    const plate = this.rectangle.create({
      ...input,
      x: input.plateX,
      y: input.plateY,
    });

    const text = this.text.create(input.text);
    text.anchor.set(0.5);
    text.x = plate.width / 2;
    text.y = plate.height / 2;

    container.addChild(plate);
    container.addChild(text);

    container.x = input.containerX;
    container.y = input.containerY;

    return container;
  }

  changeText(newText: string): void {
    this.text.setText(newText);
  }
}
