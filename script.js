
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


// 

const fugl = {
    x: 150,
    y: HEIGHT/2,
    radius: 100,
    vy: 0

}

function tegnFugl() {
    ctx.drawImage(fuglbilde, fugl.x, fugl.y, fugl.radius, fugl.radius)
}

function hopp() {
    fugl.vy = -15
}

function oppdaterFugl(){
    fugl.vy += GRAVITASJON
    fugl.y += fugl.vy
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



    // Tegn neste frame:
    requestAnimationFrame(oppdaterAlt)
}

// Start animasjonen:
// MERK: Beste måten er med requestAnimationFrame
// setInterval(oppdaterAlt, 50)
oppdaterAlt()

document.addEventListener("keypress", hopp)



