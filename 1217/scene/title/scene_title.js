class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    game.registerAction('k', function() {
      var s = Scene(game)
      game.replaceScene(s)
    })
  }

  draw() {
    // draw lables
    this.game.context.fillText('按 k 开始游戏', 10, 190)
  }
}
