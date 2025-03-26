import { EventEmitter } from "pixi.js";
import { UpdateEvents } from "../common/enums";
import {
  GRAVITY,
  SHAPES_COUNT,
  SHAPES_PER_SECOND,
  SHAPES_TOTAL_AREA,
} from "./constants";

export class ShapesModel {
  public eventEmitter: EventEmitter;
  private shapesCount: number = SHAPES_COUNT;
  private shapesTotalArea: number = SHAPES_TOTAL_AREA;
  public gravity: number = GRAVITY;
  public shapesPerSecond: number = SHAPES_PER_SECOND;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  addShape(area: number): void {
    this.shapesCount++;
    this.shapesTotalArea += area;
    this.emitShapesUpdate();
  }

  removeShape(area: number): void {
    this.shapesCount--;
    this.shapesTotalArea -= area;
    this.emitShapesUpdate();
  }

  increaseShapesPerSecond(): number {
    this.shapesPerSecond++;
    this.emitShapesPerSecondUpdate();

    return this.shapesPerSecond;
  }

  decreaseShapesPerSecond(): number {
    if (this.shapesPerSecond > SHAPES_PER_SECOND) {
      this.shapesPerSecond--;
      this.emitShapesPerSecondUpdate();
    }

    return this.shapesPerSecond;
  }

  increaseGravity(): number {
    this.gravity = +(this.gravity + GRAVITY).toFixed(2);
    this.emitGravityUpdate();

    return this.gravity;
  }

  decreaseGravity(): number {
    if (this.gravity > GRAVITY) {
      this.gravity = +(this.gravity - GRAVITY).toFixed(2);
      this.emitGravityUpdate();
    }

    return this.gravity;
  }

  private emitShapesPerSecondUpdate(): void {
    this.eventEmitter.emit(
      UpdateEvents.SHAPES_PER_SECOND_UPDATE,
      this.shapesPerSecond
    );
  }

  private emitGravityUpdate(): void {
    this.eventEmitter.emit(UpdateEvents.GRAVITY_UPDATE, this.gravity);
  }

  private emitShapesUpdate(): void {
    this.eventEmitter.emit(UpdateEvents.SHAPES_UPDATE, {
      shapesCount: this.shapesCount,
      shapesTotalArea: this.shapesTotalArea,
    });
  }
}
