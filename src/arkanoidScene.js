var arkanoid = arkanoid || {};

arkanoid.mainScene = {
	preload: function () {
		this.game.stage.backgroundColor = "0x222222";
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.load.image("black", "assets/blackPixel.jpg");
		this.load.image("white", "assets/whitePixel.jpg");
        this.load.image("square", "assets/box.png");
	},

	create: function () {
		//KEYBOARD INPUTS
		this.avatarLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.avatarRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		//WORLD BOUNDS
		this.boundLeft = this.add.sprite(0, -10, "black");
		this.boundLeft.scale.setTo(10, arkanoid.sceneConfig.height + 100);
		this.boundLeft.anchor.setTo(1, 0);
		
		this.boundRight = this.add.sprite(arkanoid.sceneConfig.width, -10, "black");
		this.boundRight.scale.setTo(10, arkanoid.sceneConfig.height + 100);
		
		this.boundUp = this.add.sprite(-10, 0, "black");
		this.boundUp.scale.setTo(arkanoid.sceneConfig.width + 100, 10);
		this.boundUp.anchor.setTo(0, 1);
        
        this.boundDown = this.add.sprite(-10, arkanoid.sceneConfig.height + 30, "black");
        this.boundDown.scale. setTo(arkanoid.sceneConfig.width + 100, 10);
		
		this.game.physics.arcade.enable([
			this.boundLeft,
			this.boundRight,
			this.boundUp,
            this.boundDown
		]);
        this.boundLeft.body.immovable = true;
        this.boundRight.body.immovable = true;
        this.boundUp.body.immovable = true;
        this.boundDown.body.immovable = true;
		
        //AVATAR
		this.avatar = this.add.sprite(arkanoid.sceneConfig.width / 2, arkanoid.sceneConfig.height * 0.95, "white");
		this.avatar.scale.setTo(arkanoid.avatarInfo.width, arkanoid.avatarInfo.height);
		this.avatar.anchor.setTo(.5);
        this.avatar.tint = "0x777777"
		arkanoid.game.physics.arcade.enable(this.avatar);
		
		this.avatar.body.immovable = true;
		this.avatar.body.collideWorldBounds = true;
        this.avatar.hp = 2;
        this.avatar.methods = arkanoid.avatarMethods;
		
		this.avatarLeft.onDown.add(this.avatar.methods.moveLeft, this);
		this.avatarLeft.onUp.add(this.avatar.methods.stopMoving, this);
		this.avatarRight.onDown.add(this.avatar.methods.moveRight, this);
		this.avatarRight.onUp.add(this.avatar.methods.stopMoving, this);
        this.spaceKey.onDown.add(this.avatar.methods.launchBall, this);
		
        //BLOCKS
        this.bricks = this.game.add.group();
        this.setUpLevel1();
        
        //BALL
        this.ball = this.add.sprite(this.avatar.x, this.avatar.y - 15, "white");
        this.ball.tint = "0x910096";
        this.ball.anchor.setTo(0.5);
        this.ball.scale.setTo(arkanoid.ballInfo.width, arkanoid.ballInfo.height);
        this.game.physics.arcade.enable(this.ball);
        
        this.ball.body.bounce.setTo(1.0, 1.0);
		
        arkanoid.ballInfo.direction.x = this.game.rnd.real() % 2 -1;
        arkanoid.ballInfo.direction.y = -1;
        this.ball.state = arkanoid.ballInfo.states.FOLLOW_AVATAR;
        this.ball.methods = arkanoid.ballMethods;
        
        //HUD - LIVES
        this.squares = this.game.add.group();
        this.squares.add(this.game.add.sprite(12,10,"square"));
        this.squares.add(this.game.add.sprite(30,10,"square"));
        this.squares.forEach(function(square){
            square.anchor.setTo(.5);
        });
        this.hp = this.game.add.group();
        this.hp.add(this.game.add.sprite(12,10,"white"));
        this.hp.add(this.game.add.sprite(30,10,"white"));
        this.hp.forEach(function (hp) {
            hp.anchor.setTo(.5);
            hp.scale.setTo(6,6);
            hp.tint = "0x00ff1d";
        });
    },
    
	update: function () {
        this.ball.methods.update(this.ball, this.avatar, this);
        
        //CHECK THE HP
        if(this.avatar.hp <= 0){
            arkanoid.game.state.start("gameover");
        }
        
        //CHECK THE BRICKS
        if(this.bricks.length <= 0){
            arkanoid.game.state.start("gameover");
        }
	},
    
    setUpLevel1: function () {
        var initialPos = {x: 25, y: 100};
        var brickSize = {x: arkanoid.brickInfo.width, y: arkanoid.brickInfo.height};
        for(var r = 0; r < 4; r++){
            var color = Phaser.Color.getRandomColor(50,255,255);
            for(var c = 0; c < 16; c++){
                var brick = this.game.add.sprite(initialPos.x + brickSize.x * c + c, initialPos.y + brickSize.y * r + r, "white");
                brick.scale.setTo(arkanoid.brickInfo.width, arkanoid.brickInfo.height);
                brick.tint = color;
                this.bricks.add(brick);
            }
        }
        this.game.physics.arcade.enable(this.bricks);
        for(var i = 0; i < this.bricks.length; i++){
            this.bricks.children[i].body.immovable = true;
        }
    }
};

arkanoid.debug = {
    destroyAllBricks: function (){
        arkanoid.mainScene.bricks.forEach(function(b){
            b.destroy();
        });
    }
};