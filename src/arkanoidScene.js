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
		
		//WORLD BOUNDS
		this.boundLeft = this.add.sprite(0, -10, "black");
		this.boundLeft.scale.setTo(10, arkanoid.sceneConfig.height + 100);
		this.boundLeft.anchor.setTo(1,0);
		//this.game.physics.arcade.enable(this.boundLeft);
		
		this.boundRight = this.add.sprite(arkanoid.sceneConfig.width, -10, "black");
		this.boundRight.scale.setTo(10, arkanoid.sceneConfig.height + 100);
		//this.game.physics.arcade.enable(this.boundRight);
		
		this.boundUp = this.add.sprite(-10, 0, "black");
		this.boundUp.scale.setTo(arkanoid.sceneConfig.width + 100, 10);
		this.boundUp.anchor.setTo(0,1);
		//this.game.physics.arcade.enable(this.boundUp);
		this.game.physics.arcade.enable([
			this.boundLeft,
			this.boundRight,
			this.boundUp
		]);
        this.boundLeft.body.immovable = true;
        this.boundRight.body.immovable = true;
        this.boundUp.body.immovable = true;
		
        //AVATAR
		this.avatar = this.add.sprite(arkanoid.sceneConfig.width/2, arkanoid.sceneConfig.height * 0.95, "black");
		this.avatar.scale.setTo(arkanoid.avatarInfo.width, arkanoid.avatarInfo.height);
		this.avatar.anchor.setTo(.5);
		arkanoid.game.physics.arcade.enable(this.avatar);
		
		this.avatar.body.immovable = true;
		this.avatar.body.collideWorldBounds = true;
		
		this.avatarLeft.onDown.add(this.MoveLeft, this);
		this.avatarLeft.onUp.add(this.StopMoving, this);
		this.avatarRight.onDown.add(this.MoveRight, this);
		this.avatarRight.onUp.add(this.StopMoving, this);
		
        //BLOCKS
        //this.block = this.add.image(sceneConfig.width/2, sceneConfig.height *0.5, "white");
        //this.block.setOrigin(.5);
        //this.block.scaleX = arkanoid.brickInfo.width;
        //this.block.scaleY = arkanoid.brickInfo.height;
        //this.block.tint = "0x6cff00";
        
        //BALL
        this.ball = this.add.sprite(this.avatar.x, this.avatar.y - 15, "white");
        this.ball.tint = "0x910096";
        this.ball.anchor.setTo(0.5);
        this.ball.scale.setTo(arkanoid.ballInfo.width, arkanoid.ballInfo.height);
        this.game.physics.arcade.enable(this.ball);
        
        this.ball.body.bounce.setTo(1.0, 1.0);
		
        arkanoid.ballInfo.direction.x = this.game.rnd.real()%2 -1;
        arkanoid.ballInfo.direction.y = -1;
        this.ball.state = arkanoid.ballInfo.states.NORMAL_BALL;
        this.ball.methods = arkanoid.ballMethods;
    },
    
	update: function () {
        this.ball.methods.update(this.ball, this.avatar, this);
	},
	
	MoveRight: function () {
		arkanoid.mainScene.avatar.body.velocity.x = arkanoid.avatarInfo.speed;
    },
	
	MoveLeft: function () {
		this.avatar.body.velocity.x = -arkanoid.avatarInfo.speed;
	},
	
	StopMoving: function () {
		this.avatar.body.velocity.x = 0;	
	}    
};