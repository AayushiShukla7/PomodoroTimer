const start = document.getElementById("start");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const small = document.getElementById("small");
const medium = document.getElementById("medium");
const large = document.getElementById("large");

const timer = document.getElementById("timer");

let timeLeft = 3600;    // small session --> 1 hour
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML = 
    `${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
}

// Set Timer Length

small.addEventListener("click", () => {
    timeLeft = 3600;
    updateTimer();
});

medium.addEventListener("click", () => {
    timeLeft = 5400;
    updateTimer();
});

large.addEventListener("click", () => {
    timeLeft = 7200;
    updateTimer();
});

//Set Timer Actions

const startTimer = () => {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 3600;
            updateTimer();
        }
    }, 1000);
}

// const pauseTimer = () => {
    
// }

const stopTimer = () => {
    clearInterval(interval);
}

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 3600;
    updateTimer();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

