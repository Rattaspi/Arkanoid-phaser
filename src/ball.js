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
        });
		
		//COLLIDE WITH AVATAR
		scene.game.physics.arcade.collide(ball, scene.avatar, function(){
			arkanoid.ballInfo.direction.y = Math.abs(arkanoid.ballInfo.direction.y) * -1;
		}, null, scene);
    }
}