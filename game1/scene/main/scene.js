var Scene = function(game) {
  var s = {
    game: game,
  }
  // 初始化
  var paddle = Paddle(game)
  var ball = Ball(game)

  var score = 0

  var checkPoint = 3

  var blocks = loadLevel(game, checkPoint)

  game.registerAction('a', function() {
    paddle.moveLeft()
  })

  game.registerAction('d', function() {
    paddle.moveRight()
  })

  game.registerAction('f', function() {
    ball.fire()
  })

  s.draw = function() {
    // draw 背景
    // game.context.fillStyle = '#554'
    // game.context.fillStyle = '#fff'
    // game.context.fillRect(0, 0, 400, 300)

    // draw
    game.drawImage(paddle)
    game.drawImage(ball)
    // draw blocks
    var len = blocks.length
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i]
      if (block.alive) {
        game.drawImage(block)
      }
    }


      // game.context.fillText('第 1 关 ', 10, 250)
     // draw labels
    game.context.fillText('分数: ' + score, 10, 290)
    game.context.fillText('第: ' + checkPoint + ' 关', 350, 290)
  }
  s.update = function() {
    if (window.paused) {
      return
    }

    ball.move()
    // 判断游戏结束
    if (ball.y > paddle.y) {
      // 跳转到 游戏结束 的场景
      var end = SceneEnd.new(game)
      game.replaceScene(end)
    }
    // 判断相撞
    if (paddle.collide(ball)) {
      // 这里应该调用一个 ball.反弹() 来实现
      ball.speedY *= -1
    }
    // 判断 ball 和 blocks 相撞
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i]
      if (block.collide(ball)) {
        log('block 相撞')
        block.kill()
        ball.反弹()
        // 更新分数
        score += 100
      }
    }

    window.addEventListener('keydown', (event) => {
      var k = event.key
      if ('123'.includes(k)) {
        checkPoint = Number(k)
        blocks = []
        blocks = loadLevel(game, Number(k))
      }
    })
  }

  // mouse event
  var enableDrag = false
  game.canvas.addEventListener('mousedown', function(event) {
    var x = event.offsetX
    var y = event.offsetY
    log(x, y, event)
    // 检查是否点中了 ball
    if (ball.hasPoint(x, y)) {
      // 设置拖拽状态
      enableDrag = true
    }
  })

  game.canvas.addEventListener('mousemove', function(event) {
    var x = event.offsetX
    var y = event.offsetY
    // log(x, y)
    if (enableDrag) {
      log(x, y)
      ball.x = x
      ball.y = y
    }
  })

  game.canvas.addEventListener('mouseup', function(event) {
    var x = event.offsetX
    var y = event.offsetY
    log(x, y)
    enableDrag = false
  })

  return s
}
