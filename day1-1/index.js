/**
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
		fileStr += `${prev} | ${curr} | curr > prev: ${(curr > prev)}\n`
		if (curr > prev) {
			increases += 1;
		}
		prev = curr;
	}
	fs.writeFileSync("./day1-1/output.txt", fileStr, "utf8");
	return increases;
}
/**
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day1-1/${filename}`, 'utf8');
  let contents = fileString.split("\n");
	return contents;
}

/**
 * Main function call to read contents from the input file and parse contents to count the increases
 */
function main() {
	const fileContents = readInputFile("input.txt");
	const count = countIncreases(fileContents);
	console.log(`The number of increases is: ${count}`);
	return count;
}

// console.log(countIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), "should equal: 7");
// console.log(countIncreases([130,142,148,147,157,160,162,160,165,164]), "should equal: 6");
main();