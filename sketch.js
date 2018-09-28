var s1;
var asteroids = [];
var lasers = [];


function setup() {
    createCanvas(600, 400);
    s1 = new Ship();

    for (var i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }

}

function draw() {
    background(47);
    s1.render();
    s1.turn();
    s1.update();

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
    }

    for (var i = 0; i < lasers.length; i++) {
        lasers[i].update();
        for (var j = 0; j < asteroids.length; j++) {
            if (lasers[i].hits(asteroids[j])) {
                asteroids[j].breakup();

            }
        }
    }

}

function keyReleased() {
    s1.setRotation(0);
    s1.boosting(false);
}

function keyPressed() {
    if (key == ' ') { // only for one player. will need another keypressed key for second player
        lasers.push(new Laser(s1));
    }
    if (keyCode == RIGHT_ARROW) {
        s1.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        s1.setRotation(-0.1);

    } else if (keyCode == UP_ARROW) {
        s1.boosting(true);
        // s1.boosting(1);

    } else if (keyCode == DOWN_ARROW) {
        s1.boosting(false);
        // s1.boosting(-1);
    }
    // add WASD controls too, maybe enable two player mode?
}
