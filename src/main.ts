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

  window.addEventListener("resize", () => resize());

  function resize() {
    // current screen size
    const screenWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const screenHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    // scale factor for our game canvas
    const scale = Math.min(
      screenWidth / 400,
      screenHeight / 400
    );

    // scaled width and height
    const enlargedWidth = Math.floor(scale * 400);
    const enlargedHeight = Math.floor(scale * 400);

    // margins for centering
    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    // CSS to set the sizes and margins
    app.view.style.width = `${enlargedWidth}px`;
    app.view.style.height = `${enlargedHeight}px`;
    app.view.style.marginLeft =
      app.view.style.marginRight = `${horizontalMargin}px`;
    app.view.style.marginTop =
      app.view.style.marginBottom = `${verticalMargin}px`;
  }
})();
