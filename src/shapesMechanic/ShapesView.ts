import { Application, Container, EventEmitter, Graphics } from "pixi.js";
import { BaseComponent } from "../BaseComponent";
import {
  CircleComponent,
  PlusMinusComponent,
  RectangleComponent,
  MaskComponent,
  InfoPlateComponent,
  EllipseComponent,
  TriangleComponent,
  FiveSideShapeComponent,
  SixSideShapeComponent,
  StarComponent,
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
import { EmittedEvents } from "../common/enums";
import {
  PLUS_MUNIS_LEFT_X_KOEF,
  PLUS_MUNIS_LEFT_Y_KOEF,
  PLUS_MUNIS_RIGHT_X_KOEF,
  PLUS_MUNIS_RIGHT_Y_KOEF,
  RECT_HEIGHT_KOEF,
} from "./constants";
import { shapeParamsMapper } from "../common/utils";
import { IShape, IShapeObj } from "./interfaces";

export class ShapesView extends BaseComponent {
  public container: Container;
  public rectangle: RectangleComponent;
  public rectangleShape: RectangleComponent;
  private infoPlateLeft: InfoPlateComponent;
  private infoPlateRight: InfoPlateComponent;
  private plusMinusLeft: PlusMinusComponent;
  private plusMinusRight: PlusMinusComponent;
  private mask: MaskComponent;
  public circle: CircleComponent;
  public ellipse: EllipseComponent;
  public triangle: TriangleComponent;
  public fiveSideShape: FiveSideShapeComponent;
  public sixSideShape: SixSideShapeComponent;
  public star: StarComponent;
  public eventEmitter: EventEmitter;

  constructor(app: Application) {
    super(app);

    this.container = new Container(containerSettings);
    this.rectangle = new RectangleComponent(app);
    this.rectangleShape = new RectangleComponent(app);
    this.infoPlateLeft = new InfoPlateComponent(app);
    this.infoPlateRight = new InfoPlateComponent(app);
    this.mask = new MaskComponent(app);
    this.plusMinusLeft = new PlusMinusComponent(app);
    this.plusMinusRight = new PlusMinusComponent(app);
    this.circle = new CircleComponent(app);
    this.ellipse = new EllipseComponent(app);
    this.triangle = new TriangleComponent(app);
    this.fiveSideShape = new FiveSideShapeComponent(app);
    this.sixSideShape = new SixSideShapeComponent(app);
    this.star = new StarComponent(app);
    this.eventEmitter = new EventEmitter();

    this.createScene();
  }

  createScene(): void {
    super.createScene();

    this.addInfoPanel();
    this.addControls();
    this.addRectToContainer(this.container);
    this.addMaskToContainer(this.container);
    this.addElemToScene(this.container);
  }

  createRandomShape(input: IShape): IShapeObj {
    const shapes = [
      this.circle,
      this.ellipse,
      this.triangle,
      this.rectangleShape,
      this.fiveSideShape,
      this.sixSideShape,
      this.star,
    ];

    const randomShapeIndex = Math.floor(Math.random() * shapes.length);
    const randomShape = shapes[randomShapeIndex];

    const shapeKey = randomShape.constructor.name;
    const shapeParams = shapeParamsMapper[shapeKey] || {};

    const shape = randomShape.create({
      ...shapeParams,
      ...input,
    });
    this.container.addChild(shape);

    return { shape, instance: randomShape };
  }

  calculateArea(shapeObj: IShapeObj): number {
    const shapeName = shapeObj.instance.constructor.name;
    const shapeSettings = shapeParamsMapper[shapeName];

    return shapeObj.instance.calculateArea(shapeSettings);
  }

  removeShape(shape: Graphics): void {
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
    const screenWidth = this.app.screen.width;

    const infoPanelLeft = this.infoPlateLeft.create({
      ...infoPlateLeftSettings,
      width: screenWidth / 2,
    });

    const infoPanelRight = this.infoPlateRight.create({
      ...infoPlateRightSettings,
      containerX: screenWidth / 2,
      width: screenWidth / 2,
    });

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
        ...plusMinusRightSettings.buttonMinus,
        callback: () => {
          this.eventEmitter.emit(EmittedEvents.GRAVITY_DECREASED);
        },
      },
      buttonPlus: {
        ...plusMinusRightSettings.buttonPlus,
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
