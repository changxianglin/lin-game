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

class LinParticle extends LinImage {
  constructor(game) {
    super(game, 'fire')
    this.setup()
  }
  setup() {
    this.life = 20
  }
  init(x, y, vx, vy) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }
  update() {
    this.life--
    this.x += this.vx
    this.y += this.vy
    var factor = 0.02
    this.vx += factor * this.vx
    this.vy += factor * this.vy
  }
}

class LinParticleSystem {
  constructor(game) {
    this.game = game
    this.setup()
  }
  static new(game) {
    return new this(game)
  }
  setup() {
    this.duration = 50
    this.x = 150
    this.y = 200
    this.numberOfParticles = 100
    this.particles = []
  }
  update() {
    this.duration--
    // 添加小火花
    if (this.particles.length < this.numberOfParticles) {
      var p = LinParticle.new(this.game)
      // 设置初始坐标
      var s = 2
      var vx = randomBetween(-s, s)
      var vy = randomBetween(-s, s)
      p.init(this.x, this.y, vx, vy)
      this.particles.push(p)
    }
    // 更新所有的小火花
    for (var p of this.particles) {
      p.update()
    }
    // 删除死掉的小火花
    this.particles = this.particles.filter(p => p.life > 0)
  }
  draw() {
    if (this.duration < 0) {
      // TODO: 这是一个临时方案
      // 应该从 scene 中删除自己才对
      return
    }
    for (var p of this.particles) {
      p.draw()
    }
  }
}

class SceneTitle extends LinScene {
  constructor(game) {
    super(game)
    var label = LinLabel.new(game, 'hello')
    this.addElements(label)



    var ps = LinParticleSystem.new(game)
    this.addElements(ps)
  }

  // draw() {
  //   super.draw()
  //   // draw lables
  //   // this.game.context.fillText('按 k 开始游戏', 10, 190)
  // }
}
