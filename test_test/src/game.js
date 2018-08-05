var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
    preload: function() {
        game.load.image('skeleton', 'Assets/skeleton.png');
    },
    create: function() {
        var skeletonSprite = game.add.sprite(450, 290, 'skeleton');
        skeletonSprite.anchor.setTo(0.5, 0.5);
    },
    render: function() {
        game.debug.text('Adventure Awaits!', 250, 290);
    }
});

game.state.start('play');


game.state.add('play', {
  preload: function() {
    //this.game.load.image('drop', 'Assets/icons/drop.svg');
    //this.game.load.image('herb', 'assets/parallax_forest_pack/herb.png');
    this.game.load.image('school', 'Assets/icons/massimo-school.svg');


  },
  create: function() {

    var state = this;

    this.background = this.game.add.group();
    // setup each of our background layers to take the full screen
    //['herb', 'school']
    ['school']
    .forEach(function(image) {
      var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
        state.game.world.height, image, '', state.background);
      bg.tileScale.setTo(4, 4);
    });

    var dropSprite = game.add.sprite(450, 290, 'school');
    dropSprite.anchor.setTo(0.5, 0.5);
  },
  render: function() {
    game.debug.text('Adventure Awaits!', 250, 290);
  }
});

game.state.start('play');
