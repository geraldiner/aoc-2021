/** PART 1
 * 
 * See info: https://adventofcode.com/2021/day/7
 * 
 * 
 */

const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day07/${filename}`, 'utf8');
  let contents = fileString.split(",").map(x => parseInt(x));
	return contents;
}

function findBestFuelSolution(input) {
	const positions = [...input];

	let minPos = Math.min(...positions);
	let maxPos = Math.max(...positions);

	let bestSolution = -1;
	let bestSolutionFuel = 99999999999;

	for (let i = minPos; i <= maxPos; i++) {
		let fuelUsed = 0;
		for (let pos of positions) {
			let fuelUsedForThisCrab = Math.abs(pos - i);
			fuelUsed += fuelUsedForThisCrab;
		}
		if (fuelUsed < bestSolutionFuel) {
			bestSolutionFuel = fuelUsed;
			bestSolution = i;
		}

	}
	return {bestSolution, bestSolutionFuel}
}

function findBestFuelSolution2(input) {
	const positions = [...input];

	let minPos = Math.min(...positions);
	let maxPos = Math.max(...positions);

	let bestSolution = -1;
	let bestSolutionFuel = 99999999999;

	for (let i = minPos; i <= maxPos; i++) {
		let fuelUsed = 0;
		for (let pos of positions) {
			let fuelUsedForThisCrab = getFuelUsed(Math.abs(pos - i));
			fuelUsed += fuelUsedForThisCrab;
		}
		if (fuelUsed < bestSolutionFuel) {
			bestSolutionFuel = fuelUsed;
			bestSolution = i;
		}

	}
	return {bestSolution, bestSolutionFuel}
}

function getFuelUsed(steps) {
	let sum = 0;
	for (let i = 1; i <= steps; i++) {
		sum += i;
	}
	return sum;
}

function main() {
	const fileContents = readInputFile("example.txt");


	/* PART 1 */
	console.log("-----PART 1-----")
	const solution = findBestFuelSolution(fileContents);
	console.log({solution});

	/* PART 2 */
	console.log("\n-----PART 2-----")
	const solution2 = findBestFuelSolution2(fileContents);
	console.log({solution2});
}

main();


/*
var positions = new list<int>

var minPos = positions.Min();
var maxPos = position.Max();

var bestSolution = -1;
var bestSolutionFuel = Int.Max();

for(var i = minPos; i <= maxPos; i++) {
	var fuelUsed = 0;
	foreach(var pos in positions) {
			var fuelUsedForThisCrab = Math.Abs(pos - i);
			fuelUsed+=fuelUsedForThisCrab;
	}
	if(fuelUsed < bestSolutionFuel) {
		bestSolutionFuel = fuelUsed;
		bestSolution = i;
	}
}
Console.WriteLine($"The best spot to gather is {bestSolution}, it will use {bestSolutionFuel} fuel");
*/