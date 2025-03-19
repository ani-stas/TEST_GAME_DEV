import { Application, Container, EventEmitter, Graphics } from "pixi.js";
import { BaseComponent } from "../BaseComponent";
import {
  CircleComponent,
  PlusMinusComponent,
  RectangleComponent,
  MaskComponent,
  InfoPlateComponent,
} from "../common/components";
import {
  plusMinusLeftSettings,
  plusMinusRightSettings,
  rectSettings,
  containerSettings,
  maskSettings,
  infoPlateLeftSettings,
  infoPlateRightSettings,
} from "./config";
import { ICircle } from "../common/interfaces";
import { EmittedEvents } from "../common/enums";
import {
  PLUS_MUNIS_LEFT_X_KOEF,
  PLUS_MUNIS_LEFT_Y_KOEF,
  PLUS_MUNIS_RIGHT_X_KOEF,
  PLUS_MUNIS_RIGHT_Y_KOEF,
  RECT_HEIGHT_KOEF,
} from "./contants";

export class ShapesView extends BaseComponent {
  public container: Container;
  private infoPlateLeft: InfoPlateComponent;
  private infoPlateRight: InfoPlateComponent;
  private rectangle: RectangleComponent;
  private plusMinusLeft: PlusMinusComponent;
  private plusMinusRight: PlusMinusComponent;
  public shape: CircleComponent;
  private mask: MaskComponent;
  public eventEmitter: EventEmitter;

  constructor(app: Application) {
    super(app);

    this.container = new Container(containerSettings);
    this.infoPlateLeft = new InfoPlateComponent(app);
    this.infoPlateRight = new InfoPlateComponent(app);
    this.rectangle = new RectangleComponent(app);
    this.plusMinusLeft = new PlusMinusComponent(app);
    this.plusMinusRight = new PlusMinusComponent(app);
    this.shape = new CircleComponent(app);
    this.mask = new MaskComponent(app);
    this.eventEmitter = new EventEmitter();

    this.createScene();
  }

  createScene(): void {
    super.createScene();

    this.addInfoPanel();
    this.addRectToContainer(this.container);
    this.addControls();
    this.addMaskToContainer(this.container);
    this.addElemToScene(this.container);
  }

  createCircle(input: ICircle): Graphics {
    const shape = this.shape.create(input);
    this.container.addChild(shape);

    return shape;
  }

  calculateCircleArea(circle: Graphics): number {
    return this.shape.calculateArea(circle);
  }

  removeCircle(shape: Graphics): void {
    this.container.removeChild(shape);
    shape.destroy();
  }

  updateShapesCountText(count: number): void {
    this.infoPlateLeft.changeText(
      `${infoPlateLeftSettings.text.content} ${count}`
    );
  }

  updateShapesTotalAreaText(area: number): void {
    this.infoPlateRight.changeText(
      `${infoPlateRightSettings.text.content} ${Math.round(area)}`
    );
  }

  updateShapesPerSecondText(count: number): void {
    this.plusMinusLeft.updateText(
      `${plusMinusLeftSettings.text.content} ${count}`
    );
  }

  updateGravityValueText(count: number): void {
    this.plusMinusRight.updateText(
      `${plusMinusRightSettings.text.content} ${count}`
    );
  }

  getApp(): Application {
    return this.app;
  }

  private addInfoPanel(): void {
    const infoPanelLeft = this.infoPlateLeft.create(infoPlateLeftSettings);
    const infoPanelRight = this.infoPlateRight.create(infoPlateRightSettings);

    this.addElemToScene(infoPanelLeft);
    this.addElemToScene(infoPanelRight);
  }

  private addRectToContainer(container: Container): void {
    const rectangle = this.rectangle.create({
      ...rectSettings,
      width: this.app.screen.width,
      height: this.app.screen.height * RECT_HEIGHT_KOEF,
    });

    container.addChild(rectangle);
  }

  private addControls(): void {
    this.plusMinusLeft.init({
      ...plusMinusLeftSettings,
      x: this.app.screen.width * PLUS_MUNIS_LEFT_X_KOEF,
      y: this.app.screen.height * PLUS_MUNIS_LEFT_Y_KOEF,
      buttonMinus: {
        ...plusMinusLeftSettings.buttonMinus,
        callback: () => {
          this.eventEmitter.emit(EmittedEvents.NUMBER_OF_SHAPES_DECREASED);
        },
      },
      buttonPlus: {
        ...plusMinusLeftSettings.buttonPlus,
        callback: () => {
          this.eventEmitter.emit(EmittedEvents.NUMBER_OF_SHAPES_INCREASED);
        },
      },
    });

    this.plusMinusRight.init({
      ...plusMinusRightSettings,
      x: this.app.screen.width * PLUS_MUNIS_RIGHT_X_KOEF,
      y: this.app.screen.height * PLUS_MUNIS_RIGHT_Y_KOEF,
      buttonMinus: {
        ...plusMinusLeftSettings.buttonMinus,
        callback: () => {
          this.eventEmitter.emit(EmittedEvents.GRAVITY_DECREASED);
        },
      },
      buttonPlus: {
        ...plusMinusLeftSettings.buttonPlus,
        callback: () => {
          this.eventEmitter.emit(EmittedEvents.GRAVITY_INCREASED);
        },
      },
    });
  }

  private addMaskToContainer(container: Container): void {
    const mask = this.mask.create({
      ...maskSettings,
      width: container.width,
      height: container.height,
    });

    this.mask.applyMaskToParent(mask, container);
  }
}
