var arkanoid = arkanoid || {};

arkanoid.avatarMethods = {
    moveRight: function () {
		arkanoid.mainScene.avatar.body.velocity.x = arkanoid.avatarInfo.speed;
    },
	
	moveLeft: function () {
		this.avatar.body.velocity.x = -arkanoid.avatarInfo.speed;
	},
	
	stopMoving: function () {
		this.avatar.body.velocity.x = 0;	
	},
    
    launchBall: function() {
        if(this.ball.state == arkanoid.ballInfo.states.FOLLOW_AVATAR){
            arkanoid.ballInfo.direction.y = -1;
            this.ball.state = arkanoid.ballInfo.states.NORMAL_BALL;
        }
    }
};