import kaboom from "./lib/kaboom.mjs";

// Initialize Kaboom
kaboom({
  font: "sans-serif",
  background: [144, 238, 144],
});

// load the sprites
loadSprite("ninja", "./sprites/ninja.png");
loadSprite("apple", "./sprites/apple.png");
loadSprite("bomb", "./sprites/bomb.png");

// load the musics
loadSound("background", "./sounds/background.mp3");
loadSound("applemunch", "./sounds/applemunch.mp3");
loadSound("explosion", "./sounds/explosion.mp3");
loadSound("gameover", "./sounds/gameover.mp3");

// game variables
const SPEED = 600;
const BSPEED = 5;
const SCORE = add([text("Score: 0"), pos(24, 24), { value: 0 }]);

// Add the player to the game world
const player = add([
  sprite("ninja"),
  pos(80, 40),
  area(),
  // body(),
  // setGravity(800) // Sets gravity to 2400 units
]);

onClick(() => {
  // Add a kaboom effect at the current mouse position
  addKaboom(mousePos());
});

// Handle movement / key functions
onKeyDown("left", () => {
  player.move(-SPEED, 0); // Move left
});

onKeyDown("right", () => {
  player.move(SPEED, 0); // Move right
});

onKeyDown("up", () => {
  player.move(0, -SPEED); // Move up
});

onKeyDown("down", () => {
  player.move(0, SPEED); // Move down
});

// add the bombs and apples
setInterval(() => {
  for (let i = 0; i < 5; i++) {
    let x = rand(0, width());
    let y = height();
    let bomb = add([
      sprite("bomb"),
      pos(x, y),
      area(),
      "bomb", // Tag for bombs
    ]);
    bomb.onUpdate(() => {
      bomb.moveTo(bomb.pos.x, bomb.pos.y - BSPEED);
    });
  }
  let x = rand(0, width());
  let y = height();
  let apple = add([
    sprite("apple"),
    pos(x, y),
    area(),
    "apple", // Tag for apples
  ]);
  apple.onUpdate(() => {
    apple.moveTo(apple.pos.x, apple.pos.y - BSPEED);
  });
}, 3000);

player.onCollide("bomb", () => {
  play("explosion");
  destroy(player);
  addKaboom(player.pos);
});

player.onCollide("apple", (apple) => {
  play("applemunch");
  destroy(apple);
  SCORE.value += 1;
  SCORE.text = "Score: " + SCORE.value;
});

play("background");
