let canvas = document.getElementById("canvas")
let context = canvas.getContext('2d')
let lineCount = 0
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 96
context.translate(canvas.width / 2, canvas.height)
context.rotate(radians(-90))

let branchingAngle
let branchReductionPercent

function drawBranch(vector, isTrunk) {
  if (vector.length < 1) return
  let length = isTrunk ? 25 : vector.length
  let endPoint = {
    x: length * Math.cos(radians(vector.angle)) + vector.origin.x,
    y: length * Math.sin(radians(vector.angle)) + vector.origin.y
  }
  drawLine(vector.origin, endPoint)
  
  let leftVector = {
    origin: endPoint, 
    angle: vector.angle + branchingAngle,
    length: vector.length * branchReductionPercent
  }
  let rightVector = {
    origin: endPoint, 
    angle: vector.angle - branchingAngle,
    length: vector.length * branchReductionPercent
  }
  // context.strokeStyle = 'red'
  drawBranch(leftVector)
  // context.strokeStyle = 'blue'
  drawBranch(rightVector)
}


function drawLine(startPoint, endPoint) {
  lineCount++
  context.beginPath()
  context.moveTo(startPoint.x, startPoint.y)
  context.lineTo(endPoint.x, endPoint.y)
  context.stroke()
}

let startingVector = {
  origin: {
    x: 0,
    y: 0
  },
  angle: 0,
  length: 300
}

function radians(radians) {
  return radians * (Math.PI / 180)
}

function draw() {
  context.clearRect(0, -5000, 10000, 10000);
  branchingAngle = parseInt(document.getElementById("branching-angle").value)
  branchReductionPercent = 1 - (parseFloat(document.getElementById("branch-reduction-percent").value) / 100)
  drawBranch(startingVector, true)
  console.log("Total lines drawn: " + lineCount)
}
