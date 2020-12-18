class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    var label = LinLabel.new(game, 'hello from lin')
    this.addElements(label)

    // cave bg
    var cave = LinImage.new(game, 'cave')
    this.addElements(cave)
    // player
    var w = LinAnimation.new(game)
    w.x = 100
    w.y = 530
    this.w = w
    this.addElements(w)

    this.setupInputs()
  }
  setupInputs() {
    var self = this
    self.game.registerAction('a', function(keyStatus) {
      self.w.move(-2, keyStatus)
    })
    self.game.registerAction('d', function(keyStatus) {
      self.w.move(2, keyStatus)
    })
  }
}
