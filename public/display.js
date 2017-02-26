var display = new Vue({
	el: '#cards',
	data: {
		deck: Deck.get()
	}
})