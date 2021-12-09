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

/** PART 2
 * See info: https://adventofcode.com/2021/day/8#part2
 * 
 * For each entry, determine all of the wire/segment connections and decode the four-digit output values. What do you get if you add up all of the output values?
 * 
 * have a map of what each position represents, e.g. digitMapSignals[top] = "d" means that the top line is represented by d
 * map of what each number needs "on" to construct the number, e.g. digitMap['one']: ['topRight', 'botRight']
 * start with 1 and 7 => 1 tells us what the long side of 7 is, the other letter will be the top
 */

const NUMBER_PIECES = {
	"0": ["top", "topL", "topR", "botL", "botR", "bot"],
	"1": ["topR", "botR"],
	"2": ["top", "topR", "mid", "botL", "bot"],
	"3": ["top", "topR", "mid", "botR", "bot"],
	"4": ["topL", "topR", "mid", "botR"],
	"5": ["top", "topL", "mid", "botR", "bot"],
	"6": ["top", "topL", "mid", "botL", "botR", "bot"],
	"7": ["top", "topR", "botR"],
	"8": ["top", "topL", "topR", "mid", "botL", "botR", "bot"],
	"9": ["top", "topL", "topR", "mid", "botR", "bot"],
}

function decipherDigits(notes) {
	const {digits,outputs} = notes;
	let sum = 0;
	for (let i = 0; i < digits.length; i++) {
		let chunks = digits[i].split(" ");
		let output = outputs[i];
		let {map, remaining} = initializeMap(chunks);
		let decodedMapSignals = {}
		decodedMapSignals.top = getDifference(map[1], map[7]);
		decodedMapSignals.topR = map[1].split("");
		decodedMapSignals.botR = map[1].split("");
		decodedMapSignals.topL = getDifference(map[1], map[4]);
		decodedMapSignals.mid = getDifference(map[1], map[4])
		decodedMapSignals.botL = getDifference(map[7].concat(map[4]), map[8]);
		decodedMapSignals.bot = getDifference(map[7].concat(map[4]), map[8]);

		let threeOptions = makeCombs(decodedMapSignals, "3");
		map = findTheOne(map, remaining, threeOptions, "3");
		let temp = getDifference(map[3], map[8]);
		decodedMapSignals.topL = getCommon(temp, decodedMapSignals.topL);
		decodedMapSignals.botL = getCommon(temp, decodedMapSignals.botL);

		let fiveOptions = makeCombs(decodedMapSignals, "5");
		map = findTheOne(map, remaining, fiveOptions, "5");
		let temp2 = getDifference(map[5], map[8]);
		decodedMapSignals.topR = getCommon(temp2, decodedMapSignals.topR);

		let sixOptions = makeCombs(decodedMapSignals, "6");
		map = findTheOne(map, remaining, sixOptions, "6");
		let temp3 = getDifference(map[6], map[8]);
		decodedMapSignals.topR = getCommon(temp3, decodedMapSignals.topR);

		let nineOptions = makeCombs(decodedMapSignals, "9");
		map = findTheOne(map, remaining, nineOptions, "9");
		let temp4 = getDifference(map[4], map[9]);
		decodedMapSignals.bot = getCommon(temp4, decodedMapSignals.bot);
		
		let zeroOptions = makeCombs(decodedMapSignals, "0");
		map = findTheOne(map, remaining, zeroOptions, "0");
		let temp5 = getDifference(map[0], map[8]);
		decodedMapSignals.mid = getCommon(temp5, decodedMapSignals.mid);

		let twoOptions = makeCombs(decodedMapSignals, "2");
		map = findTheOne(map, remaining, twoOptions, "2");
		let temp6 = getDifference(map[2], map[8]);
		decodedMapSignals.botR = getCommon(temp6, decodedMapSignals.botR);		

		const revMap = reverseMap(map);
		const num = convertOutputToNum(revMap, output);
		sum += num;
	}
	console.log({sum})
}

function convertOutputToNum(revMap, output) {
	let digits = output.split(" ");
	let result = "";
	for (let digit of digits) {
		let temp = digit.split("").sort().join("");
		result += revMap[temp];
	}
	return parseInt(result);
}

function reverseMap(map) {
	let revMap = {};
	let keys = Object.keys(map);
	let values = Object.values(map).map(x => x.split("").sort().join(""));
	for (let i = 0; i < values.length; i++) {
		revMap[(values[i])] = keys[i];
	}
	return revMap;
}

function getCommon(a, b) {
	let result = [];
	for (let i = 0; i < b.length; i++) {
		if (a.includes(b[i])) {
			result.push(b[i]);
		}
	}
	return result;
}

function findTheOne(map, remaining, options, key) {
	for (let i = 0; i < remaining.length; i++) {
		let chunk = remaining[i];
		if (chunk.length === NUMBER_PIECES[key].length) {
			let temp = chunk.split("").sort().join("");
			if (options.includes(temp)) {
				map[key] = chunk;
			}
		}
	}
	return map;
}


function makeCombs(decodedMapSignals, key) {
	let pieces = NUMBER_PIECES[key]
	let combs = [];
	let maxLength = Math.max(...Object.values(decodedMapSignals).map(x => x.length))
	for (let i = 0; i < maxLength * 2; i++) {
		let str = "";
		for (let piece of pieces) {
			let chars = decodedMapSignals[piece];
			if (chars.length === 1) {
				str += chars[0];
			} else {
				if (!str.includes(chars[i%maxLength])) {
					str += chars[i%maxLength];
				} else {
					str += chars[(i+1)%maxLength];
				}
				if (combs.includes(str)) {
					str = str.slice(0,str.length-1) + chars[(i+1)%2];
				}
			}
		}
		combs.push(str);
	}
	return combs.map(x => x.split("").sort().join(""));
}

function getDifference(a, b) {
	let result = [];
	for (let i = 0; i < b.length; i++) {
		if (!a.includes(b[i])) {
			result.push(b[i]);
		}
	}
	return result;
}

function initializeMap(chunks) {
	let map = {
		'0': "",
		'1': "",
		'2': "",
		'3': "",
		'4': "",
		'5': "",
		'6': "",
		'7': "",
		'8': "",
		'9': ""
	};
	let remaining = [];
	for (let chunk of chunks) {
		switch (chunk.length) {
			case 2:
				map[1] = chunk
				break;
			case 4:
				map[4] = chunk
				break;
			case 3:
				map[7] = chunk
				break;
			case 7:
				map[8] = chunk
				break;
			default:
				remaining.push(chunk);
				continue;
		}
	}
	return {map, remaining};
}

function main() {
	const fileContents = readInputFile("input.txt");
	const notes = parseInput(fileContents);


	/* PART 1 */
	console.log("-----PART 1-----")
	const solution = countDigitsInOutputs(notes);
	console.log({solution});

	/* PART 2 */
	console.log("\n-----PART 2-----")
	decipherDigits(notes);
	// console.log({digitMap})
}

main();