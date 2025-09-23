const buttons = document.querySelectorAll("#egg button");

const actionContainer = document.getElementById("action");

let alarm = new Audio("alarm.mp3")


//create display for timer and display it before the start/reset button
const display = document.createElement("h2");
actionContainer.insertBefore(display, actionContainer.firstChild);

let countdown;
let selectedTime = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        selectedTime = parseFloat(button.value);
        display.textContent = `Timer is set for ${selectedTime} minutes`
        display.id = "h2";
    })
})

//start button
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
    if(selectedTime != null){
    startTimer(selectedTime * 60); //convert it to seconds
    } else{
        display.textContent = "Please select an egg type first";
    }
})

//function to start the timer
function startTimer(seconds){
    clearInterval(countdown); // to prevent starting multiple timer
    //clearInterval to stop repeating a function

    const endTime = Date.now() + seconds * 1000;
    updateDisplay(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now())/1000);
        // divide by 1000 to convert milisecs to secs; 1 sec = 1000 milisecs
        
        if (secondsLeft < 0){
        clearInterval(countdown); //stop the timer
        display.textContent = "Your egg is ready !!";
        alarm.play();
        return;
        }

        updateDisplay(secondsLeft);
    }, 1000);
}

function updateDisplay(seconds){
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;
    display.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

//reset button function
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    clearInterval(countdown);
    display.textContent = "";
    selectedTime = null;
});