import { Application, FederatedPointerEvent, Graphics } from "pixi.js";
import { ShapesModel } from "./ShapesModel";
import { ShapesView } from "./ShapesView";
import { ClickEvents, EmittedEvents, UpdateEvents } from "../common/enums";
import { cirlceSettings } from "./config";
import { ICircle } from "../common/interfaces";
import { UpdateInfoPanel } from "./interfaces";
import { SHAPE_GENERATION_INTERVAL } from "./contants";

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
          ...cirlceSettings,
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

  private handleShapeCreation(input: ICircle): void {
    const shape = this.view.createCircle(input);
    const shapeArea = this.view.calculateCircleArea(shape);

    this.model.addShape(shapeArea);
    this.handleShapeFall(shape);
    this.addClickToRemove(shape);
  }

  private handleShapeFall(shape: Graphics): void {
    let velocity = 0;

    const update = () => {
      if (!shape || !shape.parent) {
        this.view.getApp().ticker.remove(update);

        return;
      }

      velocity += this.model.gravity;
      shape.y += velocity;

      const shapeBounds = shape.getBounds();
      const parentBounds = this.view.container.getBounds();

      if (shapeBounds.minY >= parentBounds.maxY) {
        velocity = 0;

        const shapeArea = this.view.calculateCircleArea(shape);

        this.model.removeShape(shapeArea);
        this.view.removeCircle(shape);

        this.view.getApp().ticker.remove(update);
      }
    };

    this.view.getApp().ticker.add(update);
  }

  private addClickToRemove(shape: Graphics): void {
    shape.on(ClickEvents.POINTERDOWN, (event) => {
      event.stopPropagation();

      const shapeArea = this.view.calculateCircleArea(shape);

      this.model.removeShape(shapeArea);
      this.view.removeCircle(shape);
    });
  }

  private startShapeGeneration(interval: number): void {
    setInterval(() => {
      for (let i = 0; i < this.model.shapesPerSecond; i++) {
        this.handleShapeCreation({
          ...cirlceSettings,
          x: Math.random() * this.view.container.width,
          y: -cirlceSettings.radius,
        });
      }
    }, interval);
  }

  private updateInfoPanel(input: UpdateInfoPanel): void {
    this.view.updateShapesCountText(input.circlesCount);
    this.view.updateShapesTotalAreaText(input.circlesTotalArea);
  }

  private updateShapesPerSecond(): void {
    this.view.updateShapesPerSecondText(this.model.shapesPerSecond);
  }

  private updateGravity(): void {
    this.view.updateGravityValueText(this.model.gravity);
  }
}
