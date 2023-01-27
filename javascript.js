const getRandomInt = (max) => Math.floor(Math.random()*max);
const VALID_CHOICES = ["rock", "paper", "scissors"];

function completeGameRound(){
    let playerChoice = prompt("Please enter your choice(rock,paper,scissors): ");
    let pcChoice = VALID_CHOICES[getRandomInt(3)];

    return isPlayerChoiceValid() ? getRoundResult() : null;

    function isPlayerChoiceValid(){
        let playerChoiceIsString = typeof playerChoice === "string";
        let playerChoiceInValidPool = VALID_CHOICES.includes(playerChoice.toLowerCase());

        return playerChoiceIsString && playerChoiceInValidPool;
    }
    
    function getRoundResult(){
        // is it a draw?
        if(playerChoice === pcChoice) return "draw";

        let whoWon = "";
        
        switch(playerChoice){
            case "rock":
                pcChoice === "scissors" ? whoWon = "player":whoWon = "pc";
                break;
            case "paper":
                pcChoice === "rock" ? whoWon = "player":whoWon = "pc";
                break;
            case "scissors":
                pcChoice === "paper" ? whoWon = "player":whoWon = "pc";
                break;
        }
        return whoWon;
    }
}

console.log(completeGameRound());