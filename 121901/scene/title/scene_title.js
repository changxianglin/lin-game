class Pipes {
  constructor(game) {
    this.game = game
    this.pipes = []
    this.pipeSpace = 50
    this.管子横向间距 = 200
    this.columsOfPipe = 3
    for (var i = 0; i < this.columsOfPipe; i++) {
      var p1 = LinImage.new(game, 'pipe')
      p1.flipY = true
      p1.x = 500 + i * this.管子横向间距
      var p2 = LinImage.new(game, 'pipe')
      p2.x = p1.x
      this.resetPipesPosition(p1, p2)
      this.pipes.push(p1)
      this.pipes.push(p2)
    }
  }
  static new(game) {
    return new this(game)
  }
  resetPipesPosition(p1, p2) {
    p1.y = randomBetween(-200, 0)
    p2.y = p1.y + p1.h + this.pipeSpace
  }
  debug() {
    this.管子横向间距 = config.管子横向间距.value
    this.pipeSpace = config.pipe_space.value
  }
  update() {
    for (var i = 0; i < this.pipes.length / 2; i += 2) {
      var p1 = this.pipes[i]
      var p2 = this.pipes[i + 1]
      p1.x -= 5
      p2.x -= 5
      if (p1.x < -100) {
        p1.x += this.管子横向间距 * this.columsOfPipe
      }
      if (p1.x < -100) {
        p2.x += this.管子横向间距 * this.columsOfPipe
        this.resetPipesPosition(p1, p2)
      }
    }
  }
  draw() {
    var context = this.game.context
    for (var p of this.pipes) {
      context.save()

      var w2 = p.w / 2
      var h2 = p.h / 2
      context.translate(p.x + w2, p.y + h2)
      var scaleX = p.flipX ? -1 : 1
      var scaleY = p.flipY ? -1 : 1
      context.scale(scaleX, scaleY)
      context.rotate(p.rotation * Math.PI / 180)
      context.translate(-w2, -h2)
      context.drawImage(p.texture, 0, 0)

      context.restore()
    }
  }
}

class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    // var label = LinLabel.new(game, 'hello from lin')
    // this.addElements(label)

    // bg
    var bg = LinImage.new(game, 'bg')
    this.addElements(bg)
    // 加入水管
    this.pipe = Pipes.new(game)
    this.addElements(this.pipe)
    // 循环移动的地面
    this.grounds = []
    for (var i = 0; i < 30; i++) {
      var g = LinImage.new(game, 'ground')
      g.x = i * 19
      g.y = 400
      this.addElements(g)
      this.grounds.push(g)
    }
    this.skipCount = 4
    // bird
    var b = LinAnimation.new(game)
    b.x = 150
    b.y = 180
    this.bird = b
    this.birdSpeed = 2
    this.addElements(b)

    this.setupInputs()
  }
  debug() {
    this.birdSpeed = config.bird_speed.value
  }
  update() {
    super.update()
    // 地面移动
    this.skipCount--
    this.offset = -5
    if (this.skipCount == 0) {
      this.skipCount = 4
      this.offset = 15
    }
    for (var i = 0; i < 30; i++) {
      var g = this.grounds[i]
      g.x += this.offset
    }
  }
  setupInputs() {
    var self = this
    var b = this.bird
    self.game.registerAction('a', function(keyStatus) {
      b.move(-self.birdSpeed, keyStatus)
    })
    self.game.registerAction('d', function(keyStatus) {
      b.move(self.birdSpeed, keyStatus)
    })
    self.game.registerAction('j', function(keyStatus) {
      b.jump(keyStatus)
    })
  }
}
