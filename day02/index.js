/** PART 1
 * Calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?
 * 
 * Example:
 * 
 * The submarine seems to already have a planned course (your puzzle input). You should probably figure out where it's going. For example:
 * 
 * forward 5
 * down 5
 * forward 8
 * up 3
 * down 8
 * forward 2
 * 
 * Your horizontal position and depth both start at 0. The steps above would then modify them as follows:
 * 
 * forward 5 adds 5 to your horizontal position, a total of 5.
 * down 5 adds 5 to your depth, resulting in a value of 5.
 * forward 8 adds 8 to your horizontal position, a total of 13.
 * up 3 decreases your depth by 3, resulting in a value of 2.
 * down 8 adds 8 to your depth, resulting in a value of 10.
 * forward 2 adds 2 to your horizontal position, a total of 15.
 * 
 * After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.)
 * 
 */

const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day02/${filename}`, 'utf8');
  let contents = fileString.split("\n");
	return contents;
}

/**
 * Takes an array of movements and calculates the final horizontal position and depth
 * @param: input - array of movements in the form of strings
 * @return: position - object with horizontal and depth positions
 */
function calculateFinalPosition(input) {
	let position = {
		horizontal: 0, 
		depth: 0
	}
	// split the movement string to the word part (eg: "forward") and number part (eg: "5")
	// check what the word part is: if "forward" add to horizontal, if "down" add to depth, if "up" subtract from depth
	for (movement of input) {
		let parts = movement.split(" ");
		let word = parts[0]
		let num = parseInt(parts[1])
		switch(word) {
			case "forward":
				position.horizontal += num;
				break;
			case "down":
				position.depth += num;
				break;
			case "up":
				position.depth -= num;
				break;
		}
	}
	return position;
}

/**
 * Takes a position and multiplies the horizontal position and depth to solve the puzzle.
 * @param: position - object for horizontal position an depth
 * @return: result - the solution to the puzzle
 */
function solvePuzzle(position) {
	const {horizontal, depth} = position;
	const result = horizontal*depth;
	return result;
}

/**
 * Main function call to read contents from the input file and parse contents to count the increases
 */
function main() {
	const fileContents = readInputFile("input.txt");

	/* PART 1 */
	const finalPosition = calculateFinalPosition(fileContents);
	const result = solvePuzzle(finalPosition);
	console.log(`The solution is: ${result}`);

	/* PART 2 */

}

const exampleInput = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]

// console.log(solvePuzzle(calculateFinalPosition(exampleInput)), "should be: 150");
main();