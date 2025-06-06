
const canvas = document.getElementById("canvas")

const HEIGHT = document.body.offsetHeight - 4
const WIDTH = document.body.offsetWidth - 4


let poeng = 0
const poengElm = document.getElementById("poeng")

// const WIDTH = 400
// const HEIGHT = 400
canvas.height = HEIGHT
canvas.width = WIDTH

// Kontekst, bruker til å tegne med 
const ctx = canvas.getContext("2d")


// konstant tyngdefart
let GRAVITASJON = 0.3

//Fugl
const fuglbilde = new Image()
fuglbilde.src = "bilder/flappybird2.png"

const fuglOpp = new Image()
fuglOpp.src = "bilder/fuglOpp2.png"

const fuglNed = new Image()
fuglNed.src = "bilder/fuglNed4.png"




const fugl = {
    x: 200,
    y: HEIGHT / 4,
    width: 60,
    height: 40,
    vy: 0

}
// Tårn

const towerImg = new Image()
towerImg.src = "bilder/tower.jpg"

const towerImg2 = new Image()
towerImg2.src = "bilder/tower2.jpg"

// høyden på åpningen mellom tårnene
const HOLE_HEIGHT = 200

const tower = {
    width: 100,
    x: WIDTH, // start utenfor høyre kant
    topHeight: Math.floor(Math.random() * (HEIGHT - HOLE_HEIGHT - 100)),
    speed: 2
}

towerImg2.onload = () => {
    oppdaterAlt() // Start først når bildet er klart
}

const start = [0, HEIGHT]



function tegnFugl() {
    if(fugl.vy>1) {
        ctx.drawImage(fuglNed, fugl.x, fugl.y, fugl.width, fugl.height)
    }else if(fugl.vy<-1){
        ctx.drawImage(fuglOpp, fugl.x, fugl.y, fugl.width, fugl.height)
    } else {
        ctx.drawImage(fuglbilde, fugl.x, fugl.y, fugl.width, fugl.height)   
    }

}


function tegnTower() {
    // Øverste tårn
    ctx.drawImage(towerImg2, tower.x, 0, tower.width, tower.topHeight)

    // Nederste tårn
    const bottomY = tower.topHeight + HOLE_HEIGHT
    const bottomHeight = HEIGHT - bottomY
    ctx.drawImage(towerImg, tower.x, bottomY, tower.width, bottomHeight)
}


function hopp() {
    fugl.vy = -7
}

function oppdaterFugl() {
    fugl.vy += GRAVITASJON
    fugl.y += fugl.vy
}

function oppdaterTower() {
    tower.x -= tower.speed

    // Når tårnet er ute av skjermen, resett det til høyre igjen med ny høyde
    if (tower.x + tower.width < 0) {
        tower.x = WIDTH
        tower.topHeight = Math.floor(Math.random() * (HEIGHT - HOLE_HEIGHT - 100))
        oppdaterPoeng()
    }
}
function oppdaterPoeng(){
    poeng += 1
    poengElm.innerHTML = poeng

}


function sjekkKollisjon() {
    const bottomY = tower.topHeight + HOLE_HEIGHT

    // Fuglen utenfor skjermen
    if (fugl.y - fugl.height > HEIGHT || fugl.y +fugl.height < 0) {
        return true
    }

    // Fuglen treffer tårnene horisontalt
    if (fugl.x + fugl.width > tower.x && fugl.x < tower.x + tower.width) {
        // Treffer øvre eller nedre tårn vertikalt
        if (fugl.y < tower.topHeight ||fugl.y + fugl.height > bottomY) {
            return true
        }
    }

    return false
}


// Funksjon som tømmer canvas:
function clearCanvas() {
    // ctx.clearRect(0, 0, WIDTH, HEIGHT)
    // eller slik:
    ctx.rect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = "lightblue"
    ctx.fill()
}

const restartBtn = document.querySelector("button")
function spillSlutt(){
    restartBtn.style.display = "block"

}



//  Laster siden på nytt
restartBtn.addEventListener("click", () => {
    location.reload() 
})

let animasjonID //global variabl 

// Funksjon som oppdaterer alt:
function oppdaterAlt() {
    clearCanvas()
    oppdaterFugl()
    tegnFugl()
    tegnTower()
   
    oppdaterTower()
    if (sjekkKollisjon()){
        spillSlutt()
        cancelAnimationFrame(animasjonID)
        return
    }
    
    
    
    // Tegn neste frame:
    animasjonID = requestAnimationFrame(oppdaterAlt)
}

// Start animasjonen:
// MERK: Beste måten er med requestAnimationFrame
// setInterval(oppdaterAlt, 50)
oppdaterAlt()

document.addEventListener("keypress", hopp)



