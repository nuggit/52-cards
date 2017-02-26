var Deck = (function () {
	var RANKS = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
	var SUITS = ['diamonds', 'clubs', 'hearts', 'spades'];
	var DECK_SIZE = RANKS.length * SUITS.length;

	var deck = createDeck();

	function createDeck() {
		var newDeck = [];

		for (var i = 0; i < DECK_SIZE; i++) {
			newDeck.push({
				suitIndex: Math.floor(i / RANKS.length),
				suit: SUITS[Math.floor(i / RANKS.length)],

				rankIndex: i % RANKS.length,
				rank: RANKS[i % RANKS.length]
			});
		}
		return newDeck;
	}

	function sortDeck() {
		deck.sort(function (a, b) {
			if (a.suitIndex < b.suitIndex ||
				(a.suitIndex == b.suitIndex && a.rankIndex < b.rankIndex)) {
				return -1;
			}
			return 1; // TODO: test that all cards in deck are unique
		});
	}

	function shuffleDeck() {
		shuffle(deck);
	}

	// Fisher–Yates shuffle
	// https://bost.ocks.org/mike/shuffle/
	function shuffle(array) {
		for (var remainingToShuffle = array.length; remainingToShuffle > 0; remainingToShuffle--) {
			var randomIndex = Math.floor(Math.random() * remainingToShuffle);
			swap(array, remainingToShuffle - 1, randomIndex);
		}

		// https://vuejs.org/v2/guide/list.html#Caveats
		// Use splice instead of direct assignment (eg. array[b] = temp) to keep modifications observable
		function swap(array, a, b) {
			var temp = array[a];
			array.splice(a, 1, array[b]);
			array.splice(b, 1, temp);
		}
	}

	return {
		get: function() {
			return deck;
		},
		shuffle: shuffleDeck,
		sort: sortDeck
	};
})();
