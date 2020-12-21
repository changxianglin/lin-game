class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    game.registerAction('Enter', function() {
      var s = Bird.new(game)
      game.replaceScene(s)
    })
  }
  static new(game) {
    var i = new this(game)
    return i
  }

  draw() {
    // draw lables
    this.game.context.fillText('按 Enter 开始游戏', 10, 290)
  }
}
