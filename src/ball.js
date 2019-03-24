var arkanoid = arkanoid || {};

arkanoid.ballMethods = {
    update: function (ball, avatar, scene) {
        switch(ball.state){
            case arkanoid.ballInfo.states.FOLLOW_AVATAR:
                this.followAvatar(ball, avatar);
                break;
                
            case arkanoid.ballInfo.states.NORMAL_BALL:
                this.normalUpdate(ball, avatar, scene);
        }
    },
	
	setPosition: function(x, y, ball){
		ball.position.x = x;
		ball.position.y = y;
	},
    
    followAvatar: function(ball, avatar){
        ball.x = avatar.x;
    },
    
    normalUpdate: function(ball, avatar, scene){
        ball.body.velocity = Phaser.Point.multiply(new Phaser.Point(arkanoid.ballInfo.direction.x, arkanoid.ballInfo.direction.y), new Phaser.Point(arkanoid.ballInfo.speed, arkanoid.ballInfo.speed));
		
        //COLLIDE WITH WORLD BOUNDS
		scene.game.physics.arcade.collide(ball, scene.boundLeft, function(){
            arkanoid.ballInfo.direction.x = Math.abs(arkanoid.ballInfo.direction.x);
        }, null, scene);
		scene.game.physics.arcade.collide(ball, scene.boundRight, function(){
            arkanoid.ballInfo.direction.x = Math.abs(arkanoid.ballInfo.direction.x) * -1;
        }, null, scene);
		scene.game.physics.arcade.collide(ball, scene.boundUp, function(){
            arkanoid.ballInfo.direction.y = Math.abs(arkanoid.ballInfo.direction.y);
        }, null, scene);
        scene.game.physics.arcade.collide(ball, scene.boundDown, function(){
            this.ball.methods.processDie(this);
        }, null, scene);
		
		//COLLIDE WITH AVATAR
		scene.game.physics.arcade.collide(ball, scene.avatar, function(){
			arkanoid.ballInfo.direction.y = Math.abs(arkanoid.ballInfo.direction.y) * -1;
		}, null, scene);
        
        //COLLIDE WITH BRICKS
        scene.game.physics.arcade.collide(ball, scene.bricks, function (ball, brick) {
            this.processDirectionChangeOnCollision(scene);
            brick.destroy();
        }, null, this);
    },
    
    processDirectionChangeOnCollision: function(scene) {
        if(scene.ball.body.touching.up){
            arkanoid.ballInfo.direction.y = Math.abs(arkanoid.ballInfo.direction.y);
        }
        else if (scene.ball.body.touching.down){
            arkanoid.ballInfo.direction.y = Math.abs(arkanoid.ballInfo.direction.y) * -1;
        }
        else if(scene.ball.body.touching.left){
            arkanoid.ballInfo.direction.x = Math.abs(arkanoid.ballInfo.direction.x);
        }
        else if(scene.ball.body.touching.right){
            arkanoid.ballInfo.direction.x = Math.abs(arkanoid.ballInfo.direction.x) * -1;
        }
    },
    
    processDie: function(scene){
        this.setPosition(scene.avatar.x, scene.avatar.y - 15, scene.ball);
        scene.ball.body.velocity = new Phaser.Point(0,0);
        scene.ball.state = arkanoid.ballInfo.states.FOLLOW_AVATAR;
        
        scene.avatar.hp--;
        scene.hp.children[scene.avatar.hp].destroy();
    }
}