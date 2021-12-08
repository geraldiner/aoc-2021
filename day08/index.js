/** PART 1
 * See info: https://adventofcode.com/2021/day/8
 * 
 * Decipher broken seven-segment display
 * 
 * Because the digits 1, 4, 7, and 8 each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting only digits in the output values (the part after | on each line), in the above example, there are 26 instances of digits that use a unique number of segments (highlighted above).
 * 
 * In the output values, how many times do digits 1, 4, 7, or 8 appear?
 */
const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day08/${filename}`, 'utf8');
  let contents = fileString.split("\n");
	return contents;
}

function parseInput(input) {
	/**
	 * store the input info in a dictionary for digits (10 digit notes, before | ) and outputs (4-digit output, after |)
	 * 
	 * for every line, split on |, first part is the digits, second part is the output
	 */
	let notes = {
		digits: [],
		outputs: []
	}
	for (let line of input) {
		const [digits, output] = line.split("|").map(x => x.trim());
		notes.digits.push(digits);
		notes.outputs.push(output);
	}
	return notes;
}

function countDigitsInOutputs(notes) {
	/**
	 * RULES:
	 * 1 is the only digit that uses TWO segments (two-lettered string)
	 * 4 is the only digit that use FOUR segments (four-lettered string)
	 * 7 is is the only digit that uses THREE segments (three-lettered string)
	 * 8 is the only digit that uses SEVEN segments (seven-lettered string)
	 */
	
	/**
	 * only look at output values
	 * dictionary for counts of digits
	 * split on space (" ")
	 * for every digit check the length of the string
	 * if the length matches any of the rules above, add to the count in the dictionary
	 */
	const {digits,outputs} = notes;
	let digitCounts = {};
	for (let line of outputs) {
		let nums = line.split(" ");
		for (let num of nums) {
			switch (num.length) {
				case 2:
					if (digitCounts[1]) {
						digitCounts[1] += 1;
					} else {
						digitCounts[1] = 1;
					}
					break;
				case 4:
					if (digitCounts[4]) {
						digitCounts[4] += 1;
					} else {
						digitCounts[4] = 1;
					}
					break;
				case 3:
					if (digitCounts[7]) {
						digitCounts[7] += 1;
					} else {
						digitCounts[7] = 1;
					}
					break;
				case 7:
					if (digitCounts[8]) {
						digitCounts[8] += 1;
					} else {
						digitCounts[8] = 1;
					}
					break;
				default:
					continue;
			}
		}
	}
	
	return Object.values(digitCounts).reduce((acc,curr) => acc+curr,0);
}

function main() {
	const fileContents = readInputFile("input.txt");


	/* PART 1 */
	console.log("-----PART 1-----")
	const notes = parseInput(fileContents);
	const solution = countDigitsInOutputs(notes);
	console.log({solution});

	/* PART 2 */
	console.log("\n-----PART 2-----")

}

main();