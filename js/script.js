var t0;					// zeit des letzten aufrufs
var interval = 60000;	// aktualisierungsintervall
var delta_total = 0;	// aufsummierte abweichungen
let updateInterval; // Store interval ID

function setTime() {
    // Update time display immediately
    updateTimeDisplay();

    // Set up animation delays as before
    d = new Date();
    delay = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();

    console.log(d);
    console.log('set new delay -' + delay + 's');

    // set animation delay
    document.getElementById("h1").style.animationDelay = '-' + delay + 's';
    document.getElementById("h2").style.animationDelay = '-' + delay + 's';
    document.getElementById("m1").style.animationDelay = '-' + delay + 's';
    document.getElementById("m2").style.animationDelay = '-' + delay + 's';
    document.getElementById("s1").style.animationDelay = '-' + delay + 's';
    document.getElementById("s2").style.animationDelay = '-' + delay + 's';

    // Store the interval ID so we can clear it later
    updateInterval = setInterval(updateTimeDisplay, 1000);

    t0 = d.getTime();
    setInterval(reload_page, interval);
}

function updateTimeDisplay() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Helper function to map digit (0-9) to GRAD
    function mapToGrad(digit) {
        return parseInt(digit) * 2 || 1;  // multiply by 2, but return 1 if digit is 0
    }

    function mapToYTRA(digit) {
        return parseInt(digit) * 10 + 750 || 1;  // multiply by 2, but return 1 if digit is 0
    }

    // Update the text content
    document.getElementById("h1").textContent = hours[0];
    document.getElementById("h2").textContent = hours[1];
    document.getElementById("m1").textContent = minutes[0];
    document.getElementById("m2").textContent = minutes[1];
    document.getElementById("s1").textContent = seconds[0];
    document.getElementById("s2").textContent = seconds[1];

    // Update digits and their GRAD settings
    document.getElementById("h1").style.fontVariationSettings = `'GRAD' ${mapToGrad(hours[0])}`;
    document.getElementById("h2").style.fontVariationSettings = `'GRAD' ${mapToGrad(hours[1])}`;
    document.getElementById("m1").style.fontVariationSettings = `'GRAD' ${mapToGrad(minutes[0])}`;
    document.getElementById("m2").style.fontVariationSettings = `'GRAD' ${mapToGrad(minutes[1])}`;
    document.getElementById("s1").style.fontVariationSettings = `'GRAD' ${mapToGrad(seconds[0])}`;
    document.getElementById("s2").style.fontVariationSettings = `'GRAD' ${mapToGrad(seconds[1])}`;

    // Update digits and their GRAD settings
    document.getElementById("h1").style.fontVariationSettings = `'YTRA' ${mapToYTRA(hours[0])}`;
    document.getElementById("h2").style.fontVariationSettings = `'YTRA' ${mapToYTRA(hours[1])}`;
    document.getElementById("m1").style.fontVariationSettings = `'YTRA' ${mapToYTRA(minutes[0])}`;
    document.getElementById("m2").style.fontVariationSettings = `'YTRA' ${mapToYTRA(minutes[1])}`;
    document.getElementById("s1").style.fontVariationSettings = `'YTRA' ${mapToYTRA(seconds[0])}`;
    document.getElementById("s2").style.fontVariationSettings = `'YTRA' ${mapToYTRA(seconds[1])}`;


}

function reload_page() {
    console.log('reload_page fired');

    d = new Date();
    runtime = d.getTime() - t0;    // duration since last run, should be = 60000
    delta = runtime - interval;     // deviation of runtime from expected value
    t0 = d.getTime();              // store current time

    delta_total += delta;          // sum of all deviations
    if (Math.abs(delta_total) > 60000) {  // if total drift exceeds 1 minute
        location.reload();
    }
}