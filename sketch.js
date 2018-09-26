var s1;

function setup() {
    createCanvas(200, 200);
    s1 = new Ship();
}

function draw() {
    background(47);
    s1.render();
    s1.turn();
    s1.update();
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
