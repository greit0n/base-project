const lastGuess = document.querySelector('#lastGuess');
const difficulty = document.querySelector('#difficulty');
const lives = document.querySelector('#lives');
const wordWrapper = document.querySelector('.word-wrapper');
const usedLetters = document.querySelector('.used-letters');
const cookieWord = Cookies.get('word');
const cookieIconClassName = Cookies.get('iconClassName');
const cookieLives = Cookies.get('lives');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-window .text');
const modalCorrectWord = document.querySelector('.modal-window .correct-word');
const modalIconLeft = document.querySelector('.modal-window .header .icon-left');
const modalIconRight = document.querySelector('.modal-window .header .icon-right');
const restartBtn = document.querySelector('.container .bottom-box .restart');

let letters = getWord().split('');
let disabledLetters = [];
let gameWon = null;
let correctLetters = [];
let winLength = 0;

difficulty.classList.add(cookieIconClassName);
lives.innerHTML = cookieLives;

letters.forEach((letter, index) => {
    let el = document.createElement('div');
    el.classList.add('hidden-letter');
    el.innerHTML = '*';
    el.setAttribute('data-letter', index);
    wordWrapper.append(el);
});

modalIconRight.addEventListener('click', () => {
   modal.classList.add('hidden');
});

window.addEventListener("keypress", function keyPress(event) {
    let pressedKey = event.key;

    if (pressedKey.match(/[a-zA-Z]/) &&
        event.code !== 'Enter'
    ) {
        if (disabledLetters.includes(pressedKey) === false) {
            if (letters.includes(pressedKey) === false) {
                let currLives = parseInt(lives.innerHTML);
                let newLives = currLives - 1;

                if ((currLives - 1) < 0) {
                    newLives = 0;
                }

                lives.innerHTML = newLives.toString();
                let wrongEl = document.createElement('div');
                wrongEl.classList.add('used-letter', 'used-letter--wrong');
                wrongEl.innerHTML = pressedKey.toUpperCase();
                usedLetters.append(wrongEl);

                //remove listener to prevent further presses
                if (newLives === 0) {
                    gameWon = false;
                    this.removeEventListener('keypress', keyPress);
                }
            }

            disabledLetters.push(pressedKey);
            console.info(`Letter ${pressedKey} added to List`);
            lastGuess.innerHTML = event.key;
        }

        letters.forEach((letter, index) => {
            if (pressedKey === letter) {
                let el = document.querySelector("[data-letter='" + index + "']");
                let elVal = el.innerHTML.toLowerCase();

                if (correctLetters.includes(pressedKey) === false) {
                    let correctEl = document.createElement('div');
                    correctEl.classList.add('used-letter', 'used-letter--correct');
                    correctEl.innerHTML = pressedKey.toUpperCase();
                    usedLetters.append(correctEl);
                }

                if (elVal === '*') {
                    el.innerHTML = pressedKey.toUpperCase();
                    correctLetters.push(pressedKey);
                    winLength++;

                    if (winLength === letters.length) {
                        gameWon = true;
                        this.removeEventListener('keypress', keyPress);
                    }
                }
            }
        });
    }

    if (gameWon === true) {
        modal.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
        modalText.innerHTML = 'You guessed the word !!!';
        modalCorrectWord.classList.add('correct-word--correct');
        modalIconLeft.classList.add('fa-face-grin-hearts');
        modalCorrectWord.innerHTML = getWord().toUpperCase();
    } else if (gameWon === false) {
        modal.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
        modalText.innerHTML = "You didn't guess the word !!!";
        modalCorrectWord.classList.add('correct-word--wrong');
        modalIconLeft.classList.add('fa-poo');
        modalCorrectWord.innerHTML = getWord().toUpperCase();
    }
});

function getWord() {
    return CryptoJS.AES.decrypt(cookieWord, 'master-mind').toString(CryptoJS.enc.Utf8);
}