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
  let contents = fileString.split(",").map(x => parseInt(x));
	return contents;
}

function countFishAfterDays(input, numOfDays) {
	let count = 0;
	// forloop over numOfDays and update the numbers according to the instructions
	let totalFish = [...input];
	let prevFish = [];
	for (let i = 1; i <= numOfDays; i++) {
		prevFish = [...totalFish];
		for (let j = 0; j < totalFish.length; j++) {
			let fish = totalFish[j];
			totalFish[j] = fish === 0 ? 6 : fish-1;
		}
		if (i > 1) {
			let zeros = prevFish.filter(x => x === 0);
			for (let j = 0; j < zeros.length; j++) {
				totalFish.push(8);
			}
		}
	}
	
	return totalFish.length;
}

/** PART 2
 * See info: https://adventofcode.com/2021/day/6#part2
 * 
 * Suppose the lanternfish live forever and have unlimited food and space. Would they take over the entire ocean?
 * 
 * After 256 days in the example above, there would be a total of 26984457539 lanternfish!
 * 
 * How many lanternfish would there be after 256 days?
 */

function countFishAfterDays2(input, numOfDays) {
	let fishMap = createInitialFishMap(input);
	let prevFishMap = {};
	for (let i = 1; i <= numOfDays; i++) {
		/** 
		 * set fishMap[fish] = fishMap[fish+1]
		 * set fishMap[6] = fishMap[0]
		 */
		prevFishMap = {...fishMap};
		for (fish in fishMap) {
			fishMap[fish] = fishMap[parseInt(fish)+1] || 0;
			if (fish === '6' && prevFishMap[0] >= 1) {
				fishMap[fish] = fishMap[fish] + prevFishMap[0];
			}
		}
		if (i > 1 && prevFishMap[0] >= 1) {
			fishMap[8] = prevFishMap[0];
		}
		// console.log({state: `After Day ${i}:`, prevFishMap, fishMap})
	}
	return Object.values(fishMap).reduce((acc,curr) => acc+curr,0);
}

function createInitialFishMap(input) {
	let fishCounts = {
		'0': 0,
		'1': 0,
		'2': 0,
		'3': 0,
		'4': 0,
		'5': 0,
		'6': 0,
		'7': 0,
		'8': 0,
	};
	for (fish of input) {
		fishCounts[fish] += 1;
	}
	return fishCounts;
}

function main() {
	const fileContents = readInputFile("input.txt");


	/* PART 1 */
	console.log("-----PART 1-----")
	const solution = countFishAfterDays(fileContents, 18);
	console.log({solution});

	/* PART 2 */
	console.log("\n-----PART 2-----")
	const solution2 = countFishAfterDays2(fileContents, 256);
	console.log({solution2});
}

main();