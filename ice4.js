console.clear();

// ----------------------------------------------
// This code is given to you, do not modify.
// ----------------------------------------------

let canvas = document.getElementById("game");
let context2d = canvas.getContext("2d");
let pacman_model = new Array();
let time_index = 0;
let key = null;
let radius = 40;

context2d.fillStyle = "yellow";
context2d.strokeStyle = "black";

document.addEventListener( "keyup", keyEvent );

function keyEvent( event ) {
	key = event.key;
  console.log( key );
}

// ----------------------------------------------
// Task 1: Todo - put JS code below.
// ----------------------------------------------
function createModel() {
  function pacmanPath(theta) {
    const p = new Path2D();
    if (theta === 0) {
      p.arc(0, 0, radius, 0, Math.PI * 2, false);
      return p;
    }
    const start = theta;                 // clockwise start
    const end = Math.PI * 2 - theta;     // clockwise end
    p.moveTo(0, 0);
    p.arc(0, 0, radius, start, end, false);
    p.closePath();
    return p;
  }

  pacman_model[0] = pacmanPath(0);
  const partial = pacmanPath(Math.PI / 6);
  pacman_model[1] = partial;
  pacman_model[2] = pacmanPath(Math.PI / 3);
  pacman_model[3] = partial; 
}


// ----------------------------------------------
// Task 2: Todo - put JS code below.
// ----------------------------------------------
function draw() {
  context2d.clearRect(0, 0, canvas.width, canvas.height);

  context2d.save();

  context2d.translate(canvas.width / 2, canvas.height / 2);

  switch (key) {
    case "ArrowUp":
      context2d.rotate(-Math.PI / 2);
      break;
    case "ArrowDown":
      context2d.rotate(Math.PI / 2);
      break;
    case "ArrowLeft":
      context2d.scale(-1, 1);
      break;
    default:
      break;
  }

  const shape = pacman_model[time_index % pacman_model.length];
  context2d.fill(shape);
  context2d.stroke(shape);

  context2d.restore();
  time_index = (time_index + 1) % 4;
}



// ----------------------------------------------
// Task 3: Todo - put JS code below.
// ----------------------------------------------

createModel();
setInterval(draw, 150);


