
//Game values
let min = 1,
    max = 10,
    winningNum= getRandomNum(min,max),
    guessesLeft = 3;

//UI Elements
const gameUI = document.querySelector('#game'),
      minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessBtnUI = document.querySelector('#guess-btn'),
      guessInputUI = document.querySelector('#guess-input'),
      messageUI = document.querySelector('.message');

// Assign UI min and max
minNumUI.textContent = min;
maxNumUI.textContent = max;

//Play again event listener
gameUI.addEventListener("mousedown", function(e){
    if(e.target.className ==='play-again'){
        window.location.reload();
    }
});


//Listen for guess
guessBtnUI.addEventListener('click', function(){
    let guess = parseInt(guessInputUI.value);

    //Validate Input
    if(isNaN(guess) || guess < min || guess >max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');

    }

    //Check if won 
    if(guess === winningNum){
        gameOver(true, `${winningNum} is the winning number, WINNER!!` );
    }else {
        //Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
        //Game over - lost
        gameOver(false,`${winningNum} was the number, You have lost`);
        
        }else {
            //Game continues - answer wrong
            guessInputUI.style.borderColor ='red';
            //Wrong num guess again
            setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');

            //clear input field
            guessInputUI.style.value = '';
        }
    }
});

//Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //disable input
    guessInputUI.disabled= true; 

    guessInputUI.style.borderColor = color;
    messageUI.style.color = color;
    setMessage(msg);

    //Play Again
    guessBtnUI.value = 'Play Again';
    guessBtnUI.className += 'play-again';
}

//Get Random Winning Number 
function getRandomNum(min,max){
    return(Math.floor(Math.random()*(max-min+1)+min));
}

//Set Message
function setMessage(msg, color){
    messageUI.style.color = color;
    messageUI.textContent = msg;

}
