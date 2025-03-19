import { Application, Text } from "pixi.js";
import { BaseComponent } from "../../BaseComponent";
import { IText } from "../interfaces";

export class TextComponent extends BaseComponent {
  private text: Text;

  constructor(app: Application) {
    super(app);
  }

  create(input: IText): Text {
    this.text = new Text({
      text: input.content,
      style: {
        fontFamily: input.fontFamily || "Arial",
        fontSize: input.fontSize || 20,
        fill: input.fill || 0x000000,
        align: input.align || "center",
      },
    });

    return this.text;
  }

  setText(newText: string): void {
    this.text.text = newText;
  }
}
