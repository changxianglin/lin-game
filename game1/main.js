var loadLevel = function(game, n) {
  n = n - 1
  var level = levels[n]
  var blocks = []
  for (var i = 0; i < level.length; i++) {
      var p = level[i]
      var b = Block(game, p)
      blocks.push(b)
  }
  return blocks
}

var __main = function() {
  var images = {
    ball: 'img/ball.png',
    block: 'img/block.png',
    paddle: 'img/paddle.png',
  }

  var game = LinGame.instance(30, images, function(g) {
    var s = SceneTitle.new(g)
    g.runWithScene(s)
  })
}

__main()
