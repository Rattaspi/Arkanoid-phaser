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
    }
}