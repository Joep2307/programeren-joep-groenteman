// Maak woordenlijst waar woord uit gekozen wordt
const woorden = [
    "Array",
    "constant",
    "javascript",
    "coding",
    "console",

];

// Variabelen maken
let antwoord = '';
let maxFout = 12;
let fouten = 0;
let gokken = [];
let woordStatus = 0;

// Random woord kiezen
function randomWoord() {
    antwoord = woorden[Math.floor(Math.random() * woorden.length)];
}

// Letters maken; gevonden op yyoutube. Ik kan de video niet terug vinden
function maakKnoppen() {
    let knopHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
        <button class="keyboard-btn" id="${letter}" onClick="checkGok('${letter}')">${letter}</button>
    `).join('');
    document.getElementById('keyboard').innerHTML = knopHTML;
}

// Kijken of de gok goed is; hulp van W3school "https://www.w3schools.com/jsref/jsref_indexof.asp"
function checkGok(gekozenLetter) {
    if (gokken.indexOf(gekozenLetter) === -1) {
        gokken.push(gekozenLetter);
        document.getElementById(gekozenLetter).setAttribute('disabled', true);

        if (antwoord.indexOf(gekozenLetter) >= 0) {
            gegoktWoord();
            hebJeGewonnen();
        } else if (antwoord.indexOf(gekozenLetter) === -1) {
            fouten++;
            updateFouten();
            hebJeVerloren();
            updateMannetje();
            console.log(fouten)
        }
    }
}

// Update hangman bij een fout
function updateMannetje() {
    document.getElementById('mannetje').src = './images/galgje-tekeningen/mannetje-' + fouten + '.png';
}

//Gegokt woord checken; hulp van https://codepen.io/takaneichinose/pen/yVXYRo
function gegoktWoord() {
    woordStatus = antwoord.split('').map(letter => (gokken.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = woordStatus;
}

// Kijk of je gewonnen hebt
function hebJeGewonnen() {
    if (woordStatus === antwoord) {
        alert("Gefeliciteerd, je hebt gewonnen!");
    }
}

// Kijk of je verloren hebt
function hebJeVerloren() {
    if (fouten === maxFout) {
        alert("Je hebt verloren. Het juiste woord was: " + antwoord);
    }
}

function updateFouten() {
    document.getElementById('fouten').innerHTML = fouten;
}

// Reset functie
function reset() {
    fouten = 0
    gokken = []
    document.getElementById('mannetje').src = './images/galgje-tekeningen/mannetje-0.jpg';

    randomWoord();
    maakKnoppen();
    gegoktWoord();
}

document.getElementById('maxfout').innerHTML = maxFout;

randomWoord();
maakKnoppen();
gegoktWoord();


