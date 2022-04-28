import SpriteComponent from "./component/sprite.component";
import Entity from "./entity/base.entity";

export const hello = "hello";

class Player extends Entity {}

function init() {
  const canvas = document.querySelector("canvas");
  const c = canvas?.getContext("2d");
  if (!canvas || !c) {
    throw new Error("Could not find canvas, aborting");
  }

  canvas.width = 1024;
  canvas.height = 592;
  c.fillRect(0, 0, canvas.width, canvas.height);

  const playerImage = new Image();
  playerImage.src = "images/player-image.png";

  const myPlayer = new Player();
  myPlayer.addComponent(new SpriteComponent(playerImage, c));

  let gameObjects: Entity[] = [];
  gameObjects.push(myPlayer);

  function gameLoop() {
    gameObjects.forEach((entity) =>
      entity.components.forEach((component) => component.onUpdate(100))
    );
  }
  setInterval(gameLoop, 33);
}

window.addEventListener("DOMContentLoaded", init);
