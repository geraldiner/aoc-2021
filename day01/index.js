/** PART 1
 * Sonar sweep report gives a measurement of the sea floor depth on each line.
 * 
 * Count the number of times a depth measurement increases from the previous measurement.
 * 
 * In the example above, the changes are as follows:
 * 
 * 199 (N/A - no previous measurement)
 * 200 (increased)
 * 208 (increased)
 * 210 (increased)
 * 200 (decreased)
 * 207 (increased)
 * 240 (increased)
 * 269 (increased)
 * 260 (decreased)
 * 263 (increased)
 * 
 * In this example, there are 7 measurements that are larger than the previous measurement.
 */

const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of numbers
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day01/${filename}`, 'utf8');
  let contents = fileString.split("\n").map(x => parseInt(x));
	return contents;
}

/**
 * @param: input - array of numbers
 * @return: number of time depth increases
 */
function countIncreases(input) {
	// loop over numbers
	// check if the current number is greater than the previous number
	// but skip the first one because there should be no previous
	// return the count
	let prev = input[0];
	let increases = 0;
	let fileStr = ""
	for (let i = 1; i < input.length; i++) {
		let curr = input[i];
		fileStr += `${prev} | ${curr} | curr > prev: ${(curr > prev)}`
		if (curr > prev) {
			fileStr += " (increased)\n";
			increases += 1;
		} else {
			fileStr += " (decreased)\n";
		}
		prev = curr;
	}
	fs.writeFileSync("./day01/output-1.txt", fileStr, "utf8");
	return increases;
}


/** PART 2
 * Your goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.
 * 
 * 199  A      
 * 200  A B    
 * 208  A B C  
 * 210    B C D
 * 200  E   C D
 * 207  E F   D
 * 240  E F G  
 * 269    F G H
 * 260      G H
 * 263        H
 * 
 * In the above example, the sum of each three-measurement window is as follows:
 * 
 * A: 607 (N/A - no previous sum)
 * B: 618 (increased)
 * C: 618 (no change)
 * D: 617 (decreased)
 * E: 647 (increased)
 * F: 716 (increased)
 * G: 769 (increased)
 * H: 792 (increased)
 * 
 * In this example, there are 5 sums that are larger than the previous sum.
 */

/**
 * 
 */
function countThreeSum(input) {
	// loop over numbers
	// store first, second, third numbers
	// prevSum, currSum
	// compare prevSum to currSum
	let firstNum = input[0]
	let secondNum = input[1]
	let thirdNum = input[2]
	let prevSum = firstNum + secondNum + thirdNum;
	let increases = 0;
	let fileStr = "";
	for (let i = 3; i < input.length; i++) {
		firstNum = secondNum;
		secondNum = thirdNum;
		thirdNum = input[i];
		currSum = firstNum + secondNum + thirdNum;
		fileStr += `${prevSum} | ${currSum} | currSum > prevSum: ${(currSum > prevSum)}`
		if (currSum > prevSum) {
			fileStr += " (increased)\n"
			increases += 1;
		} else {
			fileStr += " (decreased)\n"
		}
		prevSum = currSum;
	}
	fs.writeFileSync("./day01/output-2.txt", fileStr, "utf8");
	return increases;
}

/**
 * Main function call to read contents from the input file and parse contents to count the increases
 */
function main() {
	const fileContents = readInputFile("input.txt");

	/* PART 1 */
	const count1 = countIncreases(fileContents);
	console.log(`The number of increases is: ${count1}`);

	/* PART 2 */
	const count2 = countThreeSum(fileContents)
	console.log(`The numbder of increases in 3sum is: ${count2}`)
}

// console.log(countIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), "should equal: 7");
// console.log(countIncreases([130,142,148,147,157,160,162,160,165,164]), "should equal: 6");
// console.log(countThreeSum([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), "should equal: 5");
// console.log(countThreeSum([130,142,148,147,157,160,162,160,165,164]), "should equal: 7");
main();
