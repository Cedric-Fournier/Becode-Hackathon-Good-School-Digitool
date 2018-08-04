var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
  preload: function() {
    this.game.load.image('drop', 'assets/icons/drop.svg');
    this.game.load.image('herb', 'assets/images/herb.png');
    this.game.load.image('school', 'assets/images/massimo-school.png');


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
  },
  // render: function() {
  //   game.debug.text('Adventure Awaits!', 250, 290);
  // }
});

game.state.start('play');
