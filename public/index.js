class Snake {
  constructor(context) {
    this.x = 250
    this.y = 250
    this.movementSpeed = 2
    this.context = context
    this.currentDirection = "ArrowUp"
    this.currentLength = 1
    this.cells = [{x: this.x, y: this.y}]

    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveUp = this.moveUp.bind(this)

    this.move = {
      ArrowUp: this.moveUp,
      ArrowRight: this.moveRight,
      ArrowDown: this.moveDown,
      ArrowLeft: this.moveLeft
    }
  }

  draw() {
    this.context.beginPath()
    for (let cell of this.cells) {
      this.context.rect(cell.x, cell.y, 10, 10)
    }
    this.context.fill()
  }

  updateCells() {
    this.cells.push({ x: this.x, y: this.y })
    if (this.cells.length > this.currentLength) {
      this.cells.shift()
    }
  }

  moveLeft() {
    this.x -= this.movementSpeed
    this.updateCells()
  }

  moveRight() {
    this.x += this.movementSpeed
    this.updateCells()
  }

  moveUp() {    
    this.y -= this.movementSpeed
    this.updateCells()
  }

  moveDown() {
    this.y += this.movementSpeed
    this.updateCells()
  }

  grow() {
    this.currentLength += 10/this.movementSpeed
  }
}


const game = function() {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  const snake = new Snake(context)
  const score = 0

  const createFoodPosition = function () {
    const x = Math.floor(Math.random() * canvas.width)
    const y = Math.floor(Math.random() * canvas.height)
    return { x: x, y: y }
  }

  let foodPosition = createFoodPosition()
  

  const drawFood = function () {
    context.beginPath()
    context.rect(foodPosition.x, foodPosition.y, 5, 5)
    context.fill()
  }

  const detectFoodCollision = function () {
    if (foodPosition.x >= snake.x && foodPosition.x <= snake.x + 10 && foodPosition.y >= snake.y && foodPosition.y <= snake.y + 10) {
      return true
    }
    else { return false }
  }

  const drawGame = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    snake.draw()
    drawFood()
    snake.move[snake.currentDirection]()
    if(detectFoodCollision()) {
      foodPosition = createFoodPosition()
      snake.grow()
    }
    if (snake.y >= 0 && snake.y < canvas.height-9 && snake.x >= 0 && snake.x < canvas.width-9) {
      window.requestAnimationFrame(drawGame)
    }
  }

  document.addEventListener('keydown', event => {
    event.preventDefault()
    const key = event.key
    if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
      snake.currentDirection = key
    }
  })

  window.requestAnimationFrame(drawGame)
}


document.addEventListener('DOMContentLoaded', game)