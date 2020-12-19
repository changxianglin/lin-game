class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    // var label = LinLabel.new(game, 'hello from lin')
    // this.addElements(label)

    // bg
    var bg = LinImage.new(game, 'bg')
    this.addElements(bg)
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
    this.addElements(b)

    this.setupInputs()
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
      b.move(-2, keyStatus)
    })
    self.game.registerAction('d', function(keyStatus) {
      b.move(2, keyStatus)
    })
    self.game.registerAction('j', function(keyStatus) {
      b.jump(2, keyStatus)
    })
  }
}
