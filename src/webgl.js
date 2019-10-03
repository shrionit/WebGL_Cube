let canvas = document.createElement('canvas');
var DISPLAY = {
	W: window.innerWidth,
	H: window.innerHeight
};

canvas.width = DISPLAY.W;
canvas.height = DISPLAY.H;
document.body.appendChild(canvas);

let gl = canvas.getContext('webgl');
if(!gl){console.log('webgl is not supported');}

let input = {
	mouse: {
		pressed: false,
		current: {
			x: 0,
			y: 0
		},
		last: {
			x: 0,
			y: 0
		}
	},
	keyboard: {
		pressedKey: '',
		toggleKey: ''
	},
	current: {
		angle: {
			x: 0,
			y: 0
		}
	}
};

canvas.onmousedown = function(e){
	input.mouse.pressed = true;
	input.mouse.last = getMouse(e);
};

canvas.onmousemove = function(e){
	if(input.mouse.pressed){
		input.mouse.current = getMouse(e);
		let factor = 10/canvas.height;
		let dx = factor * (input.mouse.current.x - input.mouse.last.x);
		let dy = factor * (input.mouse.current.y - input.mouse.last.y);
		input.current.angle.x = input.current.angle.x + dx;
		input.current.angle.y = input.current.angle.y + dy;
	}
	input.mouse.last = input.mouse.current;
};

canvas.onmouseup = function(e) {
	input.mouse.last = getMouse(e);
	input.mouse.pressed = false;
};

var lastScroll = 0;
window.onscroll = function(e) {
  let st = document.body.scrollTop;
  if (st > lastScroll) {
    console.log(st);
  } else {
    console.log(st);
  }
  lastScroll = st;
};

function getMouse(event, target) {
	target = target || event.target;
	var rect = target.getBoundingClientRect();

	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	}
}

function map(n, start1, stop1, start2, stop2) {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function onMouseClicked(e){
	c.x = (mX) ? mouseX : c.x;
	c.y = (mY) ? mouseY : c.y;
	let z = vec3.length([mouseX, mouseY, 0.0], [0.0, 0.0, 0.0]);
	
	c.z = (mZ) ? z:c.z;
	spoints.push(...[c.x, c.y, c.z, c.x, c.y, c.z]);
	
	mX = false;
	mY = false;
	v.show();
}

document.body.onkeydown = function(e){
	key = e.key;
	
	switch(key){
		case 'r':
			doRotate = (!doRotate)?true:false;
			break;
		case 'x':
			mX = (!mX) ? true : false;
			break;
		case 'y':
			mY = (!mY) ? true : false;
			break;
		case 'z':
			mZ = (!mZ) ? true : false;
			break;
	}
}


var mats = new Object();
//projection
let projectionMat = mat4.create();
//mat4.identity(projectionMat);
mat4.perspective(projectionMat, toRad(93), canvas.width/canvas.height, 0.1, 1e3);

var cameraObj = {
	z: 1
};

var gui = new dat.GUI();
gui.add(cameraObj, 'z', 0.1, 25);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height); 
  mat4.perspective(
    projectionMat,
    toRad(93),
    window.innerWidth / window.innerHeight,
    0.1,
    1e3
  );

});


function camera(pos, lookat){
	let viewMat = mat4.create();
	mat4.identity(viewMat);
	mat4.lookAt(viewMat, pos, lookat, [0.0, 1.0, 0.0]);
	mat4.invert(viewMat, viewMat);
	return viewMat;
}

/*---------------_________________---------------*/
/*-----------------------------------------------*/

let UniformLoc = {};
let shader = new Shader(gl);
shader.loadMatrices(projectionMat, camera([0.0, 0.51, cameraObj.z], [0.0, 0.0, 0.0]));
let box = new Box(
  shader.get(),
  "tex5.jpg",
  0
);
UniformLoc = shader.uniformObj();
function setup() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}
let a = 0;
function lerp(fv, sv, t){
	return (1-t)*fv + t*sv;
}
function update () {
	gl.clearColor((83-80)/255, (119-80)/255, (166-80)/255, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
	shader.loadMatrices(
    projectionMat,
    camera([0.0, 0.0, -cameraObj.z], [0.0, 0.0, 0.0])
  );
	box.rotate([-input.current.angle.y, input.current.angle.x, 0.0]);
}

function render(){
	requestAnimationFrame(render);
	update();
	box.show();
}

function start(){
	setup();
	render();
}
start();
