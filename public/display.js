var myDeck = new Deck();

var display = new Vue({
	el: '#cardsDisplay',
	data: {
		cards: myDeck.cards
	}
});