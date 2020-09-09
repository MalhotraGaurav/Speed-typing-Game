window.addEventListener('load', init);

//Globals


// Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = ['voracious','baffle','determination','marination','philosophy','catastrophic','franzy','correctness','moratorium','miniature','mckinskey','frivolous','anecdote','autopsy','tremendous','ignominous','outstanding','yearned','kaleidoscope'];


// Initialize Game
function init(){
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
   // Load words from array
   showWord(words);
   // Start matching on word input
   wordInput.addEventListener('input',startMatch);
   // Call countdown every second
   setInterval(countdown,1000);
   // Check game status
   setInterval(checkStatus,50);
}

// start match

function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // If score =-1 , display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML = score;
    }
}

// Match CurrentWord to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!!!';
        return true;
     }else{
     message.innerHTML = '';
     return false;
     }
}

// Pick and store random word
function showWord(words){
    // Generate random array index
    const randIndex = Math.floor(Math.random()*words.length);
    // Output a random word
    currentWord.innerHTML = words[randIndex];

}  

// countdown timer

function countdown(){
    // Make sure time is not run out
    if(time > 0){
        // Decrement
        time--;
    }else if(time === 0){
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// check game status 

function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}