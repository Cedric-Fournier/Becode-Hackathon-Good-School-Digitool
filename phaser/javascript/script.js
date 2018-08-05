
var game = new Phaser.Game(800,600,Phaser.AUTO,'content',{preload: preload, create:
create,update:update});
function preload(){
game.load.image('smiley','asset/garbage.svg');
}
function create(){
monSprite=game.add.sprite(0,0,'smiley');
monSprite.anchor.setTo (0.5,0.5) ;
monSprite.x=10;
monSprite.y=300;
}
function update(){
 monSprite.x=monSprite.x+2;
}
