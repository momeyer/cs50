let winnerOfGame;
let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const userPlay_div = document.getElementById("user");
const compPlay_div = document.getElementById("comp");
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');

const path =  "project_images/rps_game/"

function changeImage(class_name, image)
{
    document.getElementById(class_name).src =  image;
}

function getComputerChoice()
{
    const choices = ['rock', 'paper', 'scissor'];
    const randomNumber = Math.floor(Math.random() * 3);
    const comp_choice = choices[randomNumber];

    switch (comp_choice) {
        case "rock":    
            changeImage("comp-play", path + "rock_right.png");   
            break;
        case "paper":
            changeImage("comp-play",path + "paper_right.png");    
            break;
        case "scissor":
            changeImage("comp-play",path + "scissor_right.png");
            break;
        default:
            changeImage("comp-play",path + "questionmark.png");      
            break;
    }
    return comp_choice   
}

function displayMessage(winner, user_choice, comp_choice)
{
    if(winner == 'draw')
    {
        result_div.innerHTML = "Its a draw!"
    }
    else if(winner == "user")
    {
        result_div.innerHTML = `${user_choice} beats ${comp_choice}, you win!`;
    }
    else if(winner == "computer")
    {
        result_div.innerHTML = `${comp_choice} beats ${user_choice}, you lost!`;
    }
}


function displayPoints(user_choice, comp_choice)
{
    let winner = checkWinner(user_choice, comp_choice);
    
    switch (winner) {
        case "draw":
            break;
        case "user":
            userScore++;
            userScore_span.innerHTML = userScore;
            break;
        case "computer":
            compScore++;
            computerScore_span.innerHTML = compScore;
            break;
    }
    
    displayMessage(winner, user_choice, comp_choice)
}



function checkWinner(user_choice, comp_choice)
{
    userScore_span.innerHTML = userScore
    computerScore_span.innerHTML = compScore

    const wins = {"rock": "scissor", "scissor": "paper", "paper": "rock"}
    if(comp_choice == user_choice)
    {
        return "draw";
    }
    else if(wins[user_choice] == comp_choice)
    {
        return "user";
    }
    else
    {
        return "computer";
    }

}

function play(user_choice)
{
    let compChoice = getComputerChoice();
    let userChoice = user_choice;
    displayPoints(userChoice, compChoice);
}   

function playTurn()
{
    rock.addEventListener('click', function()
    {
        play('rock');
        changeImage("player-play", path + "rock_left.png");
    })

    paper.addEventListener('click', function()
    {
        play('paper');
        changeImage("player-play", path + "paper_left.png");
    })
    scissor.addEventListener('click', function()
    {
        play('scissor');
        changeImage("player-play", path + "scissor_left.png");
    })
}

function playGame()
{
    playTurn()
}


function main()
{
    playGame()
}

main()