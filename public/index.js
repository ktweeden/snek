class Snake {
  constructor(context) {
    this.x = 250
    this.y = 250
    this.movementSpeed = 2
    this.context = context
    this.currentDirection = "ArrowUp"

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
    console.log("x: ", this.x, "y:", this.y);
    
    this.context.beginPath()
    this.context.rect(this.x, this.y, 10, 10)
    this.context.fill()
  }

  moveLeft() {
    this.x -= this.movementSpeed
  }

  moveRight() {
    this.x += this.movementSpeed
  }

  moveUp() {    
    this.y -= this.movementSpeed
  }

  moveDown() {
    this.y += this.movementSpeed
  }
}

const game = function() {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  const snake = new Snake(context)
  snake.draw()


  const drawGame = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    snake.draw()
    snake.move[snake.currentDirection]()    
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