var assert = chai.assert;

describe('Deck', function() {
	describe('Creating the deck', function() {
		it('should contain 52 cards', function() {
			var deck = Deck();
			assert.equal(deck.cards.length, 52);
		});
		it('should contain no duplicates', function() {
			var deck = Deck();
			assert.deepEqual(getDuplicates(deck), []);
		});
		it('should have 13 cards in each suit', function() {
			var deck = Deck();
			var table = deck.cards.reduce(function(table, card) {
				table[card.suit] = (table[card.suit] || 0) + 1;
				return table;
			}, {});

			assert.deepEqual(table, {
				hearts: 13, spades: 13, diamonds: 13, clubs: 13
			});
		});
		it('should already be sorted', function() {
			var deck = Deck();

			var sortedDeck = Deck();
			sortedDeck.sort();

			assert.deepEqual(sortedDeck.cards, deck.cards);
		});
	});

	describe('Shuffling the deck', function() {
		it('should contain 52 cards', function() {
			var deck = Deck();
			deck.shuffle();
			assert.equal(deck.cards.length, 52);
		});
		it('should contain no duplicates', function() {
			var deck = Deck();
			deck.shuffle();
			assert.deepEqual(getDuplicates(deck), []);
		});
		it('should be in different order from a sorted deck', function() {
			var deck = Deck();
			deck.shuffle();

			var sortedDeck = Deck();

			assert.notDeepEqual(sortedDeck.cards, deck.cards);
		});
	});

	describe('Sorting the deck', function() {
		it('should contain 52 cards after shuffling and sorting', function() {
			var deck = Deck();
			deck.shuffle();
			deck.sort();
			assert.equal(deck.cards.length, 52);
		});
		it('should contain no duplicates after shuffling and sorting', function() {
			var deck = Deck();
			deck.shuffle();
			deck.sort();
			assert.deepEqual(getDuplicates(deck), []);
		});
		it('should be in the same order as a sorted deck after shuffling and sorting', function() {
			var deck = Deck();
			deck.shuffle();
			deck.sort();

			var sortedDeck = Deck();

			assert.deepEqual(sortedDeck.cards, deck.cards);
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
