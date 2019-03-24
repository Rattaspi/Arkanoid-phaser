var arkanoid = arkanoid || {};

arkanoid.brickInfo = {
    width: 12,
    height: 6
}

arkanoid.avatarInfo = {
    width: 40,
    height: 7,
    speed: 130
}

arkanoid.ballInfo = {
    width: 8,
    height: 8,
    speed: 120,
    direction: {x: 1, y: -1},
    states: {
        FOLLOW_AVATAR: 0,
        NORMAL_BALL: 1
    }
}