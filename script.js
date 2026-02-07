const map = document.getElementById("map");
const player = document.getElementById("player");

/* CONFIGURAÇÕES */
const tileSize = 48;
const mapTiles = 20; // 20x20 tiles
const mapSize = tileSize * mapTiles;
const speed = 3;

/* viewport */
const viewW = 360;
const viewH = 420;

/* posição inicial da ilhama */
let playerX = mapSize / 2;
let playerY = mapSize / 2;

/*
0 = grama (andar)
1 = casa / celeiro
2 = estrada (andar)
3 = água
4 = plantação
5 = cerca / árvore
*/
const collisionMap = [
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,5],
  [5,0,4,4,4,2,1,1,1,2,0,4,4,4,0,0,0,0,0,5],
  [5,0,4,4,4,2,1,1,1,2,0,4,4,4,0,3,3,3,0,5],
  [5,0,0,0,0,2,2,2,2,2,0,0,0,0,0,3,3,3,0,5],
  [5,0,5,5,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0,5],
  [5,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,5],
  [5,0,0,0,0,4,4,4,0,0,0,1,1,1,0,0,0,0,0,5],
  [5,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
];

/* CONTROLES */
const keys = {};
window.addEventListener("keydown", e => {
  e.preventDefault();
  keys[e.key] = true;
});
window.addEventListener("keyup", e => keys[e.key] = false);

/* COLISÃO */
function canMove(x, y) {
  const col = Math.floor((x + 24) / tileSize);
  const row = Math.floor((y + 24) / tileSize);

  const tile = collisionMap[row]?.[col];
  return tile === 0 || tile === 2;
}

/* LOOP PRINCIPAL */
function loop() {
  let nextX = playerX;
  let nextY = playerY;

  if (keys["ArrowUp"]) nextY -= speed;
  if (keys["ArrowDown"]) nextY += speed;
  if (keys["ArrowLeft"]) nextX -= speed;
  if (keys["ArrowRight"]) nextX += speed;

  if (canMove(nextX, nextY)) {
    playerX = nextX;
    playerY = nextY;
  }

  /* câmera segue a ilhama */
  const camX = Math.min(
    Math.max(playerX - viewW / 2, 0),
    mapSize - viewW
  );

  const camY = Math.min(
    Math.max(playerY - viewH / 2, 0),
    mapSize - viewH
  );

  map.style.left = -camX + "px";
  map.style.top = -camY + "px";

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  requestAnimationFrame(loop);
}

loop();
