const player = document.getElementById("player");

/* posição */
let x = 136;
let y = 176;
const speed = 4;

/* spritesheet */
const frameWidth = 48;
const frameHeight = 48;
const columns = 2;
const totalFrames = 2; // por linha

/* estado */
let frame = 0;
let direction = "down";
let moving = false;

/* mapa de animações */
const animations = {
  down: 0,
  up: 1,
  side: 2
};

/* teclado */
const keys = {};

document.addEventListener("keydown", e => {
  keys[e.key] = true;
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

/* loop */
function gameLoop() {
  moving = false;

  if (keys["ArrowUp"]) {
    y -= speed;
    direction = "up";
    moving = true;
  }
  if (keys["ArrowDown"]) {
    y += speed;
    direction = "down";
    moving = true;
  }
  if (keys["ArrowLeft"]) {
    x -= speed;
    direction = "side";
    player.style.transform = "scaleX(-1)";
    moving = true;
  }
  if (keys["ArrowRight"]) {
    x += speed;
    direction = "side";
    player.style.transform = "scaleX(1)";
    moving = true;
  }

  /* limites */
  x = Math.max(0, Math.min(320 - frameWidth, x));
  y = Math.max(0, Math.min(400 - frameHeight, y));

  player.style.left = x + "px";
  player.style.top = y + "px";

  /* animação */
  if (moving) {
    frame = (frame + 0.15) % totalFrames;
  } else {
    frame = 0;
  }

  const col = Math.floor(frame);
  const row = animations[direction];

  player.style.backgroundPosition =
    `-${col * frameWidth}px -${row * frameHeight}px`;

  requestAnimationFrame(gameLoop);
}

gameLoop();
