const boxes = document.querySelectorAll('.box');
const startBtn = document.querySelector('.btn-start');

let lives = null;
let difficulty = null;
let iconClassName = null;

selectDifficulty();
startGame();

function startGame() {
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            let word = document.getElementById('word').value;
            setWord(word);

            window.location.href = '/game.html'
        });
    }
}

function setWord(word) {
    let encryptedAES = CryptoJS.AES.encrypt(word, "master-mind");
    document.cookie = `word = ${encryptedAES}`;
}

function selectDifficulty() {
    boxes.forEach((box) => {
        box.addEventListener('click', function(){
            lives = box.dataset.lives;
            difficulty = box.dataset.difficulty;
            iconClassName = box.dataset.iconClassName;

            document.cookie = `lives = ${lives}`;
            document.cookie = `difficulty = ${difficulty}`;
            document.cookie = `iconClassName = ${iconClassName}`;

            window.location.href = '/select-word.html';
        });
    });
}


