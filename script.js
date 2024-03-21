// Maak woordenlijst waar woord uit gekozen wordt. Chatgpt gebruikt om deze woorden lijst op alfabetische volgorde te zetten 
const woorden = [
    "array",
    "article",
    "body",
    "button",
    "class",
    "coding",
    "console",
    "constant",
    "css",
    "document",
    "display",
    "div",
    "footer",
    "function",
    "github",
    "header",
    "html",
    "javascript",
    "lapot",
    "margin",
    "padding",
    "repository",
    "script",
    "section",
    "simon",
    "src"

]

// Variabelen maken
let antwoord = ''
let maxFout = 12
let fouten = 0
let gokken = []
let woordStatus = 0

// Random woord kiezen
function randomWoord() {
    antwoord = woorden[Math.floor(Math.random() * woorden.length)]
}

// Letters maken; gevonden op youtube. Ik kan de video niet terug vinden
function maakKnoppen() {
    let knopHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
        <button class="keyboard-btn" id="${letter}" onClick="checkGok('${letter}')">${letter}</button>
    `).join('')
    document.getElementById('keyboard').innerHTML = knopHTML
}

// Kijken of de gok goed is; hulp van W3school "https://www.w3schools.com/jsref/jsref_indexof.asp"
function checkGok(gekozenLetter) {
    if (gokken.indexOf(gekozenLetter) === -1) {
        gokken.push(gekozenLetter)
        document.getElementById(gekozenLetter).setAttribute('disabled', true)

        if (antwoord.indexOf(gekozenLetter) >= 0) {
            gegoktWoord()
            hebJeGewonnen()
        } else if (antwoord.indexOf(gekozenLetter) === -1) {
            fouten++
            updateFouten()
            updateMannetje()
            hebJeVerloren()
            console.log(fouten)
        }
    }
}

// Update hangman bij een fout
function updateMannetje() {
    document.getElementById('mannetje').src = './images/galgje-tekeningen/mannetje-' + fouten + '.png'
}

//Gegokt woord checken; hulp van https://codepen.io/takaneichinose/pen/yVXYRo
function gegoktWoord() {
    woordStatus = antwoord.split('').map(letter => (gokken.indexOf(letter) >= 0 ? letter : " _ ")).join('')
    document.getElementById('wordSpotlight').innerHTML = woordStatus
}

// Kijk of je gewonnen hebt
function hebJeGewonnen() {
    if (woordStatus === antwoord) {
        alert("KUT je hebt gewonnen :(")
    }
}

// Kijk of je verloren hebt
function hebJeVerloren() {
    if (fouten === maxFout) {
        alert("haha je hebt verloren! hoe wist je niet dat het: " + antwoord + " was :)")
        reset()
    }
}

function updateFouten() {
    document.getElementById('fouten').innerHTML = fouten;
}

// Reset functie
function reset() {
    fouten = 0
    gokken = []
    document.getElementById('mannetje').src = './images/galgje-tekeningen/mannetje-0.png'

    randomWoord()
    maakKnoppen()
    gegoktWoord()

    window.location.reload()
}

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'Enter':
            reset()
            break
    }
})

document.getElementById('maxfout').innerHTML = maxFout

randomWoord()
maakKnoppen()
gegoktWoord()


