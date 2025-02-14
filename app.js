const container = document.getElementById("container");

const start = document.getElementById("start");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const small = document.getElementById("small");
const medium = document.getElementById("medium");
const large = document.getElementById("large");

const custom = document.getElementById("custom");
const customTimerInput = document.getElementById("custom-timer");

const timer = document.getElementById("timer");
const tenMinutesLeftNotif = document.getElementById("notif1");
const timerEndNotif = document.getElementById("notif2");

let timeLeft = 3600;    // small session --> 1 hour

let interval = null;

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
    clearInterval(interval);
    timeLeft = 3600;
    updateTimer();
});

medium.addEventListener("click", () => {
    clearInterval(interval);
    timeLeft = 5400;
    updateTimer();
});

large.addEventListener("click", () => {
    clearInterval(interval);
    timeLeft = 7200;
    updateTimer();
});

// Change Background Color
const updateBGColor = () => {
    document.body.style.background = "#C41E3A";
    //document.body.style.background = "linear-gradient(180deg, #ff8177, #b12a5b);";

    // Shake the div - to convey that 10 minutes are left
    container.classList.add("shake");

    // Play a notification to let the user know (if away from screen)
    tenMinutesLeftNotif.play();
}

const resetBGColor = () => {
    document.body.style.background = "linear-gradient(180deg, #191654, #43C6AC)";
    container.classList.remove("shake");
}

//Set Timer Actions
const startTimer = () => {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        // Change background color when 10 minutes are left on the timer
        if(timeLeft === 600) {
            updateBGColor();
        }

        // Timer has ended
        if(timeLeft === 0) {
            clearInterval(interval);
            
            timerEndNotif.play();
            setTimeout(() => {
                timerEndNotif.pause();
            }, 6000);
            //alert("Time's up!");

            timeLeft = 3600;
            updateTimer();
        }

        // If the custom time input is visible and has value --> Use that as the timer value
        if(customTimerInput.classList.contains('input-wrapper-show')) {
            customTime = document.getElementById('customTime').value;
            timeLeft = customTime * 60; // Update to the timer input value
            updateTimer();

            // Hide the timer input after starting the timer
            hideCustomTimerInput();
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
}

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 3600;
    updateTimer();
    resetBGColor();
}

// Custom Timer button actions
const showCustomTimerInput = () => {
    customTimerInput.classList.replace('input-wrapper', 'input-wrapper-show');
}
const hideCustomTimerInput = () => {
    customTimerInput.classList.replace('input-wrapper-show', 'input-wrapper');
}

custom.addEventListener("click", () => {
    //alert('Custom timer button clicked');
    clearInterval(interval);

    // Show the timer input field - Toggle
    if(customTimerInput.classList.contains('input-wrapper')) {
        showCustomTimerInput();
    }
    else if(customTimerInput.classList.contains('input-wrapper-show')) {
        hideCustomTimerInput();
    }
});

// Alternate method - Using web worker (async timer)
var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
    updateTimer();
})

worker.postMessage('Run the timer');

// Add events (click) to the buttons
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

