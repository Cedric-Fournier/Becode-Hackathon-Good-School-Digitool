var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
  preload: function() {
    // background :
    this.game.load.image('herb', 'assets/images/herb.png');
    this.game.load.image('school', 'assets/images/massimo-school.png');
    // ressources
    this.game.load.image('drop', 'assets/icons/drop.svg');
    this.game.load.image('splash', 'assets/icons/splash.svg');
    this.game.load.image('garbage', 'assets/icons/garbage.svg');
    this.game.load.image('lightning', 'assets/icons/lightning1.svg');
    this.game.load.image('energy', 'assets/icons/lightning2.svg');
  },
  create: function() {

    var state = this;

    this.background = this.game.add.group();
    // setup each of our background layers to take the full screen
    ['herb', 'school']
    .forEach(function(image) {
      var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
        state.game.world.height, image, '', state.background);
      // Mettre toutes es images à la meme taille : ne pas faire pour ce cas ci
      // bg.tileScale.setTo(4, 4);
    });

    var dropSprite = game.add.sprite(620, 100, 'drop');
    dropSprite.anchor.setTo(0.5, 0.5);

    var ressourceData = [

      {
        name: 'Eau',
        image: 'drop'
      }, {
        name: 'Flaque',
        image: 'splash'
      }, {
        name: 'Poubelle',
        image: 'garbage'
      }, {
        name: 'Eclair',
        image: 'lightning'
      }, {
        name: 'Eclair2',
        image: 'energy'
      }
    ];

    this.ressources = this.game.add.group();

    var ressource;
    ressourceData.forEach(function(data) {
      // create a sprite for them off screen
      ressource = state.ressources.create(state.game.world.centerX, state.game.world.centerY, data.image);
      // center anchor
      ressource.anchor.setTo(0.5);
      // reference to the database
      ressource.details = data;

      //enable input so we can click it!
      ressource.inputEnabled = true;
      // ressource.events.onInputDown.add(state.onClickRessource, state);
    });
  },
  // render: function() {
  //   game.debug.text('Adventure Awaits!', 250, 290);
  // }



  // console.log(hello);

});
game.state.start('play');