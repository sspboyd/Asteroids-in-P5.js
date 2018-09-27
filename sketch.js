var s1;
var asteroids = [];


function setup() {
    createCanvas(1400, 800);
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

}

function keyReleased() {
    s1.setRotation(0);
    s1.boosting(false);
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        s1.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        s1.setRotation(-0.1);

    } else if (keyCode == UP_ARROW) {
        s1.boosting(true);
    }
    // add WASD controls too, maybe enable two player mode?
}
