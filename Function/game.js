let game = new Phaser.Game(1110, 550, Phaser.AUTO, 'GPgame');

let counter = {
  waterPoint: 0,
  garbagePoint: 0,
  energyPoint: 0,
}
game.state.add('play', {

  preload: function() {
    // background
    this.game.load.image('school', './Assets/images/massimo-school.png');
    // ressources
    this.game.load.image('drop', './Assets/images/icons/drop-mini.png');
    this.game.load.image('garbage', './Assets/images/icons/garbage-mini.png');
    this.game.load.image('lightning', './Assets/images/icons/lightning-mini.png');
    // special ressources
    this.game.load.image('splash', './Assets/images/icons/splash-mini.png');
    this.game.load.image('trash', './Assets/images/icons/trash-mini.png');
    this.game.load.image('gas', './Assets/images/icons/gas-mini.png');
    // ressources static
    this.game.load.image('container', './Assets/images/icons/recycling-bin-mini.png');
    this.game.load.image('lightOff', './Assets/images/icons/street-light-off-mini.png');
    this.game.load.image('lightOn', './Assets/images/icons/street-light-on-mini.png');
  },

  create: function() {

    let state = this;

    this.background = this.game.add.group();
    // setup each of our background layers to take the full screen
    ['school']
    .forEach(function(image) {
      let bg = state.game.add.tileSprite(0, 0, state.game.world.width,
      state.game.world.height, image, '', state.background);
    });

    let binSprite = this.game.add.sprite(350, 270, 'container');
    let lightOffSprite1 = this.game.add.sprite(220, 240, 'lightOff');
    let lightOffSprite2 = this.game.add.sprite(840, 250, 'lightOff');
    let lightOnSprite = this.game.add.sprite(530, 420, 'lightOn');

    let ressourceData = [
      {
        name: 'Eau',
        image: 'drop',
        genre: 'waterPoint',
        maxHealth: 1
      },
      {
        name: 'Flaque',
        image: 'splash',
        genre: 'waterPoint',
        maxHealth: 2
      },
      {
        name: 'Poubelle',
        image: 'garbage',
        genre: 'garbagePoint',
        maxHealth: 1
      },
      {
        name: 'Grosse Poubelle',
        image: 'trash',
        genre: 'garbagePoint',
        maxHealth: 2
      },
      {
        name: 'Eclair',
        image: 'lightning',
        genre: 'energyPoint',
        maxHealth: 1
      },
      {
        name: 'Gas',
        image: 'gas',
        genre: 'energyPoint',
        maxHealth: 2
      }
      // {
      //   name:'ContainerGarbage',
      //   image:'container',
      //   genre: 'garbagePoint',
      //   maxHealth: 10
      // }
    ];

    this.ressources = this.game.add.group();
    let ressource;

    // let containerSprite = game.add.sprite(50, 290, 'container');

    ressourceData.forEach(function(data) {
      for (let i = 0; i < 10; i++) {
        // create a sprite for them off screen
        ressource = state.ressources.create(1200, state.game.world.centerY, data.image);
        // use the built in health component
        ressource.health = ressource.maxHealth = data.maxHealth;
        // center anchor
        ressource.anchor.setTo(0.5);
        // reference to the database
        ressource.details = data;
        //enable input so we can click it!
        ressource.inputEnabled = true;
        ressource.events.onInputDown.add(state.onClickRessource, state);
        // hook into health and lifecycle events
        ressource.events.onKilled.add(state.onKilledRessource, state);
      }
    });

    for (let i = 0; i < 10; i++) {
      this.spawnResource();
    }

    // the main player
    this.player = {
        clickDmg: 1
    };

  },

  onKilledRessource: function(ressource) {
      // move the ressource off screen again
      ressource.position.set(1200, this.game.world.randomY);

      let resource = this.spawnResource();
  },

  onClickRessource: function(ressource) {

    // apply click damage to ressource
    ressource.damage(this.player.clickDmg);
    counter[ressource.details.genre]++;
    //compteur de ressources en array
    let compEau = Object.entries(counter)[0][1];
    let compPoubelle = Object.entries(counter)[1][1];
    let compEnergie = Object.entries(counter)[2][1];
    // affichage compteur sur html
    $('#lightning').html(compEnergie);
    $('#water').html(compEau);
    $('#garbage').html(compPoubelle);
    // si compteur == 10 --> débloque boutton action
    if (compEau == 5) {
      $('#clicktypeEau').removeAttr('disabled');
      $('#clicktypeEau').removeClass('disabled');
    };
    if (compEnergie== 5) {
      $('#clicktypeEnergie').removeAttr('disabled');
      $('#clicktypeEnergie').removeClass('disabled');
    };
    if (compPoubelle== 5) {
      $('#clicktypeDechet').removeAttr('disabled');
      $('#clicktypeDechet').removeClass('disabled');
    };
  },

  fadePicture: function(ressource) {
    if (ressource.health > 0) {
      ressource.position.set(1200, this.game.world.centerY);
      this.spawnResource();
    }
  },

  spawnResource: function() {
    let resource = this.ressources.getRandom();

    // make sure they are fully healed
    resource.revive(resource.maxHealth);

    game.time.events.add(Phaser.Timer.SECOND * 5, this.fadePicture, this, resource);

    resource.position.set(this.game.world.randomX, this.game.world.randomY);

    return resource;
  }

});
game.state.start('play');