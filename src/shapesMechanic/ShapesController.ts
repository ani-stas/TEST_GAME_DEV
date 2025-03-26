import { Application, FederatedPointerEvent } from "pixi.js";
import { ShapesModel } from "./ShapesModel";
import { ShapesView } from "./ShapesView";
import { ClickEvents, EmittedEvents, UpdateEvents } from "../common/enums";
import { IShape, IShapeObj, UpdateInfoPanel } from "./interfaces";
import { SHAPE_GENERATION_INTERVAL } from "./constants";

export class ShapesController {
  private model: ShapesModel;
  private view: ShapesView;

  constructor(app: Application) {
    this.model = new ShapesModel();
    this.view = new ShapesView(app);

    this.handleUpdateEvents();
    this.handleContainerClick();
    this.startShapeGeneration(SHAPE_GENERATION_INTERVAL);
    this.updateShapesPerSecond();
    this.updateGravity();
  }

  private handleContainerClick(): void {
    this.view.container.on(
      ClickEvents.POINTERDOWN,
      (event: FederatedPointerEvent) => {
        this.handleShapeCreation({
          x: event.global.x,
          y: event.global.y,
        });
      }
    );
  }

  private handleUpdateEvents(): void {
    this.model.eventEmitter.on(
      UpdateEvents.SHAPES_UPDATE,
      this.updateInfoPanel.bind(this)
    );

    this.view.eventEmitter.on(EmittedEvents.NUMBER_OF_SHAPES_DECREASED, () => {
      this.model.decreaseShapesPerSecond();
      this.updateShapesPerSecond();
    });

    this.view.eventEmitter.on(EmittedEvents.NUMBER_OF_SHAPES_INCREASED, () => {
      this.model.increaseShapesPerSecond();
      this.updateShapesPerSecond();
    });

    this.view.eventEmitter.on(EmittedEvents.GRAVITY_DECREASED, () => {
      this.model.decreaseGravity();
      this.updateGravity();
    });

    this.view.eventEmitter.on(EmittedEvents.GRAVITY_INCREASED, () => {
      this.model.increaseGravity();
      this.updateGravity();
    });
  }

  private handleShapeCreation(input: IShape): void {
    const shapeObj = this.view.createRandomShape(input);
    const shapeArea = this.view.calculateArea(shapeObj);

    console.log(shapeObj.instance);

    this.model.addShape(shapeArea);
    this.handleShapeFall(shapeObj);
    this.handleRemoveShape(shapeObj);
  }

  private handleShapeFall(shapeObj: IShapeObj): void {
    const update = () => {
      if (!shapeObj.shape || !shapeObj.shape.parent) {
        this.view.getApp().ticker.remove(update);
        return;
      }

      shapeObj.shape.y += this.model.gravity;

      const shapeBounds = shapeObj.shape.getBounds();
      const parentBounds = this.view.container.getBounds();

      if (shapeBounds.minY >= parentBounds.maxY) {
        const shapeArea = this.view.calculateArea(shapeObj);

        this.model.removeShape(shapeArea);
        this.view.removeShape(shapeObj.shape);

        this.view.getApp().ticker.remove(update);
      }
    };

    this.view.getApp().ticker.add(update);
  }

  private handleRemoveShape(shapeObj: IShapeObj): void {
    shapeObj.shape.on(
      ClickEvents.POINTERDOWN,
      (event: FederatedPointerEvent) => {
        event.stopPropagation();

        const shapeArea = this.view.calculateArea(shapeObj);

        this.model.removeShape(shapeArea);
        this.view.removeShape(shapeObj.shape);
      }
    );
  }

  private startShapeGeneration(interval: number): void {
    setInterval(() => {
      for (let i = 0; i < this.model.shapesPerSecond; i++) {
        this.handleShapeCreation({
          x: Math.random() * this.view.container.width,
          y: this.view.container.y - 100,
        });
      }
    }, interval);
  }

  private updateInfoPanel(input: UpdateInfoPanel): void {
    this.view.updateShapesCountText(input.shapesCount);
    this.view.updateShapesTotalAreaText(input.shapesTotalArea);
  }

  private updateShapesPerSecond(): void {
    this.view.updateShapesPerSecondText(this.model.shapesPerSecond);
  }

  private updateGravity(): void {
    this.view.updateGravityValueText(this.model.gravity);
  }
}
