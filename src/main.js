var arkanoid = arkanoid || {};
//var Phaser = Phaser || {};

var sceneConfig = {
	type: Phaser.AUTO,
	width: 256,
	height: 192*2,
	title: "Arkanoid",
	pixelArt: true,
	backgroundColor: 0x2557ff,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: arkanoid.mainScene
};


arkanoid.game = new Phaser.Game(sceneConfig);

