class LinLabel {
  constructor(game, text) {
    this.game = game
    this.text = text
  }
  static new(game, text) {
    return new this(game, text)
  }
  draw() {
    this.game.context.fillText(this.text, 10, 190)
  }
  update() {

  }
}
