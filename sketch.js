var s1;
var asteroids = [];
var lasers = [];
const PHI = 1.6180339;


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
        if(s1.isCollision(asteroids[i])){
            console.log("BOOOOM!!!");
        }
    }

    for (var i = lasers.length-1; i >= 0; i--) {
        lasers[i].update();
        if(lasers[i].isOutOfBounds()){
            lasers.splice(i,1);
            break;
        }
        for (var j = asteroids.length-1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
                var newAsteroids = asteroids[j].breakup();
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                asteroids = asteroids.concat(newAsteroids);
                break;
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
