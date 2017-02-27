var assert = chai.assert;

describe("Deck", function () {
	describe("Creating the deck", function () {
		it("should contain 52 cards", function () {
			var deck = new Deck();
			assert.equal(deck.cards.length, 52);
		});
		it("should contain no duplicates", function () {
			var deck = new Deck();
			assert.deepEqual(getDuplicates(deck), []);
		});
		it("should have 13 cards in each suit", function () {
			var deck = new Deck();
			var table = deck.cards.reduce(function(table, card) {
				table[card.suit] = (table[card.suit] || 0) + 1;
				return table;
			}, {});

			assert.deepEqual(table, {
				hearts: 13, spades: 13, diamonds: 13, clubs: 13
			});
		});
		it("should have 4 cards for each rank", function () {
			var deck = new Deck();
			var table = deck.cards.reduce(function(table, card) {
				table[card.rank] = (table[card.rank] || 0) + 1;
				return table;
			}, {});

			assert.deepEqual(table, {
				ace: 4, two: 4, three: 4, four: 4, five: 4, six: 4, seven: 4,
				eight: 4, nine: 4, ten: 4, jack: 4, queen: 4, king: 4
			});
		});
		it("should already be sorted", function () {
			var deck = new Deck();

			var sortedDeck = new Deck();
			sortedDeck.sort();

			assert.deepEqual(sortedDeck.cards, deck.cards);
		});
	});

	describe("Shuffling the deck", function () {
		it("should contain 52 cards", function () {
			var deck = new Deck();
			deck.shuffle();
			assert.equal(deck.cards.length, 52);
		});
		it("should contain no duplicates", function () {
			var deck = new Deck();
			deck.shuffle();
			assert.deepEqual(getDuplicates(deck), []);
		});
		it("should be in different order from a sorted deck", function () {
			var deck = new Deck();
			deck.shuffle();

			var sortedDeck = new Deck();

			assert.notDeepEqual(sortedDeck.cards, deck.cards);
		});
	});

	describe("Sorting the deck", function () {
		it("should contain 52 cards after shuffling and sorting", function () {
			var deck = new Deck();
			deck.shuffle();
			deck.sort();
			assert.equal(deck.cards.length, 52);
		});
		it("should contain no duplicates after shuffling and sorting", function () {
			var deck = new Deck();
			deck.shuffle();
			deck.sort();
			assert.deepEqual(getDuplicates(deck), []);
		});
		it("should be in the same order as a sorted deck after shuffling and sorting", function () {
			var deck = new Deck();
			deck.shuffle();
			deck.sort();

			var sortedDeck = new Deck();

			assert.deepEqual(sortedDeck.cards, deck.cards);
		});
		it("should ascend from ace of diamonds to king of spades", function () {
			var deck = new Deck();
			deck.shuffle();
			deck.sort();

			var isAscending = deck.cards.reduce(function (isAsc, val, currentIndex, cards) {
				function cardVal(card) {
					return card.suitIndex * 13 + card.rankIndex;
				}

				if (currentIndex == 0) {
					return isAsc;
				}
				return isAsc && cardVal(cards[currentIndex]) - 1 == cardVal(cards[currentIndex - 1]);
			}, true);

			assert(isAscending, "Sorted deck does not ascend");
		});
	});
});


// Helpers

function getDuplicates(deck) {
	var suitrankCounts = deck.cards
		.map(function (card) {
			return card.suit + card.rank;
		})
		.reduce(function (table, suitrank) {
			table[suitrank] = (table[suitrank] || 0) + 1;
			return table;
		}, {});

	var duplicates = Object.keys(suitrankCounts).filter(function (suitrank) { return suitrankCounts[suitrank] > 1; });

	return duplicates;
}
