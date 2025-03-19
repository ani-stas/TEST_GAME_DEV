import { Application, Container } from "pixi.js";
import { BaseComponent } from "../../BaseComponent";
import { ButtonComponent, TextComponent } from "../components";
import { IPlusMinus } from "../interfaces";

export class PlusMinusComponent extends BaseComponent {
  private button: ButtonComponent;
  private text: TextComponent;

  constructor(app: Application) {
    super(app);

    this.button = new ButtonComponent(app);
    this.text = new TextComponent(app);
  }

  init(input: IPlusMinus): void {
    const component = this.create(input);

    this.addElemToScene(component);
  }

  create(input: IPlusMinus): Container {
    const container = new Container({
      x: input.x,
      y: input.y,
    });

    const buttonMinus = this.button.create(input.buttonMinus);
    container.addChild(buttonMinus);

    const buttonPlus = this.button.create(input.buttonPlus);
    container.addChild(buttonPlus);

    const text = this.text.create(input.text);
    text.anchor.set(0.5);
    text.x = container.width / 2;
    text.y = container.height / 2 + 50;
    container.addChild(text);

    return container;
  }

  updateText(text: string): void {
    this.text.setText(text);
  }
}
