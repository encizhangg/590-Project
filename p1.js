console.clear();

// ----------------------------------------------
// Do not modify this code.
// ----------------------------------------------

let canvas = document.getElementById("game");
let context2d = canvas.getContext("2d");
let pacman_model = null;
let snack_pellets = null;
let time_index = 0;
let key = null;
let radius = 20; 
let displacement = 5;
let score = 0;
let paused = true;
let x_pacman = 0;
let y_pacman = 0; 
let walls = null; //NEW

function createWalls() {//NEW
  walls = [
    { x: 45, y: 65, width: 110, height: 15 },
    { x: 265, y: 95, width: 20, height: 160 }
    // add more if needed
  ];
}

function collidesWithWall(x, y) { //NEW
  for (let wall of walls) {
    if (x + radius > wall.x &&
        x - radius < wall.x + wall.width &&
        y + radius > wall.y &&
        y - radius < wall.y + wall.height) {
      return true;
    }
  }
  return false;
}

function hypotenus( a, b ) {
  return Math.sqrt( Math.pow( a, 2 ) + Math.pow(  b, 2 ) );
}

function createSnackPellets() { 
  let index = 0;
  let pellet_radius = 3;
  let space = 25;
  let path = null; 
  
  for ( let y_pellet = space; y_pellet < canvas.height; y_pellet+= space ) {
  
    for ( let x_pellet = space; x_pellet < canvas.width; x_pellet+= space ) {
    
      if ( hypotenus( ( x_pellet - canvas.width/2 ), ( y_pellet - canvas.height/2 ) )  >  ( radius + space/2 ) ) {
      
        path = new Path2D();
        path.arc( x_pellet, y_pellet, pellet_radius, 0, 2*Math.PI );
        snack_pellets[index++] = { x: x_pellet, y: y_pellet, circle:path };
      }
     
    }
    
  }
  
}

function createModel() {

  pacman_model[0] = new Path2D();
  pacman_model[0].moveTo( 0, 0 );
  pacman_model[0].arc( 0, 0, radius, 0, 2*Math.PI );
  pacman_model[0].lineTo( 0, 0 );
  
  pacman_model[1] = new Path2D();
  pacman_model[1].moveTo( 0, 0 );
  pacman_model[1].lineTo( radius*Math.cos( 25*Math.PI)/180, radius*Math.sin( 25*Math.PI)/180);
  pacman_model[1].arc( 0, 0, radius, 25*Math.PI/180, -25*Math.PI/180 );
  pacman_model[1].lineTo( 0, 0 );
  
  pacman_model[2] = new Path2D();
  pacman_model[2].moveTo( 0, 0 );
  pacman_model[2].lineTo( radius*Math.cos( 45*Math.PI/180), radius*Math.sin( 45*Math.PI/180));
  pacman_model[2].arc( 0, 0, radius, 45*Math.PI/180, -45*Math.PI/180 );
  pacman_model[2].lineTo( 0, 0 );
  
  pacman_model[3] = pacman_model[1];

}

// ----------------------------------------------
// Task 1: Todo - put JS code below.
// ----------------------------------------------
function startGame() {
  x_pacman = canvas.width / 2;
  y_pacman = canvas.height / 2;
  time_index = 0;
  score = 0;
  pacman_model = [];
  snack_pellets = [];
  key = "ArrowRight";
  paused = true;
  createModel();
  createSnackPellets();
  createWalls();
}



// ----------------------------------------------
// Task 2: Todo - modify the JS code below.
// ----------------------------------------------
document.addEventListener("keyup", keyEvent);

function keyEvent(event) {
  if (event.key === "s") {
    startGame();
  } else if (event.key === " ") {
    paused = !paused;
  } else if (!paused &&
    (event.key === "ArrowUp" || event.key === "ArrowDown" ||
     event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    key = event.key;
  }
}



// ----------------------------------------------
// Task 3: Todo - put JS code below.
// ----------------------------------------------
function draw() {
  document.getElementById("score").innerText = score;

  context2d.clearRect(0, 0, canvas.width, canvas.height);

  context2d.fillStyle = "black";
  for (let i = snack_pellets.length - 1; i >= 0; i--) {
    let pellet = snack_pellets[i];
    let d = hypotenus(x_pacman - pellet.x, y_pacman - pellet.y);
    if (d < radius / 2) {
      snack_pellets.splice(i, 1);
      score += 10;
    } else {
      context2d.fill(pellet.circle);
    }
  }

  context2d.fillStyle = "blue";
  for (let wall of walls) {
    context2d.fillRect(wall.x, wall.y, wall.width, wall.height);
  }

  x_pacman = Math.min(Math.max(radius, x_pacman), canvas.width - radius);
  y_pacman = Math.min(Math.max(radius, y_pacman), canvas.height - radius);

  context2d.save();

  context2d.translate(x_pacman, y_pacman);

  if (key === "ArrowRight") context2d.rotate(0);
  else if (key === "ArrowLeft") context2d.rotate(Math.PI);
  else if (key === "ArrowUp") context2d.rotate(-Math.PI / 2);
  else if (key === "ArrowDown") context2d.rotate(Math.PI / 2);

  if (!paused) {
    let newX = x_pacman;
    let newY = y_pacman;

    if (key === "ArrowRight") newX += displacement;
    else if (key === "ArrowLeft") newX -= displacement;
    else if (key === "ArrowUp") newY -= displacement;
    else if (key === "ArrowDown") newY += displacement;

    if (!collidesWithWall(newX, newY)) {
      x_pacman = newX;
      y_pacman = newY;
    }
  }

  context2d.fillStyle = "yellow";
  context2d.fill(pacman_model[time_index]);

  context2d.restore();

  time_index++;
  if (time_index >= 4) time_index = 0;
}




// ----------------------------------------------
// Task 4: Todo - put JS code below.
// ----------------------------------------------
startGame(); 
setInterval(draw, 100);

