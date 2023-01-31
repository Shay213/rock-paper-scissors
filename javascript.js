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
const menuOptions = document.querySelectorAll('.main-content .menuOption');
const playerAvailableChoices = document.querySelectorAll('.playerAvailableChoices img');
const pcChoices = document.querySelectorAll('.pcChoices img');
const roundsInput = document.getElementById("rounds");
const sideContent = document.querySelector('.sideContent');
const playerPcChoicesText = document.querySelectorAll('.choicesText');
const topRightExit = document.querySelector('.exitTR');

// Start game if play button is pressed
playBtn.addEventListener('click', startGame);
// exit to main menu
topRightExit.addEventListener('click', mainMenuExit);

function startGame(e){
    // its possible to get NaN and negatives
    let howManyRounds = roundsInput.valueAsNumber;
    let howManyRoundsValid = howManyRounds < 1 || Number.isNaN(howManyRounds);

    if(howManyRoundsValid){
        roundsInput.classList.add('wrongInputValue');
        roundsInput.addEventListener('click', removeWrongInputClass);
    } else {
        sideContent.classList.remove('disappear');
        // show player and pc choice text
        showOrHide(playerPcChoicesText);
        // hide main menu
        showOrHide(menuOptions);
        // show rock paper scissors images
        showOrHide(playerAvailableChoices, availableChoice => availableChoice.addEventListener('click', playerChoice));
    }

    function removeWrongInputClass(el){
        el.target.classList.remove('wrongInputValue');
        el.target.removeEventListener('click', removeWrongInputClass);
    }
}

function playerChoice(e){
    let clickedImage = e.target;
    // hide all choices except clickedImage
    showOrHide(playerAvailableChoices, availableChoice => availableChoice.removeEventListener('click', playerChoice), filterOutClickedImg);
    // try to find better place for triggering showpcchoice
    showPcChoice(1);

    function filterOutClickedImg(img){
        return !(img === clickedImage);
    }
}

function showPcChoice(number){
    pcChoices[number].classList.remove('disappear');
}

function mainMenuExit(e){
    let allImgs = Array.from(pcChoices).concat(Array.from(playerAvailableChoices));
    
    sideContent.classList.add('disappear');
    // hide player and pc choice text
    showOrHide(playerPcChoicesText);
    // hide rock paper scissors images
    showOrHide(allImgs, '', filterOutDisappeared);
    // show main menu
    showOrHide(menuOptions);

    function filterOutDisappeared(img){
        return !img.classList.contains('disappear');
    }
}

function showOrHide(elements, doSomethingExtra = '', filterOutElement = ''){
    let isFunction = x => typeof x === 'function';  
    if(isFunction(filterOutElement))
        elements = [...elements].filter( el => filterOutElement(el));

    elements.forEach(el => {
        el.classList.toggle('disappear');
        if(isFunction(doSomethingExtra))
            doSomethingExtra(el);
    });
}