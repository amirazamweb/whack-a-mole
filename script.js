let square = document.querySelectorAll('.square');

let level = document.querySelector('select');


function startBtn(currentEle) {
    document.querySelector('audio').src = "bgtone.mp3";
    currentEle.disabled = true;
    currentEle.style.backgroundColor = "#44bd32";

    showDecreaseTime();

    if (level.value == 'easy') {
        showMole(1000);

    }
    else if (level.value == 'medium') {
        showMole(800);

    }
    else if (level.value == 'hard') {
        showMole(500);

    }
}

let moleId;

function selectRandomSquare() {
    for (let i = 0; i < 9; i++) {
        square[i].classList.remove('bg-image');
    }

    let randomValue = Math.floor(Math.random() * 9);
    square[randomValue].className += " bg-image";
}

function showMole(time) {
    moleId = setInterval(selectRandomSquare, time);
}

function scoreStorage(data) {
    let scoreCollection = JSON.parse(sessionStorage.getItem('scoreKey')) || [];
    scoreCollection.push(data);
    sessionStorage.setItem('scoreKey', JSON.stringify(scoreCollection));
}

function showPerformance() {
    clearInterval(timeIntervalId);
    clearInterval(moleId);
    scoreStorage(score);

    let performaceList = JSON.parse(sessionStorage.getItem('scoreKey'));
    let lowestScore = performaceList.sort((a, b) => a - b)[0];
    let highestScore = performaceList.sort((a, b) => b - a)[0];
    let averageScore = (performaceList.reduce((a, b) => a + b) / (performaceList.length)).toFixed(2);
    document.querySelector('#highest-score').innerText = highestScore;
    document.querySelector('#lowest-score').innerText = lowestScore;
    document.querySelector('#average-score').innerText = averageScore;
    document.querySelector('#obtained-score h2').innerText = `Your score is ${score}`;
    document.querySelector('.container').style.opacity = '0.3';
    for (let i = 0; i < 9; i++) {
        square[i].classList.remove('bg-image')
    }

    document.querySelector('#obtained-score').style.visibility = 'visible';

    document.querySelector('#obtained-score h3').addEventListener('click', () => {
        window.location.reload(true);
    })

}


let time = 30;

function timer() {
    let timeLeft = document.querySelector('#time-left');
    timeLeft.innerText = --time;
    if (time == 0) {
        document.querySelector('audio').src = "";
        showPerformance();

    }
}

let timeIntervalId;

function showDecreaseTime() {
    timeIntervalId = setInterval(timer, 1000);
}

let score = 0;

for (let i = 0; i < 9; i++) {
    square[i].addEventListener('click', () => {
        if (square[i].classList.contains('bg-image')) {
            ++score;
            document.querySelector('#score').innerText = score;

        }
    })
}

document.querySelector('#btn-end').addEventListener('click', () => {
    document.querySelector('audio').src = "";
    showPerformance();
})