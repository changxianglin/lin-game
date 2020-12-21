class SceneEnd extends LinScene {
  constructor(game) {
    super(game)
    game.registerAction('r', function() {
      var s = SceneTitle.new(game)
      game.replaceScene(s)
    })
  }
  static new(game) {
    var i = new this(game)
    return i
  }

  draw() {
    // draw lables
    this.game.context.fillText('游戏结束, 按 R 返回标题界面', 140, 150)
  }
}
