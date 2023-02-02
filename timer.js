// Constant variables
const start_time = 51; // Time from cutscene to first set spawn
let time_running = false; // Boolean for if the timer is currently going
let remaining_time = start_time; // Set the remaining time to start time
let count = 0; // Amount of clicks on the page

//Welcome page
document.getElementById("countdown").innerHTML = `
<div class="timer">
    <span id="timer_display">Welcome to Brady's Zuk Helper</span>
    <p id="tip">Click here when the Zuk cutscene has begun.</p>
    <p id="desc">This page will remind at what times you will need to interact with the screen, you got this! <br>
    <br>Stam below 80%, if you are on mage side, tag the mage and pray against it, blowpipe the ranger and use specs <br>
    when you get to the other side. On range side, pray and spec the ranger, tag the mage when you're outside blowpipe range.<br>
    <br>Remember to always try and stay at the front of the shield.<br>
    <br> Goodluck!</p>
</div>`;

// Function to start the timer and check what the remaining time is, if time is below given threshholds, screen and text change.
function startTimer() {
    timeInterval = setInterval(() => {
        remaining_time = remaining_time - 1;
        if (remaining_time < 0) remaining_time = 209;
        
        // If past jad and time is low on set spawn, add warning to wait for another set
        if (count == 3 && remaining_time < 100) document.getElementById("tip").innerHTML = "Until next set <br><br> Wait until this set spawns before you trigger healers @240";
        
        // Go for healers, have enough time
        else if (count == 3) {
            document.getElementById("tip").innerHTML= "Until next set <br><br> Healers spawn @240hp, try to wait until you reach a side!";
        }

        if (remaining_time >= 100) document.getElementById("page").style.setProperty("background-color","rgb(74, 74, 74)");
        else if (remaining_time < 100) document.getElementById("page").style.setProperty("background-color","rgb(185, 80, 80)");

        document.getElementById("timer_display").innerHTML = timeFormat(remaining_time);
    }, 1000);
}

// Function that is called for each click on the screen, walks you through the various pages when clicked.
function checkCount() {
    count += 1;
    console.log(count);
    
    // Start counting to first set spawn and add time after.
    if (count === 1) {
        if (time_running === false) {
            time_running = true;
            startTimer();
            console.log("Time started.");
        }
        document.getElementById("desc").innerHTML="";
        document.getElementById("timer_display").innerHTML = timeFormat(remaining_time);
        document.getElementById("tip").innerHTML= "Until next set<br><br>Click the page when Zuk is below 600hp";
    }

    // Pause @600 hp
    if (count === 2) {
        stopTimer();
        document.getElementById("timer_display").innerHTML = "Timer Paused at " + timeFormat(remaining_time);
        document.getElementById("tip").innerHTML= "Click the page when Zuk is below 480 <br><br> Be ready for Jad!";
    }

    // Add 1:45 to timer after jad dies and display warning for set
    if (count === 3) {
        startTimer();
        remaining_time = remaining_time + 210;
        document.getElementById("timer_display").innerHTML = timeFormat(remaining_time);
        if (remaining_time < 100) 
            document.getElementById("tip").innerHTML = "Until next set <br><br> Wait until this set spawns before you trigger healers @240";
        else document.getElementById("tip").innerHTML= "Until next set <br><br> Healers spawn @240hp, try to wait until you reach a side!";
        
    }

    // Repeat 3:30 thereafter
    if (count > 3) {
        remaining_time = remaining_time + 210;
        document.getElementById("timer_display").innerHTML = timeFormat(remaining_time);
        document.getElementById("tip").innerHTML= "Until next set <br><br> You got this!";
    }
}

// Format the clock into minutes:seconds
function timeFormat(time) {
    const min = Math.floor(time / 60);
    let sec = time % 60;

    if (sec < 10) {
        sec = `0${sec}`;
    }
    
    return `${min}:${sec}`;
}

// Stop the timer
function stopTimer() {
    clearTimeout(timeInterval);
}