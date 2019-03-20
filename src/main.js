var arkanoid = arkanoid || {};
//var Phaser = Phaser || {};

arkanoid.sceneConfig = {
	width: 256,
	height: 192*2,
};


arkanoid.game = new Phaser.Game(arkanoid.sceneConfig.width, arkanoid.sceneConfig.height, Phaser.AUTO, null, this, false, false, Phaser.Physics.ARCADE);

arkanoid.game.state.add("first_level", arkanoid.mainScene);

arkanoid.game.state.start("first_level");