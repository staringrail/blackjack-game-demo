
function createDeck() {
    let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
    let values = ['Ace', 'King', 'Queen', 'Jack',
        'Ten', 'Nine', 'Eight', 'Seven', 'Six',
        'Five', 'Four', 'Three', 'Two'];

    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (valueIndex = 0; valueIndex < values.length; valueIndex++) {
            // Create card object
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            }
            // Add card to deck
            deck.push(card);
        }
    }
    return deck;
}


let textArea = document.getElementById("text-area");
textArea.innerText = 'Welcome to Black Jack!';

let dealerTextArea = document.getElementById("dealer-text-area");
let dealerDeck = createDeck();
console.log(dealerDeck);
for (let i = 0; i < dealerDeck.length; i++) {
    dealerTextArea.innerText += '\n' + dealerDeck[i].value + " of " + dealerDeck[i].suit;
}