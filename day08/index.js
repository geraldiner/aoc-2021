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

function main() {
	const fileContents = readInputFile("input.txt");


	/* PART 1 */
	console.log("-----PART 1-----")
	console.log({fileContents})

	/* PART 2 */
	console.log("\n-----PART 2-----")

}

main();