/*------------------
 SETUP CANVAS & SETTINGS
------------------*/
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = '#fff';

const fps = 30;
const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
  shoot: false,
};

/*------------------
 GAME ASSETS
------------------*/
function Box(x, y, width, height, speed = 30) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
}
Box.prototype.draw = function draw() {
  c.fillRect(this.x, this.y, this.width, this.height);
};

const ed = new Box(100, 100, 100, 100, 15);
const redBox = new Box(140, 90, 10, 10, 15);
const bullets = [];

ed.moveUp = function move() {
  if (this.y < 0) return;
  this.y -= this.speed;
  redBox.y -= redBox.speed;
};
ed.moveDown = function move() {
  if (this.y > canvas.height - this.height) return;
  this.y += this.speed;
  redBox.y += redBox.speed;
};
ed.moveLeft = function move() {
  if (this.x < 0) return;
  this.x -= this.speed;
  redBox.x -= redBox.speed;
};
ed.moveRight = function move() {
  if (this.x > canvas.width - this.width) return;
  this.x += this.speed;
  redBox.x += redBox.speed;
};

/*------------------
 EVENT LISTENERS
------------------*/
document.addEventListener('keydown', checkKey);
document.addEventListener('keyup', unCheckKey);

/*------------------
 GAME LOOP
------------------*/
function gameLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  updatePositions();
  redraw();
}

setInterval(gameLoop, 1000 / fps);

/*------------------
  HELPER FUNCTIONS
------------------*/
function checkKey(e) {
  if (e.keyCode === 38) controls.up = true;
  else if (e.keyCode === 40) controls.down = true;
  else if (e.keyCode === 37) controls.left = true;
  else if (e.keyCode === 39) controls.right = true;
  else if (e.keyCode === 32) controls.shoot = true;
}

function unCheckKey(e) {
  if (e.keyCode === 38) controls.up = false;
  else if (e.keyCode === 40) controls.down = false;
  else if (e.keyCode === 37) controls.left = false;
  else if (e.keyCode === 39) controls.right = false;
  else if (e.keyCode === 32) controls.shoot = false;
}

function updatePositions() {
  if (controls.up) ed.moveUp();
  if (controls.down) ed.moveDown();
  if (controls.left) ed.moveLeft();
  if (controls.right) ed.moveRight();

  if (controls.shoot) {
    // bullets.push(new Box(ed.x + 20, ed.y + 40, 10, 10));
    bullets.push(new Box(ed.x + 40, ed.y + 40, 10, 10));
    // bullets.push(new Box(ed.x + 60, ed.y + 40, 10, 10));
  }
}

function redraw() {
  ed.draw();
  redBox.draw();

  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y > -bullets[i].speed && bullets[i].y < canvas.height) {
      bullets[i].y -= bullets[i].speed;
      bullets[i].draw();
    } else bullets.splice(i, 1);
  }
}
