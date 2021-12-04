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
	return game;
}

function findWinningCard(game) {
	let { drawnNumbers, bingoCards } = game;
	let winningNumber = null;
	//  bingoCard wins when one of the vBingos or hBingos has all its numbers called
	let winningCard = null;
	let i = 0;
	while (winningCard === null) {
		let calledNumber = drawnNumbers[i];
		bingoCards = removeCalledNumber(bingoCards, calledNumber);
		for (bingoCard of bingoCards) {
			let winCard = checkForWinner(bingoCard);
			if (winCard) {
				winningCard = winCard;
				winningNumber = calledNumber;
			}
		}
		i++;
	}
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

function checkForWinner(bingoCard) {
	let {card, hBingos, vBingos} = bingoCard;
	for (let i = 0; i < hBingos.length; i++) {
		if (hBingos[i].length === 0 || vBingos[i].length === 0) {
			return bingoCard;
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
 * See info: https://adventofcode.com/2021/day/4#part2
 * 
 * Let the squid win - figure out which card wins last
 */

function findLastWinningCard(game) {
	let { drawnNumbers, bingoCards } = game;
	let winningNumber = null;
	let i = 0;
	let winningCards = [];
	let maxWinners = bingoCards.length;
	while (winningCards.length !== maxWinners) {
		let calledNumber = drawnNumbers[i];
		bingoCards = removeCalledNumber(bingoCards, calledNumber);
		for (bingoCard of bingoCards) {
			let winCard = checkForWinner(bingoCard);
			if (winCard) {
				winningCards.push(winCard);
				bingoCards = bingoCards.filter(x => x !== winCard);
			}
		}
		if (winningCards.length === maxWinners) winningNumber = calledNumber;
		i++;
	}
	let winningCard = winningCards[winningCards.length-1]
	return {winningNumber, winningCard}
}

function main() {
	const fileContents = readInputFile("input.txt");

	/* PART 1 */
	console.log("-----PART 1-----")
	const game = parseFileForInfo(fileContents);
	const winner = findWinningCard(game);
	const score = calculateScore(winner);
	console.log({score});

	/* PART 2 */
	console.log("\n-----PART 2-----")
	const game2 = parseFileForInfo(fileContents);
	const lastWinner = findLastWinningCard(game2);
	const lastWinnerScore = calculateScore(lastWinner);
	console.log({lastWinnerScore})
}

main();