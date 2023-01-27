const getRandomInt = (max) => Math.floor(Math.random()*max);
const VALID_CHOICES = ["rock", "paper", "scissors"];

function getPlayerChoice(){
    let choice = prompt("Please enter your choice(rock,paper,scissors): ");
    let isChoiceValid = VALID_CHOICES.includes(choice.toLowerCase());

    return isChoiceValid ? choice : alert("Invalid choice!");
}

function getComputerChoice(){
    return VALID_CHOICES[getRandomInt(3)];
}