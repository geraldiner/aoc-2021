/** PART 1
 * See info: https://adventofcode.com/2021/day/4
 * 
 * Find the bingo card that wins first 
 * vertical/horizontal - no diagonals
 */

const fs = require("fs");

/**
 * Helper function to read the input file contents and send back as an array of strings
 * @param: filename - string name of the input file
 * @return: array - contents of file
 */
function readInputFile(filename) {
	let fileString = fs.readFileSync(`./day04/${filename}`, 'utf8');
  let contents = fileString.split("\n\n");
	return contents;
}

function parseFileForInfo(contents) {
	let game = {
		drawnNumbers: contents[0].split(","),
		bingoCards: []
	}
	/* 
	bingoCard = {
		card: [],
		vBingos: [],
		hBingos: []
	}
	*/
	for (let i = 1; i < contents.length; i++) {
		let bingoCard = {
			card: [],
			vBingos: [],
			hBingos: []
		}
		bingoCard.card = contents[i].split(/\s/g).filter(x => x !== "");
		horizontals = contents[i].split("\n");
		horizontals.forEach(h => bingoCard.hBingos.push(h.split(" ").filter(x => x !== "")));
		for (let i = 0; i < horizontals.length; i++) {
			let vertical = [];
			for (let j = 0; j < bingoCard.card.length; j+=5) {
				vertical.push(bingoCard.card[i+j])
			}
			bingoCard.vBingos.push(vertical);
		}
		game.bingoCards.push(bingoCard);
	}
	console.log(game.bingoCards.length)
	return game;
}

function findWinningCard(game) {
	let { drawnNumbers, bingoCards } = game;
	let winningNumber = null;
	//  bingoCard wins when one of the vBingos or hBingos has all its numbers called
	let winningCard = null;
	let i = 0;
	let str = "";
	while (winningCard === null) {
		let calledNumber = drawnNumbers[i];
		bingoCards = removeCalledNumber(bingoCards, calledNumber);
		str += "---------------------\n"
		str += `\nCALLED NUMBER: ${calledNumber}\n`
		for (bingoCard of bingoCards) {
			const {card,vBingos,hBingos} = bingoCard;
			str += `${JSON.stringify({card,vBingos,hBingos})}\n\n`
		}
		str += "---------------------\n"
		winningCard = checkForWinner(bingoCards);
		if (winningCard) winningNumber = calledNumber;
		i++;
	}
	fs.writeFileSync("./day04/output.txt", str, "utf8");
	return {winningNumber, winningCard}
}

function removeCalledNumber(bingoCards, calledNumber) {
	let newBingoCards = [];
	for (bingoCard of bingoCards) {
		let {card, hBingos, vBingos} = bingoCard;
		card = card.filter(x => x !== calledNumber);
		hBingos = hBingos.map(x => x.filter(y => y !== calledNumber));
		vBingos = vBingos.map(x => x.filter(y => y !== calledNumber));
		newBingoCards.push({card,hBingos,vBingos});
	}
	return newBingoCards;
}

function checkForWinner(bingoCards) {
	for (bingoCard of bingoCards) {
		let {card, hBingos, vBingos} = bingoCard;
		for (let i = 0; i < hBingos.length; i++) {
			if (hBingos[i].length === 0 || vBingos[i].length === 0) {
				return bingoCard;
			}
		}
	}
	return null;
}

function calculateScore(winner) {
	// sum of all unmarked numbers
	// multiply sum by the number that was called
	const {winningNumber, winningCard} = winner;
	const sum = winningCard.card.reduce((acc,curr) => acc+parseInt(curr),0);
	return sum * winningNumber;
}

/** PART 2
 * 
 */

function main() {
	const fileContents = readInputFile("input.txt");

	/* PART 1 */
	console.log("-----PART 1-----")
	const game = parseFileForInfo(fileContents);
	const winner = findWinningCard(game);
	console.log({winner})
	const score = calculateScore(winner);
	console.log({score});

	/* PART 2 */
	console.log("\n-----PART 2-----")

}

main();