var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 1600;
var canvasHeight = 1200;
var squareSize = 4;

var grid = [];
var gridX = canvasWidth / squareSize;
var gridY = canvasHeight / squareSize;
var currentLoc;

var upValid;
var downValid;
var leftValid;
var rightValid;

function initBackground() {
	ctx.beginPath();
	ctx.rect(0,0,canvasWidth, canvasHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
};

function initGrid() {
	for (var i = 0; i < gridY; i++) {
		var row = [];
		for (var j = 0; j < gridX; j++) {
			row.push(0);
		}
		grid.push(row);
	}
};

function test() {
	for (var i = 0; i < gridY; i++) {
		for (var j = 0; j < gridX; j++) {
			ctx.beginPath();
			ctx.moveTo((j*squareSize), (i*squareSize));
			ctx.lineTo((j*squareSize)+squareSize,(i * squareSize) + squareSize);
			ctx.lineWidth = squareSize / 2;
			//ctx.strokeStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.closePath();
		}
	}
}

function createMaze() {
	currentLoc = randomCoordinate();
	for (var i = 0; i < ((gridX * gridY) /2); i++) {
		grid[currentLoc[1]][currentLoc[0]] = 1;
		validDir();

		while (!upValid && !downValid && !leftValid && !rightValid) {
			currentLoc = randomCoordinate();
			validDir();
		}
		
		var valid = false;
		while (!valid) {
			
			ctx.beginPath();
			ctx.moveTo(currentLoc[0] * squareSize, currentLoc[1] * squareSize);

			var dir = Math.floor((Math.random() * 4));
			if (dir == 0 && upValid) {
				valid = true;
				currentLoc[1] -= 1;
			} else if (dir == 1 && rightValid) {
				valid = true;
				currentLoc[0] += 1;
			} else if (dir == 2 && downValid) {
				valid = true;
				currentLoc[1] += 1;
			} else if (dir == 3 && leftValid) {
				valid = true;
				currentLoc[0] -= 1;
			} 

			ctx.lineTo(currentLoc[0] * squareSize, currentLoc[1] * squareSize);
			ctx.lineWidth = squareSize / 2;
			ctx.strokeStyle = "white"; //'hsl(' + 360 * Math.random() + ', 50%, 50%)';
			ctx.stroke();
			ctx.closePath();
		}
	}
}

function randomCoordinate() {

	var randomArr = [Math.floor((Math.random() * gridX)), Math.floor((Math.random() * gridY))];
	while (grid[randomArr[1]][randomArr[0]] == 1) {
		randomArr = [Math.floor((Math.random() * gridX)), Math.floor((Math.random() * gridY))];
	}
	return randomArr;
}

function validDir() {
	resetDir();
	if (currentLoc[1] == 0 || grid[currentLoc[1] - 1][currentLoc[0]] == 1) {
		upValid = false;
	}
	if (currentLoc[0] == 0 || grid[currentLoc[1]][currentLoc[0] - 1] == 1) {
		leftValid = false;
	}
	if (currentLoc[1] == gridY - 1 || grid[currentLoc[1] + 1][currentLoc[0]] == 1) {
		downValid = false;
	}
	if (currentLoc[0] == gridX - 1 || grid[currentLoc[1]][currentLoc[0] + 1] == 1) {
		rightValid = false;
	}
}

function resetDir() {
	upValid = true;
	leftValid = true;
	downValid = true;
	rightValid = true;
}

initBackground();
initGrid();
test();
createMaze();
