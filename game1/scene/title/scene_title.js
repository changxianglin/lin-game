class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    game.registerAction('Enter', function() {
      var s = Scene(game)
      game.replaceScene(s)
    })
  }

  draw() {
    // draw lables
    this.game.context.fillText('按 Enter 开始游戏', 140, 150)
  }
}
