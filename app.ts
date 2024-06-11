import * as readline from 'readline';

//write a function for computer's choice as rock, scissors, paper
function computerPlay(): string {
    let choices = ['rock', 'paper', 'scissors'];
    let randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
} 

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get the player's choice from console
function getPlayerChoice(): Promise<string> {
    return new Promise((resolve, reject) => {
        rl.question("Enter your choice: rock, paper, or scissors\n", (answer) => {
            let playerChoice = answer.toLowerCase();
            if (playerChoice === "rock" || playerChoice === "paper" || playerChoice === "scissors") {
                resolve(playerChoice);
            } else {
                console.log("Invalid choice! Please enter again.");
                resolve(getPlayerChoice()); 
            }
        });
    });
}

// Function to play a round of rock, paper, scissors
function playRound(playerSelection: string, computerSelection: string): string {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if ((playerSelection === "rock" && computerSelection === "scissors") ||
               (playerSelection === "scissors" && computerSelection === "paper") ||
               (playerSelection === "paper" && computerSelection === "rock")) {
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

// Function to play the game
async function game(): Promise<void> {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = await getPlayerChoice();
        let computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
        if (playRound(playerSelection, computerSelection).includes("win")) {
            playerScore++;
        } else if (playRound(playerSelection, computerSelection).includes("lose")) {
            computerScore++;
        }
    }
    if (playerScore > computerScore) {
        console.log(`You win the game! Your score: ${playerScore}, Computer's score: ${computerScore}`);
    } else if (playerScore < computerScore) {
        console.log(`You lose the game! Your score: ${playerScore}, Computer's score: ${computerScore}`);
    } else {
        console.log(`It's a tie! Your score: ${playerScore}, Computer's score: ${computerScore}`);
    }
}

game();


