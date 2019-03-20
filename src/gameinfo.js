var arkanoid = arkanoid || {};

arkanoid.brickInfo = {
    width: 12,
    height: 4,
    /*
    GetColor: function () {
        var c = Phaser.Color.getRandomColor(255,255,255);
        return c;
    }
    */
}

arkanoid.avatarInfo = {
    width: 40,
    height: 7,
    speed: 130
}

arkanoid.ballInfo = {
    width: 8,
    height: 8,
    speed: 3,
    direction: {x: 1, y: -1}
}