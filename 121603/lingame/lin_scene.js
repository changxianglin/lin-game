class LinScene {
  constructor(game) {
    this.game = game
  }
  static new(game) {
    log('处处花')
    var i = new this(game)
    return i
  }

  draw() {
    // alert('一定要继承本函数')
  }

  update() {

  }
}
