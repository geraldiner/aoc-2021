/** PART 1
 * See info: https://adventofcode.com/2021/day/5
 * 
 * Given a list of coordinates that form horizontal/vertical lines, count the intersection points (where hydrothermal vents are most dangerous)
 */



const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day05/${filename}`, 'utf8');
  let contents = fileString.split("\n");
	return contents;
}

function makeGrid(input) {
	const maxSize = findMaxSize(input);
	let markedGrid = {}
	/**
	 * Go through input line by line
	 * Split the line by ' -> ' to get the 2 points
	 * From one direction to the other, add 1 to the point the line goes through
	 * 0,9 -> 5,9 = markedGrid[0,9] += 1, markedGrid[1,9] += 1, and so on..
	 */
	for (let i = 0; i < input.length; i++) {
		let line = input[i];
		let [x1, y1, x2, y2] = line.split(" -> ").reduce((acc,curr) => {
			return acc.concat(curr.split(","))
		}, []).map(x => parseInt(x));
		if (x1 === x2) {
			let higher = Math.max(y1,y2);
			let lower = Math.min(y1,y2);
			for (let i = lower; i <= higher; i++) {
				let point = `${x1},${i}`;
				if (markedGrid[point]) {
					markedGrid[point] += 1;
				} else {
					markedGrid[point] = 1
				}
			}
		} else if (y1 === y2) {
			let higher = Math.max(x1,x2);
			let lower = Math.min(x1,x2);
			for (let i = lower; i <= higher; i++) {
				let point = `${i},${y1}`;
								if (markedGrid[point]) {
					markedGrid[point] += 1;
				} else {
					markedGrid[point] = 1
				}
			}
		}
	}
	return markedGrid;
}

function findMaxSize(input) {
	const coords = input.reduce((acc,curr) => {
		return acc.concat(curr.split(" -> "));
	}, []);
	const maxSize = coords.reduce((acc,curr) => {
		let [first,second] = curr.split(",");
		return Math.max(acc,first,second)
	},0);
	return maxSize;
}

function countOverlapPoints(grid) {
	return Object.values(grid).filter(x => x >= 2).length;
}

/** PART 2
 * See info: https://adventofcode.com/2021/day/5#part2
 * 
 * Similar to part 1 but with diagonals considered
 */

function makeGrid2(input) {
	const maxSize = findMaxSize(input);
	let markedGrid = {};
	/**
	 * First half similar to part 1 to get info from line
	 */
	for (let i = 0; i < input.length; i++) {
		let line = input[i];
		let [x1, y1, x2, y2] = line.split(" -> ").reduce((acc,curr) => {
			return acc.concat(curr.split(","))
		}, []).map(x => parseInt(x));
		// Do the same thing for horizontal and vertical lines AND now the diagonal line
		// how to tell if a line is diagonal and on the 45deg??
		// diagonal lines: 
		// - x's and y's are not equal
		// - go through forloop to -1 each step
		if (x1 !== x2 && y1 !== y2) {
			if (x1 > x2) {
				let i = 0;
				while (i <= Math.abs(x1 - x2)) {
					if (y1 < y2) {
						let point = `${x1-i},${y1+i}`;
						if (markedGrid[point]) {
							markedGrid[point] += 1;
						} else {
							markedGrid[point] = 1
						}
					} else {
						let point = `${x1-i},${y1-i}`;
						if (markedGrid[point]) {
							markedGrid[point] += 1;
						} else {
							markedGrid[point] = 1
						}
					}
					i += 1;
				}
			} else {
				let i = 0;
				while (i <= Math.abs(x1 - x2)) {
					if (y1 < y2) {
						let point = `${x1+i},${y1+i}`;
						if (markedGrid[point]) {
							markedGrid[point] += 1;
						} else {
							markedGrid[point] = 1
						}
					} else {
						let point = `${x1+i},${y1-i}`;
						if (markedGrid[point]) {
							markedGrid[point] += 1;
						} else {
							markedGrid[point] = 1
						}
					}
					i += 1;
				}
			}
		} else if (x1 === x2) {
			let higher = Math.max(y1,y2);
			let lower = Math.min(y1,y2);
			for (let i = lower; i <= higher; i++) {
				let point = `${x1},${i}`;
				if (markedGrid[point]) {
					markedGrid[point] += 1;
				} else {
					markedGrid[point] = 1
				}
			}
		} else if (y1 === y2) {
			let higher = Math.max(x1,x2);
			let lower = Math.min(x1,x2);
			for (let i = lower; i <= higher; i++) {
				let point = `${i},${y1}`;
				if (markedGrid[point]) {
					markedGrid[point] += 1;
				} else {
					markedGrid[point] = 1
				}
			}
		}
	}
	return markedGrid;
}


function main() {
	const fileContents = readInputFile("input.txt");


	/* PART 1 */
	console.log("-----PART 1-----")
	const grid = makeGrid(fileContents);
	const solution = countOverlapPoints(grid);
	console.log({solution});

	/* PART 2 */
	console.log("\n-----PART 2-----")
	const grid2 = makeGrid2(fileContents);
	const solution2 = countOverlapPoints(grid2);
	console.log({solution2});
}

main();