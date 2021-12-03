/** PART 1
 * Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine? (Be sure to represent your answer in decimal, not binary.)
 * 
 * The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded properly, can tell you many useful things about the conditions of the submarine. The first parameter to check is the power consumption.
 * 
 * You need to use the binary numbers in the diagnostic report to generate two new binary numbers (called the gamma rate and the epsilon rate). The power consumption can then be found by multiplying the gamma rate by the epsilon rate.
 * 
 * Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report. For example, given the following diagnostic report:
 * 
 * 00100
 * 11110
 * 10110
 * 10111
 * 10101
 * 01111
 * 00111
 * 11100
 * 10000
 * 11001
 * 00010
 * 01010
 * 
 * Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.
 * 
 * The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.
 * 
 * The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.
 * 
 * So, the gamma rate is the binary number 10110, or 22 in decimal.
 * 
 * The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.
 */

const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day03/${filename}`, 'utf8');
  let contents = fileString.split("\n");
	return contents;
}

/**
 * Parse the puzzle input to get the gamma rate and episolon rate based on the decoding instructions
 * 
 * @param: input - each line of the input is an item in an array
 * @return: rates - object that holds the gammaRate and epsilonRate
 */
function parseForRates(input) {
	// take the columns of the input
	// find the most common number (1 or 0) = gamma rate (binary)
	// the other = epsilon rate (binary)
	// convert the binary numbers to decimal
	// multiply the rates
	let rates = {
		gammaRate: "",
		epsilonRate: ""
	}

	// nested for loop
	// every ith character in an array - filter for what has more
	// the most common is the ith bit of the gammaRate, the other is the ith bit of the epsilonRate
	const chunkLength = input[0].length
	for (let i = 0; i < chunkLength; i++) {
		let nums = []
		for (chunk of input) {
			nums.push(chunk[i])
		}
		// filter for the most common - 
		let zeros = nums.filter(x => x === "0").length;
		let ones = nums.filter(x => x === "1").length
		let mostCommon = "";
		let leastCommon = "";
		if (zeros > ones) {
			mostCommon = "0";
			leastCommon = "1";
		} else {
			mostCommon = "1";
			leastCommon = "0";
		}
		rates.gammaRate += mostCommon;
		rates.epsilonRate += leastCommon;
	}
	return rates;
}

/**
 * Convert the rates from binary to decimal
 * 
 * @param: rates - object holding gammaRate and epsilonRate
 * @return: decimalRates - object holding the two given rates as decimal numbers
 */
function convertToDecimal(rates) {
	let decimalRates = {
		gammaDecimal: parseInt(rates.gammaRate, 2),
		epsilonDecimal: parseInt(rates.epsilonRate, 2)
	}
	return decimalRates;
}

/**
 * Solve puzzle by multiplying the decimal numbers of the gammaRate and epsilonRate
 * 
 * @param: decimalRates - object holding the two given rates as decimal numbers
 * @return: result - number answer by multiplying the gammaRate and epsilonRate
 */

function solvePuzzle(decimalRates) {
	return decimalRates.gammaDecimal * decimalRates.epsilonDecimal;
}

function main() {
	const fileContents = readInputFile("input.txt");

	/* PART 1 */
	const rates = parseForRates(fileContents);
	console.log("RATES: ", rates);
	const decimalRates = convertToDecimal(rates);
	console.log("DECIMAL: ", decimalRates);
	const result = solvePuzzle(decimalRates);
	console.log("RESULT: ", result);

	/* PART 2 */

}


const exampleInput =  ["00100","11110","10110","10111","10101","01111","00111","11100","10000","11001","00010","01010"];
const exampleRates = {
	gammaRate: "10110", 
	epsilonRate: "01001"
}
const exampleDecimal = {
	gammaDecimal: 22,
	epsilonDecimal: 9
}
const exampleResult = 198

const testRates = {
	gammaRate: "101100100100",
	epsilonRate: "010011011011"
}
const testDecimal = {
	gammaDecimal: 2852,
	epsilonDecimal: 1243
}
const testResult = 3545036

main();