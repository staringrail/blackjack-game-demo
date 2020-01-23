// DOM Variables
let textArea = document.getElementById("text-area");
let dealerTextArea = document.getElementById("dealer-text-area");
let dealerScore = document.getElementById("dealer-score");
let playerTextArea = document.getElementById("player-text-area");
let playerScore = document.getElementById("player-score");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let gameText = document.getElementById("game-text");
let playerWinsText = document.getElementById("player-wins");
let dealerWinsText = document.getElementById("dealer-wins");


hitButton.style.display = 'none';
stayButton.style.display = 'none';


// Game Variables
let gameDeck = [];
let dealerCards = [];
let playerCards = [];
let dealerScoreValue = 0;
let playerScoreValue = 0;
let playerStay = false;
let playerWins = 0;
let dealerWins = 0;

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
                value: values[valueIndex],
                display: values[valueIndex] + " of " + suits[suitIndex]
            }
            // Add card to deck
            deck.push(card);
        }
    }
    // Shuffle Deck
    for (let i = 0; i < deck.length; i++) {
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let cardToBeSwapped = deck[swapIndex];

        // Swap card
        deck[swapIndex] = deck[i];
        deck[i] = cardToBeSwapped;
    }
    console.log(deck);
    return deck;
}

function startNewGame() {
    textArea.innerText = '';
    dealerScore.innerHTML = '';
    playerScore.innerHTML = '';
    gameText.innerHTML = '';

    dealerCards = [];
    playerCards = [];
    dealerScoreValue = 0;
    playerScoreValue = 0;
    playerStay = false;

    gameDeck = createDeck();
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    hitButton.disabled = false;
    stayButton.style.display = 'inline';

    // Deal first two cards
    dealerCards.push(gameDeck.pop(),gameDeck.pop());
    playerCards.push(gameDeck.pop(), gameDeck.pop());

    displayCards();

}

function displayCards() {
    dealerTextArea.innerText = 'Dealer has: \n';
    for(let i = 0; i < dealerCards.length; i++) {
        console.log(dealerCards[i]);
        dealerTextArea.innerText += dealerCards[i].display + '\n';
    }

    dealerScoreValue = calculateScore(dealerCards)
    let dealerScoreString = 'Dealer '.fontcolor('red') + 'Score: ' + dealerScoreValue;
    dealerScore.innerHTML = dealerScoreString.bold();

    playerTextArea.innerText = '\nPlayer has: \n';
    for(let i = 0; i < playerCards.length; i++) {
        playerTextArea.innerText += playerCards[i].display + '\n';
    }

    playerScoreValue = calculateScore(playerCards);
    let playerScoreString = 'Player '.fontcolor('blue')  + 'Score: ' + playerScoreValue;
    playerScore.innerHTML = playerScoreString.bold();
}

function calculateScore(cards) {
    let score = 0;
    let hasAce = false;
    console.log(cards);
    cards.forEach(card => {
        switch (card.value) {
            case 'Ace':
                hasAce = true;
                score += 1;
                break;
            case 'King':
                score += 10;
                break;
            case 'Queen':
                score += 10;
                break;
            case 'Jack':
                score += 10;
                break;
            case 'Ten':
                score += 10;
                break;
            case 'Nine':
                score += 9;
                break;
            case 'Eight':
                score += 8;
                break;
            case 'Seven':
                score += 7;
                break;
            case 'Six':
                score += 6;
                break;
            case 'Five':
                score += 5;
                break;
            case 'Four':
                score += 4;
                break;
            case 'Three':
                score += 3;
                break;
            case 'Two':
                score += 2;
                break;
        }
    });

    if (hasAce === true) {
        if ((score + 10) < 21) {
            score += 10;
        }
    }
    return score;   
}

function determineGame() {
    if (playerStay === false) {
        if (playerScoreValue > 21) {
            hitButton.disabled = true;
            gameText.innerHTML = 'Yikes you went over 21! Maybe you could tie...'.bold();
        }
    } else {
        console.log('Did Player Stay?', playerStay);
        // Winner by staying at or below 21
        if (dealerScoreValue > 21 && playerScoreValue <= 21) {
            hitButton.style.display = "none";
            stayButton.style.display = "none";
            newGameButton.style.display = "inline";
            gameText.innerHTML = 'Player '.fontcolor('blue').bold() + 'Wins!'.bold();
            playerWinsText.innerText = ++playerWins;
        } else if (playerScoreValue > dealerScoreValue && playerScoreValue <= 21) {
            hitButton.style.display = "none";
            stayButton.style.display = "none";
            newGameButton.style.display = "inline";
            gameText.innerHTML = 'Player '.fontcolor('blue').bold() + 'Wins!'.bold();
            playerWinsText.innerText = ++playerWins;
        } else if (playerScoreValue == dealerScoreValue ) {
            // Tie Game
            hitButton.style.display = "none";
            stayButton.style.display = "none";
            newGameButton.style.display = "inline";
            gameText.innerHTML = 'Tie Game!'.bold();
        } else {
            hitButton.style.display = "none";
            stayButton.style.display = "none";
            newGameButton.style.display = "inline";
            gameText.innerHTML = 'Dealer '.fontcolor('red').bold() + 'Wins!'.bold();
            dealerWinsText.innerText = ++dealerWins;
        }
    }
}

// Event Listeners
newGameButton.addEventListener('click', function() {
    startNewGame();
});

hitButton.addEventListener('click', function() {
    playerCards.push(gameDeck.pop());
    displayCards();
    determineGame();
});

stayButton.addEventListener('click', function() {
    console.log('tie test', 14 < 14);
    playerStay = true;
    while ((dealerScoreValue <= playerScoreValue) && dealerScoreValue < 21 && playerScoreValue < 21) {
        dealerCards.push(gameDeck.pop());
        dealerScoreValue = calculateScore(dealerCards);
    }
    displayCards();
    determineGame();
});

