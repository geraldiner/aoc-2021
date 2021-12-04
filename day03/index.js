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
		first: "",
		second: ""
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
		rates.first += mostCommon;
		rates.second += leastCommon;
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
	let decimals = {
		first: parseInt(rates.first, 2),
		second: parseInt(rates.second, 2)
	}
	return decimals;
}

/**
 * Solve puzzle by multiplying the decimal numbers of the gammaRate and epsilonRate
 * 
 * @param: decimalRates - object holding the two given rates as decimal numbers
 * @return: result - number answer by multiplying the gammaRate and epsilonRate
 */

function solvePuzzle(decimalRates) {
	return decimalRates.first * decimalRates.second;
}

/** PART 2
 * Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2 scrubber rating, then multiply them together. What is the life support rating of the submarine? (Be sure to represent your answer in decimal, not binary.)
 * 
 * See explanation: https://adventofcode.com/2021/day/3#part2
 */

function parseLifeSupport(input) {
	let ratings = {
		first: "",
		second: ""
	}
	// look at the ith character of the chunk
	// determine which is most common, 1 or 0
	// keep only the chunks that have the most common in the ith position
	// when there is only one chunk left, STOP - this is the oxygenRating
	// if there is a tie between the last 2, keep the one with the 1
	// for co2Rating - keep the least common in the ith position
	// if there is a tie between the last 2, keep the one with the 0
	let oxygenChunks = [...input]
	let co2Chunks = [...input]
	const chunkLength = input[0].length
	for (let i = 0; i < chunkLength; i++) {
		let oxygenNums = []
		for (chunk of oxygenChunks) {
			oxygenNums.push(chunk[i])
		}
		// filter for the most common - 
		let oxygenZeros = oxygenNums.filter(x => x === "0").length;
		let oxygenOnes = oxygenNums.filter(x => x === "1").length
		if (oxygenOnes >= oxygenZeros) {
			if (oxygenChunks.length === 1) {
				oxygenChunks = oxygenChunks
			} else {
				oxygenChunks = oxygenChunks.filter(x => x[i] === "1") 
			}
		} else {
			if (oxygenChunks.length === 1) {
				oxygenChunks = oxygenChunks
			} else {
				oxygenChunks = oxygenChunks.filter(x => x[i] === "0") 
			}
		}

		let co2NUms = []
		for (chunk of co2Chunks) {
			co2NUms.push(chunk[i])
		}
		// filter for the most common - 
		let co2Zeros = co2NUms.filter(x => x === "0").length;
		let co2Ones = co2NUms.filter(x => x === "1").length
		if (co2Zeros <= co2Ones) {
			if (co2Chunks.length === 1) {
				co2Chunks = co2Chunks
			} else {
				co2Chunks = co2Chunks.filter(x => x[i] === "0") 
			}
		} else {
			if (co2Chunks.length === 1) {
				co2Chunks = co2Chunks
			} else {
				co2Chunks = co2Chunks.filter(x => x[i] === "1") 
			}
		}
		console.log({oxygenChunks, co2Chunks})
	}
	ratings.first = oxygenChunks[0]
	ratings.second = co2Chunks[0]
	return ratings
}

function main() {
	const fileContents = readInputFile("input.txt");

	/* PART 1 */
	console.log("-----PART 1-----")
	const rates = parseForRates(fileContents);
	console.log("RATES: ", rates);
	const decimalRates = convertToDecimal(rates);
	console.log("DECIMAL: ", decimalRates);
	const result = solvePuzzle(decimalRates);
	console.log("RESULT: ", result);

	/* PART 2 */
	console.log("\n-----PART 2-----")
	const ratings = parseLifeSupport(fileContents)
	console.log("RATINGS: ", ratings, " | ", testRatings);
	const decimalRatings = convertToDecimal(ratings)
	console.log("DECIMAL: ", decimalRatings, " | ", testRatingDecimals);
	const ratingResult = solvePuzzle(decimalRatings)
	console.log("RESULT: ", ratingResult, " | ", testRatingResult);
}

/* PART 1 */
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

/* PART 2 */
const exampleRatings = {
	oxygenRating: "10111",
	co2Rating: "01010"
}
const exampleRatingDecimals = {
	oxygenDecimal: 23,
	co2Decimal: 10
}
const exampleRatingResult = 230

// const testRatings = {
// 	oxygenRating: "101100110001",
// 	co2Rating: "001101100010"
// }

// const testRatingDecimals = {
// 	oxygenDecimal: 2865,
// 	co2Decimal: 866
// }

// const testRatingResult = 2481090


const testRatings = {
	oxygenRating: "111100111010",
	co2Rating: "010111011110"
}

const testRatingDecimals = {
	oxygenDecimal: 3898,
	co2Decimal: 1502
}

const testRatingResult = 5854796


main();