var arkanoid = arkanoid || {};

arkanoid.gameOverScene = {
    preload: function(){
        this.game.stage.backgroundColor = "0x222222";
    },
    
    create: function(){
        this.gameOverText = this.game.add.text(arkanoid.sceneConfig.width * 0.5,arkanoid.sceneConfig.height * 0.3, "Game over!");
        this.gameOverText.anchor.setTo(.5);
        this.gameOverText.fontSize = 36;
        this.gameOverText.fill = "#f5f5f5";
        
        this.text = this.game.add.text(arkanoid.sceneConfig.width * 0.5, arkanoid.sceneConfig.height * 0.75, "Space to restart");
        this.text.anchor.setTo(.5);
        this.text.fontSize = 16;
        this.text.fill = "#f5f5f5";
        
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.space.onDown.add(this.changeToGame);
        //console.log(this.space);
    },
    
    changeToGame: function(){
        arkanoid.game.state.start("first_level");
    }
}