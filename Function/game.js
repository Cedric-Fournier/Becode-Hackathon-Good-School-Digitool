var game = new Phaser.Game(1000, 550, Phaser.AUTO, '');

var counter = {
  Eau: 0,
  Poubelle: 0,
  Eclair: 0,
}

game.state.add('play', {
  preload: function() {
    // background :
    this.game.load.image('school', './Assets/images/massimo-school.png');
    // ressources
    this.game.load.image('drop', './Assets/images/icons/drop-mini.png');
    this.game.load.image('splash', './Assets/images/icons/splash-mini.png');
    this.game.load.image('garbage', './Assets/images/icons/garbage-mini.png');
    this.game.load.image('lightning', './Assets/images/icons/lightning1-mini.png');

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

    // var dropSprite = game.add.sprite(620, 100, 'drop');
    // dropSprite.anchor.setTo(0.5, 0.5);

    var ressourceData = [

      {
        name: 'Eau',
        image: 'drop',
        maxHealth: 1

      }, {
        name: 'Flaque',
        image: 'splash',
        maxHealth: 1
      }, {
        name: 'Poubelle',
        image: 'garbage',
        maxHealth: 1
      }, {
        name: 'Eclair',
        image: 'lightning',
        maxHealth: 1
      },
    ];


    this.ressources = this.game.add.group();

    var ressource;
    ressourceData.forEach(function(data) {
      // create a sprite for them off screen
      ressource = state.ressources.create(1200, state.game.world.centerY, data.image);
      // // use the built in health component
      ressource.health = ressource.maxHealth = data.maxHealth;
      // random anchor
      ressource.anchor.setTo(0.5);
      // reference to the database
      ressource.details = data;

      //enable input so we can click it!
      ressource.inputEnabled = true;
      ressource.events.onInputDown.add(state.onClickRessource, state);

      // hook into health and lifecycle events
      ressource.events.onKilled.add(state.onKilledRessource, state);
      ressource.events.onRevived.add(state.onRevivedRessource, state);
    });

    this.currentRessource = this.ressources.getRandom();
    this.currentRessource.position.set(this.game.world.randomX + 100, this.game.world.randomY);





    // the main player
    this.player = {
      clickDmg: 1,
      gold: 0
    };

  },


  onKilledRessource: function(ressource) {
    // move the ressource off screen again
    ressource.position.set(1000, this.game.world.randomY);

    // pick a new ressource
    this.currentRessource = this.ressources.getRandom();
    // make sure they are fully healed
    this.currentRessource.revive(this.currentRessource.maxHealth);
  },


  onRevivedRessource: function(ressource) {
    ressource.position.set(this.game.world.randomX, this.game.world.randomY);
    // update the text display
    // this.ressourceNameText.text = ressource.details.name;
    // this.ressourceHealthText.text = ressource.health + 'HP';
  },

  onClickRessource: function() {
    // reset the currentressource before we move him
    this.currentRessource.position.set(1000, this.game.world.randomY);
    // now pick the next in the list, and bring him up
    this.currentRessource = this.ressources.getRandom();
    this.currentRessource.position.set(this.game.world.randomX + 100, this.game.world.randomY);

  },
  onClickRessource: function(ressource, pointer) {
    counter[this.currentRessource.details.name]++;
    console.log(counter);
    // apply click damage to ressource
    this.currentRessource.damage(this.player.clickDmg);

  }

});

game.state.start('play');