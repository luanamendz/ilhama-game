const player = document.getElementById("player");

let posY = 176;
const velocidade = 6;

/* spritesheet config */
const frameWidth = 48;
const frameHeight = 48;
const columns = 2;
const rows = 3;
const totalFrames = 6;

let currentFrame = 0;
let moving = false;

/* animação */
function animate() {
  if (moving) {
    currentFrame = (currentFrame + 1) % totalFrames;

    const col = currentFrame % columns;
    const row = Math.floor(currentFrame / columns);

    const x = col * frameWidth;
    const y = row * frameHeight;

    player.style.backgroundPosition = `-${x}px -${y}px`;
  }

  requestAnimationFrame(animate);
}

/* controle */
document.addEventListener("keydown", (e) => {
  moving = true;

  if (e.key === "ArrowUp") {
    posY -= velocidade;
  }

  if (e.key === "ArrowDown") {
    posY += velocidade;
  }

  if (posY < 0) posY = 0;
  if (posY > 400 - frameHeight) posY = 400 - frameHeight;

  player.style.top = posY + "px";
});

document.addEventListener("keyup", () => {
  moving = false;
});

/* start animation */
animate();
