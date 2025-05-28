
const canvas = document.getElementById("canvas")

const HEIGHT = document.body.offsetHeight - 4
const WIDTH = document.body.offsetWidth - 4




// const WIDTH = 400
// const HEIGHT = 400
canvas.height = HEIGHT
canvas.width = WIDTH

// Kontekst, bruker til å tegne med 
const ctx = canvas.getContext("2d")


// konstant tyngdefart
let GRAVITASJON = 0.5

//Fugl
const fuglbilde = new Image()
fuglbilde.src = "bilder/flappybird.png"



const fugl = {
    x: 200,
    y: HEIGHT/2,
    radius: 100,
    vy: 0
    
}
// Tårn

const towerImg = new Image()
towerImg.src = "bilder/tower.jpg"

// høyden på åpningen mellom tårnene
const HOLE_HEIGHT = 200 

const tower = {
    width: 100,
    x: WIDTH, // start utenfor høyre kant
    topHeight: Math.floor(Math.random() * (HEIGHT - HOLE_HEIGHT - 100)),
    speed: 2
}

towerImg.onload = () => {
    oppdaterAlt() // Start først når bildet er klart
}

const start =[0, HEIGHT]



function tegnFugl() {
    ctx.drawImage(fuglbilde, fugl.x, fugl.y, fugl.radius, fugl.radius)
}


function tegnTower() {
    // Øverste tårn
    ctx.drawImage(towerImg, tower.x, 0, tower.width, tower.topHeight)

    // Nederste tårn
    const bottomY = tower.topHeight + HOLE_HEIGHT
    const bottomHeight = HEIGHT - bottomY
    ctx.drawImage(towerImg, tower.x, bottomY, tower.width, bottomHeight)
}


function hopp() {
    fugl.vy = -15
}

function oppdaterFugl(){
    fugl.vy += GRAVITASJON
    fugl.y += fugl.vy
}

function oppdaterTower() {
    tower.x -= tower.speed

    // Når tårnet er ute av skjermen, resett det til høyre igjen med ny høyde
    if (tower.x + tower.width < 0) {
        tower.x = WIDTH
        tower.topHeight = Math.floor(Math.random() * (HEIGHT - HOLE_HEIGHT - 100))
    }
}

// Funksjon som tømmer canvas:
function clearCanvas() {
    // ctx.clearRect(0, 0, WIDTH, HEIGHT)
    // eller slik:
    ctx.rect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = "lightblue"
    ctx.fill()
}


// Funksjon som oppdaterer alt:
function oppdaterAlt() {
    clearCanvas()
    oppdaterFugl()
    tegnFugl()
    tegnTower()
    oppdaterTower()



    // Tegn neste frame:
    requestAnimationFrame(oppdaterAlt)
}

// Start animasjonen:
// MERK: Beste måten er med requestAnimationFrame
// setInterval(oppdaterAlt, 50)
oppdaterAlt()

document.addEventListener("keypress", hopp)



