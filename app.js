/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;

function init() {
    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // prevDice = null;

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.getElementById("message").textContent = "";
}

function btnRoll() {
    if (gamePlaying) {
        document.getElementById("message").textContent = "";
        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".dice2").style.display = "none";

        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice1DOM = document.querySelector(".dice1");
        dice1DOM.style.display = "block";
        dice1DOM.src = "dice-" + dice1 + ".png";

        var dice2 = Math.floor(Math.random() * 6) + 1;
        var dice2DOM = document.querySelector(".dice2");
        dice2DOM.style.display = "block";
        dice2DOM.src = "dice-" + dice2 + ".png";

        console.log(dice1, dice2);
        if (dice1 === 1 || dice2 === 1) {
            document.getElementById("message").textContent = "You rolled a 1, your turn is over!";
            switchPlayer();
        }
        else if (dice1 === 6 && dice2 === 6) {
            document.getElementById("message").textContent = "You rolled 2 sixes, you lose all your points!";
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            switchPlayer();
        } else {
            roundScore += (dice1 + dice2);
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            // prevDice = dice1;
        }
    }
}

function btnHold() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.getElementById("winScore").value;
        var winScore;
        
        if (input) {
            winScore = input;
        } else {
            winScore = 100;
        }
        console.log("Win: " + winScore);

        if (scores[activePlayer] >= winScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            gamePlaying = false;
        } else {
            switchPlayer();
        }
    }
}

function switchPlayer() {
    roundScore = 0;
    // prevDice = null;
    
    document.querySelector("#current-" + activePlayer).textContent = 0;
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

init();

document.querySelector(".btn-roll").addEventListener("click", btnRoll);
document.querySelector(".btn-hold").addEventListener("click", btnHold);
document.querySelector(".btn-new").addEventListener("click", init);
