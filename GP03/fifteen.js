var state = 1;
var puzzle = document.getElementById('puzzle');
var steps = 0;
//create a solved puzzle
solve();

puzzle.addEventListener('click', function (e) {
	if (state == 1) {
		// Enables sliding animation
		puzzle.className = 'animate';
		shiftCell(e.target);
	}
	//count how many times user moved the block before solving
	steps++;
});

document.getElementById('solve').addEventListener('click', solve);
document.getElementById('shuffle').addEventListener('click', shuffle);
//puzzle return to initial solved state
function solve() {

	if (state == 0) {
		return;
	}

	puzzle.innerHTML = '';

	var n = 1;
	//go through all elements in puzzle
	for (var i = 0; i <= 3; i++) {
		for (var j = 0; j <= 3; j++) {
			var cell = document.createElement('span');
			cell.id = 'cell-' + i + '-' + j;
			cell.style.left = (j * 80 + 1 * j + 1) + 'px';
			cell.style.top = (i * 80 + 1 * i + 1) + 'px';
			//create the first 15 non-empty elements
			if (n <= 15) {
				cell.classList.add('moveablepiece');
				cell.classList.add((i % 2 == 0 && j % 2 > 0 || i % 2 > 0 && j % 2 == 0) ? 'dark' : 'light');
				cell.innerHTML = (n++).toString();
			} else {
				cell.className = 'empty';
			}
			puzzle.appendChild(cell);
		}
	}

}

function shiftCell(cell) {

	if (cell.className != 'empty') {

		var emptyCell = getEmptyAdjacentCell(cell);

		if (emptyCell) {
			var tmp = { style: cell.style.cssText, id: cell.id };
			cell.style.cssText = emptyCell.style.cssText;
			cell.id = emptyCell.id;
			emptyCell.style.cssText = tmp.style;
			emptyCell.id = tmp.id;

			if (state == 1) {
				checkOrder();
			}
		}
	}

}

function getCell(row, col) {
	//return row+column of cell
	return document.getElementById('cell-' + row + '-' + col);
}

function getEmptyCell() {

	return puzzle.querySelector('.empty');
}

function getEmptyAdjacentCell(cell) {

	var adjacent = getAdjacentCells(cell);

	for (var i = 0; i < adjacent.length; i++) {
		if (adjacent[i].className == 'empty') {
			return adjacent[i];
		}
	}
	return false;
}

function getAdjacentCells(cell) {
//split the id of element in getCell
	var id = cell.id.split('-');
	var row = parseInt(id[1]);
	var col = parseInt(id[2]);
	var adjacent = [];

	if (row < 3) { adjacent.push(getCell(row + 1, col)); }
	if (row > 0) { adjacent.push(getCell(row - 1, col)); }
	if (col < 3) { adjacent.push(getCell(row, col + 1)); }
	if (col > 0) { adjacent.push(getCell(row, col - 1)); }

	return adjacent;

}

function checkOrder() {

	if (getCell(3, 3).className != 'empty') {
		return;
	}
	var n = 1;
	for (var i = 0; i <= 3; i++) {
		for (var j = 0; j <= 3; j++) {
			if (n <= 15 && getCell(i, j).innerHTML != n.toString()) {
				return;
			}
			n++;
		}
	}
//check if the user has finished the puzzle
//display message and the counted steps
	if (confirm('Congrats, You did it in ' + steps + ' steps\nshuffle the puzzle?')) {
		shuffle();
	}

}
//shuffle function
function shuffle() {

	if (state == 0) {
		return;
	}

	puzzle.removeAttribute('class');
	state = 0;

	var previousCell;
	var i = 1;
	var interval = setInterval(function () {
		if (i <= 100) {
			var adjacent = getAdjacentCells(getEmptyCell());
			if (previousCell) {
				for (var j = adjacent.length - 1; j >= 0; j--) {
					if (adjacent[j].innerHTML == previousCell.innerHTML) {
						adjacent.splice(j, 1);
					}
				}
			}
			previousCell = adjacent[rand(0, adjacent.length - 1)];
			shiftCell(previousCell);
			i++;
		} else {
			clearInterval(interval);
			state = 1;
		}
	})
}

function rand(from, to) {

	return Math.floor(Math.random() * (to - from + 1)) + from;
}

