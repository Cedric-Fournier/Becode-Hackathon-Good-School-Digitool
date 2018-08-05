var game = new Phaser.Game(1110, 550, Phaser.AUTO, 'GPgame');

var counter = {
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
    this.game.load.image('lightning', './Assets/images/icons/lightning1-mini.png');
    // special ressources
    this.game.load.image('splash', './Assets/images/icons/splash-mini.png');
    this.game.load.image('container', './Assets/images/icons/recycling-bin.svg');
  },

  create: function() {

    var state = this;

    this.background = this.game.add.group();
    // setup each of our background layers to take the full screen
    ['school']
    .forEach(function(image) {
      var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
        state.game.world.height, image, '', state.background);
    });

    var ressourceData = [{
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
        name: 'Eclair',
        image: 'lightning',
        genre: 'energyPoint',
        maxHealth: 1
      },
      {
        name: 'ContainerGarbage',
        image: 'container',
        genre: 'garbagePoint',
        maxHealth: 10
      }
    ];

    this.ressources = this.game.add.group();
    var ressource;

    ressourceData.forEach(function(data) {
      for (var i = 0; i < 5; i++) {
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

    for (var i = 0; i < 9; i++) {
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

    var resource = this.spawnResource();
  },

  onClickRessource: function(ressource) {

    // apply click damage to ressource
    ressource.damage(this.player.clickDmg);
    counter[ressource.details.genre]++;
    //compteur de ressources en array
    var compEau = Object.entries(counter)[0][1];
    var compPoubelle = Object.entries(counter)[1][1];
    var compEnergie = Object.entries(counter)[2][1];
    // affichage compteur sur html
    $('#lightning').html(compEnergie);
    $('#water').html(compEau);
    $('#garbage').html(compPoubelle);
    // si compteur == 10 --> débloque boutton action
    if (compEau == 5) {
      $('#clicktypeEau').removeAttr('disabled');
      $('#clicktypeEau').removeClass('disabled');
    };
    if (compEnergie == 5) {
      $('#clicktypeEnergie').removeAttr('disabled');
      $('#clicktypeEnergie').removeClass('disabled');
    };
    if (compPoubelle == 5) {
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
    var resource = this.ressources.getRandom();

    // make sure they are fully healed
    resource.revive(resource.maxHealth);

    game.time.events.add(Phaser.Timer.SECOND * 5, this.fadePicture, this, resource);

    resource.position.set(this.game.world.randomX, this.game.world.randomY);

    return resource;
  }

});
game.state.start('play');