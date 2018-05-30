class Snake {
  constructor(context) {
    this.x = 250
    this.y = 250
    this.movementSpeed = 2
    this.context = context
  }

  draw() {
    console.log(this.x);
    
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
    snake.updateY()
    if (snake.y >= 0) {
      window.requestAnimationFrame(drawGame)
    }
  }

  drawGame()
}


document.addEventListener('DOMContentLoaded', game)