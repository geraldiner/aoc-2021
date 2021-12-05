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

/**
 * Parses the input file to set up the game state:
 * The first line is the order the numbers are drawn
 * The lines that follow are the bingo cards - which get saved as an object holding information about all the numbers on the card, a list of all the horizontal bingos, and a list of all the vertical bingos.
 * Then it returns the game state
 * 
 * @params: contents - file contents from input file
 * @return: game - object that holds information about the game
 */
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

/**
 * Finds the first winning bingo card and returns it in its current state (called numbers removed from the card, all horizontal bingos, and all vertical bingos). It will also return the winning number that triggered the win.
 * 
 * @params: game - the game state as parsed from the input
 * @return: {winningCard, winningNumber} - separate variables returned as an object for easy destructuring
 * winningCard - an object holding information about the first card that gets bingo
 * winningNumber - the number that triggers the first bingo win
 */
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

/**
 * Helper function to remove the called number from all the bingo cards (and the horizontal, vertical bingos associated with that card). It returns the updated bingo cards.
 * 
 * @param: bingoCards - all the bingo cards in the game
 * @param: calledNumber - the number that was called
 * @return: newBingoCards - updated bingo cards with the called number removed
 */
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

/**
 * Checks if a bingo card is a winner, which means that either a horizontal bingo list or vertical bingo list is empty (due to the removal of called numbers). If it is a winning card, returns the card. Otherwise, returns null.
 * 
 * @param: bingoCard - the bingo card being checked
 * @return: bingoCard/null - will return the bingoCard if it's a winner, otherwise null
 */
function checkForWinner(bingoCard) {
	let {card, hBingos, vBingos} = bingoCard;
	for (let i = 0; i < hBingos.length; i++) {
		if (hBingos[i].length === 0 || vBingos[i].length === 0) {
			return bingoCard;
		}
	}
	
	return null;
}

/**
 * Calculates the score to solve the puzzle. Takes the remaining unmarked numbers and sums them. Then multiplies that sum by the number that triggered the win.
 * 
 * @param: winner - object that holds the winning card and winning number
 * @return: result - the result of the calculations described
 */
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

/**
 * Finds the last winning card, meaning the 100th (or however many cards were in the input) winning card. So it will keep finding winning cards until it reaches the last one. Then it will return that last winning card and the number that triggered the win
 * 
 * @params: game - the game state as parsed from the input
 * @return: {winningCard, winningNumber} - separate variables returned as an object for easy destructuring
 * winningCard - an object holding information about the last card that gets bingo
 * winningNumber - the number that triggers the last bingo win
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
	return {winningCard, winningNumber}
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