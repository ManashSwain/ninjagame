// Import kaboom
import kaboom from "./lib/kaboom.mjs";

// start game
kaboom({
  font: "sans-serif",
  background: [144, 238, 144],
});

// game variables

const SPEED = 700;
const BSPEED = 5;
let gameover = false;

// load the sprites / characters
loadSprite("ninja", "./sprites/ninja.png");
loadSprite("apple", "./sprites/apple.png");
loadSprite("bomb", "./sprites/bomb.png");

// load the musics
loadSound("applemunch", "./sounds/applemunch.mp3");
loadSound("background", "./sounds/background.mp3");
loadSound("explosion", "./sounds/explosion.mp3");
loadSound("gameover", "./sounds/gameover.mp3");

// a simple score counter
const score = add([
  text("Score: 0"),
  pos(1324, 24),
  color(0, 0, 255),
  { value: 0 },
]);

// initial start
const initialstart = add([
  text("left click on the mouse to start"),
  pos(24, 24),
  color(255, 0, 0),
]);

// add the character to screen
const player = add([sprite("ninja"), pos(120, 80), area()]);

// key functions

onKeyDown("left", () => {
  player.move(-SPEED, 0);
});

onKeyDown("right", () => {
  player.move(SPEED, 0);
});

onKeyDown("up", () => {
  player.move(0, -SPEED);
});

onKeyDown("down", () => {
  player.move(0, SPEED);
});

// click  on the screen to get kaboom
onClick(() => {
  addKaboom(mousePos());
  initialstart.destroy();
});

// create apple and bombs

    let a = setInterval(() => {
        for (let i = 0; i < 5; i++) {
          let x = rand(0, width());
          let y = height();
          const bomb = add([sprite("bomb"), pos(x, y), area(), "bomb"]);
          bomb.onUpdate(() => {
            bomb.moveTo(bomb.pos.x, bomb.pos.y - BSPEED);
          });
        }
        let x = rand(0, width());
        let y = height();
        const apple = add([sprite("apple"), pos(x, y), area(), "apple"]);
        apple.onUpdate(() => {
          apple.moveTo(apple.pos.x, apple.pos.y - BSPEED);
        });
      }, 2000);



// collide functions
// collide to apple to get points
player.onCollide("apple", (apple) => {
  if (!gameover) {
    play("applemunch");
    destroy(apple);
    score.value += 1;
    score.text = "Score:" + score.value;
  }
});
// collide to bomb to stop the game

player.onCollide("bomb", () => {
  if (!gameover) {
    destroy(player);
    play("gameover");
    addKaboom(player.pos);
    gameover = true;
    clearTimeout(a);
    add([
      text("Game Over"),
      pos(center().x - 100, center().y),
      color(0, 0, 255),
    ]);
    add([
      text("Refresh to restart"),
      pos(center().x - 160, center().y + 80),
      color(0, 0, 255),
    ]);
  }
});

if (!gameover) {
  play("background", { loop: true });
}
