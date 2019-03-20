var arkanoid = arkanoid || {};

arkanoid.mainScene = {
	preload: function () {
		this.game.stage.backgroundColor = "0x364dff";
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.load.image("black", "assets/blackPixel.jpg");
		this.load.image("white", "assets/whitePixel.jpg");
	},

	create: function () {
		//KEYBOARD INPUTS
		this.avatarLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.avatarRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		
        //AVATAR
		this.avatar = this.add.sprite(arkanoid.sceneConfig.width/2, arkanoid.sceneConfig.height * 0.95, "black");
		this.avatar.scale.setTo(arkanoid.avatarInfo.width, arkanoid.avatarInfo.height);
		this.avatar.anchor.setTo(.5);
		arkanoid.game.physics.arcade.enable(this.avatar);
		
		this.avatar.body.immovable = true;
		this.avatar.body.collideWithWorldBounds = true;
		
		this.avatarLeft.onDown.add(this.MoveLeft, this);
		this.avatarLeft.onUp.add(this.StopMoving, this);
		this.avatarRight.onDown.add(this.MoveRight, this);
		this.avatarRight.onUp.add(this.StopMoving, this);
		console.log(this.avatarLeft.onDown);
		
        //BLOCKS
        //this.block = this.add.image(sceneConfig.width/2, sceneConfig.height *0.5, "white");
        //this.block.setOrigin(.5);
        //this.block.scaleX = arkanoid.brickInfo.width;
        //this.block.scaleY = arkanoid.brickInfo.height;
        //this.block.tint = "0x6cff00";
        
        //BALL
        //this.ball = this.add.image(sceneConfig.width * 0.5, sceneConfig.height * 0.4, "white");
        //this.ball.scaleX = arkanoid.ballInfo.width;
        //this.ball.scaleY = arkanoid.ballInfo.height;
        //this.ball.tint = "#696969";
        //this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        //this.ball.body.collideWithWorldBounds = true;
        //arkanoid.ballInfo.direction.x =
        //console.log(Phaser.Math.RealInRange(0,1));
    },
    
	update: function () {
		
		//this.avatar.x = this.game.input.mousePointer.x + (this.avatar.displayWidth/2);
        //arkanoid.mainScene.UpdateBall(this);
        
	},
	
	MoveRight: function () {
		this.avatar.body.velocity = arkanoid.avatarInfo.speed;
	},
	
	MoveLeft: function () {
		this.avatar.body.velocity = -arkanoid.avatarInfo.speed;
	},
	
	StopMoving: function () {
		this.avatar.body.velocity = 0;	
	},
    
    UpdateBall: function () {
		/*
        //update X
        scene.ball.x += arkanoid.ballInfo.direction.x * arkanoid.ballInfo.speed;
        //update Y
        scene.ball.y += arkanoid.ballInfo.direction.y * arkanoid.ballInfo.speed;
        
        //collision with borders
        if(scene.ball.x <= scene.ball.displayWidth || scene.ball.x >= sceneConfig.width){
            arkanoid.ballInfo.direction.x *= -1;
        }
        else if(scene.ball.y <= scene.ball.displayHeight || scene.ball.y >= sceneConfig.height){
            arkanoid.ballInfo.direction.y *= -1;
        }
		*/
    }
    
};