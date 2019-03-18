var arkanoid = arkanoid || {};

arkanoid.mainScene = {
	preload: function () {
		this.load.image("black", "assets/blackPixel.jpg");
		
	},

	create: function () {
		this.avatar = this.add.image(sceneConfig.width/2, sceneConfig.height * 0.95, "black");
		this.avatar.setOrigin(.5);
		//console.log(this.avatar);
		this.avatar.scaleX = 60;
		this.avatar.scaleY = 7;
	},

	update: function () {
		
		this.avatar.x = this.game.input.mousePointer.x + (this.avatar.displayWidth/2);
		
	}
};