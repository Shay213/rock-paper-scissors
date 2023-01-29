let getRandomInt = (max) => Math.floor(Math.random()*max);
const VALID_CHOICES = ["rock", "paper", "scissors"];

function completeGameRound(playerChoice, pcChoice){
    // if cancel button was pressed
    if(playerChoice === null) return null;

    return isPlayerChoiceValid() ? getRoundResult() : false;

    function isPlayerChoiceValid(){
        let playerChoiceIsString = typeof playerChoice === "string";

        return playerChoiceIsString ? (() => {
            let playerChoiceInValidPool = VALID_CHOICES.includes(playerChoice.toLowerCase());
            return playerChoiceInValidPool;
        })() : false;
    }
    
    function getRoundResult(){
        if(playerChoice === pcChoice) return "It's a Tie!";

        let result = "";
        
        switch(playerChoice){
            case "rock":
                pcChoice === "scissors" ? result = "You Win! rock beats scissors":result = "You Lose! paper beats rock";
                break;
            case "paper":
                pcChoice === "rock" ? result = "You Win! paper beats rock":result = "You Lose! scissors beats paper";
                break;
            case "scissors":
                pcChoice === "paper" ? result = "You Win! scissors beats paper":result = "You Lose! rock beats scissors";
                break;
        }
        return result;
    }
}

function game(){
    let playerRoundsWon = 0;
    let pcRoundsWon = 0;
    let roundResult = "";
    let howManyRounds = Number(prompt("How many rounds would you like to play? "));
    
    if(howManyRounds === 0) 
        return null;
    else if(Number.isNaN(howManyRounds)){
        alert("That's not a number!");
        game();
    }
    else
        howManyRounds = Math.round(howManyRounds);
        startGame();

    function startGame(){
        for(let i=1; i <= howManyRounds; i++){
            let playerChoice = prompt("Please enter your choice(rock,paper,scissors): ");
            let pcChoice = VALID_CHOICES[getRandomInt(3)];

            roundResult = completeGameRound(playerChoice, pcChoice);
            
            if(roundResult === null){
                break;
            } else if(!roundResult) {
                i--;
                alert("Your choice is not valid!");
            } else{
                updateScore();
                displayRoundInfo(i, playerChoice, pcChoice);
            }
        }
        if(playerRoundsWon > 0 || pcRoundsWon > 0)
            finalMessage();
    }

    function updateScore(){
        if(roundResult.includes("Win")){
            playerRoundsWon++;
        } else if(roundResult.includes("Lose")){
            pcRoundsWon++;
        } else{
            playerRoundsWon++;
            pcRoundsWon++;
        }
    }

    function displayRoundInfo(currentRound, playerChoice, pcChoice){
        alert(`Round ${currentRound}:
        Your choice is: ${playerChoice}
        PC choice is: ${pcChoice}
        ${roundResult} 
        You won ${playerRoundsWon === 1 ? `1 round!` : `${playerRoundsWon}rounds`}
        PC won ${pcRoundsWon === 1 ? `1 round!` : `${pcRoundsWon}rounds`}
        `);
    }

    function finalMessage(){
        if(playerRoundsWon > pcRoundsWon)
            alert("Congratulations, You won the game!");
        else if(playerRoundsWon < pcRoundsWon)
            alert("You Lost, that was a good game!");
        else
            alert("It's a Tie, that was a good game!");
    }
}

//game();


const playBtn = document.querySelector('.play');
const bottomContentItems = document.querySelectorAll('.bottom-content div');
const playerChoices = document.querySelectorAll('.playerChoices img');

playBtn.addEventListener('click', startGame);

playerChoices.forEach(el => {
    el.addEventListener('click', playerChoice);
});

function playerChoice(e){
    console.log(e.target.classList.value);
}

function startGame(e){
    bottomContentItems.forEach(el => {
        el.classList.add('disappear');
    });
}