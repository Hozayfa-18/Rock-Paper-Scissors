//console.log(randomNumber);
let computerMove;
function pickComputerMove(){
    
    const randomNumber = Math.random()
    
        if (randomNumber < 0.33333) {
            computerMove ='rock';
        }
        else if(0.33334 < randomNumber && randomNumber <= 0.66666){
            computerMove ='paper';
        }
        else{
            computerMove ='scissors';
        }
        return computerMove;
}

let score = JSON.parse(localStorage.getItem
    ('score')) || {
        wins:0,
        losses:0,
        ties:0
    }

updateScore(`Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);


/* 
The || {          works the same as the function checkIfScoreIsNull()
        wins:0,
        losses:0,
        ties:0}
    

function checkIfScoreIsNull(){
   if(score === null){
        score = {
            wins:0,
            losses:0,
            ties:0
        }
    }
}
checkIfScoreIsNull();
*/
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function resetScore(){
    gameMoves('');
    gameResult('');
    score.wins =0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    resetScoreText('The score has been resetted');
    updateScore(`Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);
    await delay(1500);
    resetScoreText('');
    //alert(`    Score has been reset 
    //Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
}


let result;
function playGame(playerMove){
    resetScoreText('');
    computerMove = pickComputerMove();
    
    if(playerMove === 'rock'){
       if (computerMove === 'rock'){
            result = 'Tie';
       }
       else if(computerMove === 'paper'){
            result = 'You lose';
       }
       else{
            result = 'You win';
       }
    }

    if(playerMove === 'paper'){
      if (computerMove === 'paper'){
            result = 'Tie';
        }
        else if(computerMove === 'scissors'){
            result = 'You lose';
        }
        else{
            result = 'You win';
        }
    }

    if(playerMove === 'scissors'){
        if (computerMove === 'scissors'){
            result = 'Tie';
        }
        else if(computerMove === 'rock'){
            result = 'You lose';
        }
        else{
            result = 'You win';
        }
    }

    

    increaseScore();

    localStorage.setItem('score',JSON.stringify(score));

    updateScore(`Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);
    gameResult(`${result}.`);
    visualMoves(playerMove);
    //gameMoves(`You ${playerMove} - ${computerMove} Computer.`);
    //alert(`    You picked ${playerMove}. The Computer picked ${computerMove}. ${result}
    //Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function increaseScore(){
    if ( result === 'You win'){
            score.wins += 1;
        }
        else if (result === 'You lose'){
            score.losses += 1; 
        }
        else{
            score.ties += 1;
        }
}

function updateScore(text){
    score;
    document.querySelector('.update-score')
      .innerHTML = text;
}

function gameMoves(text){
    document.querySelector('.game-moves')
      .innerHTML = text;
}

function gameResult(text){
    document.querySelector('.game-result')
      .innerHTML = text;
}

function resetScoreText(text){
    document.querySelector('.reset-score')
      .innerHTML = text;
}

function visualMoves(playerMove){
    const movesElement = document.querySelector('.game-moves');
        movesElement.innerHTML = `
          You
          <img src="emojis/${playerMove}-emoji.png" class="e-icon">
          <img src="emojis/${computerMove}-emoji.png" class="e-icon">
          Computer
        `;
}

let isPLaying = false;
let intervalId;

function autoPlay(){
    if(!isPLaying){
        isPLaying = true;

        const playerMove = pickComputerMove();
        playGame(playerMove);
    
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        document.querySelector('.auto-play-button').innerHTML = 'Stop Play';
    }
    else{
        isPLaying = false;
        clearInterval(intervalId);

        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }
}

function playClickEvent(type){
    document.querySelector(`.${type}-emoji`)
    .addEventListener('click', () => {
        playGame(type);
    })
}

playClickEvent('rock');
playClickEvent('paper');
playClickEvent('scissors')

function reserClickEvent(){
    document.querySelector('.reset-button')
        .addEventListener('click', () => {
            resetScore();
        })
}
reserClickEvent();

function autoPlayClickEvent(){
    document.querySelector('.auto-play-button')
        .addEventListener('click', () => {
            autoPlay();
        })
}
autoPlayClickEvent();

function playKeydownEvent(letter, type){
    document.body.addEventListener('keydown', (event) => {
        if(event.key === letter){
            playGame(type);
        }
    })
}
playKeydownEvent('r', 'rock');
playKeydownEvent('p', 'paper');
playKeydownEvent('s', 'scissors');
