class Bullet extends LinImage {
  constructor(game) {
    super(game, 'bullet')
    this.setup()
  }
  setup() {
    this.speed = config.bullet_speed
    // this.speed = 2
  }
  update() {
    this.y -= this.speed
  }
}

class Player extends LinImage {
  constructor(game) {
    super(game, 'player')
    this.setup()
  }
  setup() {
    this.speed = 5
    this.cooldown = 0
  }

  update() {
    this.speed = config.player_speed
    if(this.cooldown > 0) {
        this.cooldown--
     }
  }

  fire() {
    if (this.cooldown === 0) {
      this.cooldown = config.fire_cooldown
      var x = this.x + this.w / 2
      var y = this.y
      var b = Bullet.new(this.game)
      b.x = x
      b.y = y
      this.scene.addElements(b)
    }
  }

  moveLeft() {
    this.x -= this.speed
  }
  moveRight() {
    this.x += this.speed
  }
  moveUp() {
    this.y -= this.speed
  }
  moveDown() {
    this.y += this.speed
  }
}

class Enemy extends LinImage {
  constructor(game) {
    var type = randomBetween(0, 1)
    var name = 'enemy' + type
    super(game, name)
    this.setup()
  }
  setup() {
    this.speed = randomBetween(2, 5)
    this.x = randomBetween(0, 350)
    this.y = -randomBetween(0, 200)
  }

  update() {
    this.y += this.speed
    if (this.y > 600) {
      this.setup()
    }
  }
}

class Cloud extends LinImage {
  constructor(game) {
    super(game, 'cloud')
    this.setup()
  }
  setup() {
    this.speed = 1
    this.x = randomBetween(0, 350)
    this.y = -randomBetween(0, 200)
  }

  update() {
    this.y += this.speed
    if (this.y > 600) {
      this.setup()
    }
  }

  debug() {
    this.speed = config.cloud_speed
  }
}

class Scene extends LinScene {
  constructor(game) {
    super(game)
    this.setup()
    this.setupInputs()
  }
  setupInputs() {
    var g = this.game
    var s = this
    g.registerAction('a', function() {
      s.player.moveLeft()
    })
    g.registerAction('d', function() {
      s.player.moveRight()
    })
    g.registerAction('w', function() {
      s.player.moveUp()
    })
    g.registerAction('s', function() {
      s.player.moveDown()
    })
    g.registerAction('j', function() {
      s.player.fire()
    })
  }
  setup() {
    var game = this.game
    this.numberOfEnemies = 10
    this.bg = LinImage.new(game, 'sky')
    this.cloud = Cloud.new(game, 'cloud')
    // this.player = LinImage.new(game, 'player')
    // this.player.x = 100
    // this.player.y = 150
    this.player = Player.new(game)
    this.player.x = 100
    this.player.y = 150

    this.addElements(this.bg)
    this.addElements(this.cloud)
    this.addElements(this.player)
    //
    this.addEnemies()
    // add particles
    var ps = LinParticleSystem.new(this.game)
    this.addElements(ps)
  }
  addEnemies() {
    var es = []
    for (var i = 0; i < this.numberOfEnemies; i++) {
      var e = Enemy.new(this.game)
      es.push(e)
      this.addElements(e)
    }
    this.enemies = es
  }

  update() {
    super.update()
    this.cloud.y += 1
  }
}
