const map = document.getElementById("map");
const player = document.getElementById("player");

/* CONFIG */
const speed = 2.5;
const frameWidth = 48;
const frameCount = 4;

/* TAMANHO REAL DO MAPA */
const mapWidth = 1536;
const mapHeight = 1536;

/* viewport */
const viewW = 360;
const viewH = 420;

/* posição */
let playerX = mapWidth / 2;
let playerY = mapHeight / 2;

/* animação */
let frame = 0;
let frameTimer = 0;

/* controles */
const keys = {};
window.addEventListener("keydown", e => {
  e.preventDefault();
  keys[e.key] = true;
});
window.addEventListener("keyup", e => keys[e.key] = false);

/* LOOP */
function loop() {
  let moving = false;

  if (keys["ArrowUp"]) {
    playerY -= speed;
    moving = true;
  }
  if (keys["ArrowDown"]) {
    playerY += speed;
    moving = true;
  }
  if (keys["ArrowLeft"]) {
    playerX -= speed;
    moving = true;
  }
  if (keys["ArrowRight"]) {
    playerX += speed;
    moving = true;
  }

  /* anima só se estiver andando */
  if (moving) {
    frameTimer++;
    if (frameTimer > 8) {
      frame = (frame + 1) % frameCount;
      frameTimer = 0;
    }
  } else {
    frame = 0; // parado
  }

  player.style.backgroundPosition = `-${frame * frameWidth}px 0`;

  /* limites */
  playerX = Math.max(0, Math.min(playerX, mapWidth - frameWidth));
  playerY = Math.max(0, Math.min(playerY, mapHeight - frameWidth));

  /* câmera */
  const camX = Math.min(
    Math.max(playerX - viewW / 2, 0),
    mapWidth - viewW
  );
  const camY = Math.min(
    Math.max(playerY - viewH / 2, 0),
    mapHeight - viewH
  );

  map.style.left = -camX + "px";
  map.style.top = -camY + "px";

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  requestAnimationFrame(loop);
}

loop();
