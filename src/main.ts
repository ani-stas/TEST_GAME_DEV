import { Application } from "pixi.js";
import { ShapesController } from "./shapesMechanic/ShapesController";

(async () => {
  const app = new Application();

  await app.init({
    background: "#343636",
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);

  new ShapesController(app);
})();
