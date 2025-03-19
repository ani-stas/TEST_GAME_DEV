import {
  Application,
  Container,
  ContainerChild,
  FederatedPointerEvent,
} from "pixi.js";
import { BaseComponent } from "../../BaseComponent";
import { TextComponent, RectangleComponent } from "../components";
import { IButton } from "../interfaces";
import { ClickEvents, CursorStyles } from "../enums";

export class ButtonComponent extends BaseComponent {
  private rectangle: RectangleComponent;

  constructor(app: Application) {
    super(app);

    this.rectangle = new RectangleComponent(app);
  }

  create(input: IButton): ContainerChild {
    const container = new Container();

    const button = this.rectangle.create(input);
    button.interactive = input.interactive ?? true;
    button.cursor = CursorStyles.POINTER;

    button.on(ClickEvents.POINTERDOWN, (event: FederatedPointerEvent) => {
      input.callback(event);
    });

    container.addChild(button);

    if (input.text) {
      const textInstance = new TextComponent(this.app);

      const text = textInstance.create(input.text);
      text.x = (input.width - text.width) / 2;
      text.y = (input.height - text.height) / 2;

      container.addChild(text);
    }

    container.x = input.x;
    container.y = input.y;

    return container;
  }
}
