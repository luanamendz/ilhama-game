const player = document.getElementById("player");

/* posição inicial */
let posY = 176;

/* configurações */
const velocidade = 8;
const areaAltura = 400;
const playerAltura = 48;

/* limites */
const limiteTop = 0;
const limiteBottom = areaAltura - playerAltura;

/* controle do teclado */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    posY -= velocidade;
  }

  if (e.key === "ArrowDown") {
    posY += velocidade;
  }

  if (posY < limiteTop) posY = limiteTop;
  if (posY > limiteBottom) posY = limiteBottom;

  player.style.top = posY + "px";
});
