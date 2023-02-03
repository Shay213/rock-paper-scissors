let getRandomInt = (max) => Math.floor(Math.random()*max);
const playBtn = document.querySelector('.play');
const menuOptions = document.querySelectorAll('.main-content .menuOption');
const playerAvailableChoices = document.querySelectorAll('.playerAvailableChoices img');
const pcChoices = document.querySelectorAll('.pcChoices img');
const roundsInput = document.getElementById("rounds");
const sideContent = document.querySelector('.sideContent');
const playerPcChoicesText = document.querySelectorAll('.choicesText');
const topRightExit = document.querySelector('.exitTR');
const continueBtn = document.querySelector('.continue');
const roundResultElement = document.querySelector('.roundResult');
const exitGameBtn = document.querySelector('.exit');
const gameContainer = document.querySelector('.game-container');
const finalMessageElement = document.querySelector('.final-message');
const finalMessageBtn = document.querySelector('.final-message-btn');
const finalMessageText = document.querySelector('.final-message h3');

const roundsPlayedElement = document.querySelector('.roundsPlayed');
const playerRoundsWonElement = document.querySelector('.playerRoundsWon');
const pcRoundsWonElement = document.querySelector('.pcRoundsWon');

game();

function game(){
    let roundsCounter = 0
    let playerRoundsWon = 0;
    let pcRoundsWon = 0;
    let roundResult = "";

    exitGameBtn.addEventListener('click', e => {
        gameContainer.style.display = 'none';
    });

    // Start game if play button is pressed
    playBtn.addEventListener('click', startGame);

    function startGame(e){
        playBtn.removeEventListener('click', startGame);
        gameContainer.style.height = '410px';
        // exit to main menu
        topRightExit.classList.remove('disappear');
        topRightExit.addEventListener('click', mainMenuExit);
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
            // show rock paper scissors images and allow player to choose
            showPlayerChoices();
        }
        function getPlayerChoice(e){
            let clickedImage = e.target;
            let pcChoice = getPcChoice();

            clickedImage.classList.remove('activeImage');
            
            // hide all choices except clickedImage
            clickedImage.removeEventListener('click', getPlayerChoice);
            showOrHide(playerAvailableChoices, availableChoice => availableChoice.removeEventListener('click', getPlayerChoice), filterOutClickedImg);
            // get round result and display summarize of the round after player made choice
            summarizeRound(clickedImage, pcChoice);
        
            function filterOutClickedImg(img){
                return !(img === clickedImage);
            }
        }

        function showPlayerChoices(){
            showOrHide(playerAvailableChoices, availableChoice => availableChoice.addEventListener('click', getPlayerChoice));
        }

        function summarizeRound(playerChoice, pcChoice){
            roundsCounter++;
            roundResult = getRoundResult(playerChoice.classList[0], pcChoice.classList[0]);
            updateScore();
            displayRoundInfo();

            // add rounds check 
            if(roundsCounter >= howManyRounds){
                finalMessage();
                finalMessageElement.classList.remove('disappear');
                finalMessageBtn.addEventListener('click', gameFinished);
            }
            else{
                continueBtn.classList.remove('disappear');
                continueBtn.addEventListener('click', nextRound);
            }

            function nextRound(e){
                playerChoice.classList.add('activeImage');
                continueBtn.classList.add("disappear");
                roundResultElement.textContent = "";
                playerChoice.classList.toggle('disappear');
                pcChoice.classList.toggle('disappear');
                continueBtn.removeEventListener('click', nextRound);
                showPlayerChoices();
            }
        }

        function gameFinished(e){
            mainMenuExit(e);
        }

        function resetSideContentInfo(){
            roundsPlayedElement.textContent = `Rounds played: 0`;
            playerRoundsWonElement.textContent = `You won: 0`;
            pcRoundsWonElement.textContent = `Pc won: 0`;
            roundResultElement.textContent = ``;
        }

        function mainMenuExit(e){
            resetSideContentInfo();
            topRightExit.removeEventListener('click', mainMenuExit);
            gameContainer.style.height = '250px';
            let allImgs = Array.from(pcChoices).concat(Array.from(playerAvailableChoices));
        
            sideContent.classList.add('disappear');
            // hide player and pc choice text
            showOrHide(playerPcChoicesText);
            // hide rock paper scissors images
            showOrHide(allImgs, img => img.removeEventListener('click', getPlayerChoice), filterOutDisappeared);
            // show main menu
            showOrHide(menuOptions);
            // hide final message
            finalMessageBtn.removeEventListener('click', gameFinished);
            finalMessageElement.classList.add('disappear');
            allImgsActive();
            
            topRightExit.classList.add('disappear');
            game();
        
            function filterOutDisappeared(img){
                return !img.classList.contains('disappear');
            }
        }

        function allImgsActive(){
            playerAvailableChoices.forEach(el => {
                if(!el.classList.contains('activeImage')){
                    el.classList.add('activeImage');
                }
            });
        }
    }

    

    function removeWrongInputClass(el){
        el.target.classList.remove('wrongInputValue');
        el.target.removeEventListener('click', removeWrongInputClass);
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

    function displayRoundInfo(){
        roundsPlayedElement.textContent = `Rounds played: ${roundsCounter}`;
        playerRoundsWonElement.textContent = `You won: ${playerRoundsWon}`;
        pcRoundsWonElement.textContent = `Pc won: ${pcRoundsWon}`;
        roundResultElement.textContent = `${roundResult}`;
    }

    function finalMessage(){
        if(playerRoundsWon > pcRoundsWon)
        finalMessageText.textContent = "Congratulations, You won the game!";
        else if(playerRoundsWon < pcRoundsWon)
        finalMessageText.textContent = "You Lost, that was a good game!";
        else
        finalMessageText.textContent = "It's a Tie, that was a good game!";
    }

    function getPcChoice(){
        let choice = pcChoices[getRandomInt(3)];
        choice.classList.remove('disappear');
        return choice;
    }

    function getRoundResult(playerChoice, pcChoice){
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
    
    function showOrHide(elements, doSomethingExtra = '', filterOutElement = ''){
        console.log(elements);
        let isFunction = x => typeof x === 'function';  
        if(isFunction(filterOutElement))
            elements = [...elements].filter( el => filterOutElement(el));
    
        elements.forEach(el => {
            el.classList.toggle('disappear');
            if(isFunction(doSomethingExtra))
                doSomethingExtra(el);
        });
    }
}




