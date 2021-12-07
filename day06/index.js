/** PART 1
 * See info: https://adventofcode.com/2021/day/6
 * 
 * Find a way to simulate lanternfish. How many lanternfish would there be after 80 days?
 */

const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day06/${filename}`, 'utf8');
  let contents = fileString.split(",");
	return contents;
}

function countFishAfterDays(input, numOfDays) {
	console.log({input,numOfDays})
	let count = 0;
	return count;
}

function main() {
	const fileContents = readInputFile("example.txt");


	/* PART 1 */
	console.log("-----PART 1-----")
	const solution = countFishAfterDays(fileContents, 80);
	console.log({solution});

	/* PART 2 */
	console.log("\n-----PART 2-----")

}

main();