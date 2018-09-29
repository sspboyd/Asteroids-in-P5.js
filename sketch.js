var s1;
var asteroids = [];
var lasers = [];
const PHI = 1.6180339;



function setup() {
    createCanvas(700, 600);
    s1 = new Ship();

    for (var i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }

}

function draw() {
    background(47);
    s1.turn();
    s1.update();
    scoreboard.update();
    s1.render();
    s1.isHit = false;


    asteroids.forEach(function(ast) {
        ast.update();
        if (s1.isCollision(ast)) {
            s1.isHit = true;
            // console.log("BOOOOM!!!");
            scoreboard.incrmt("collisionCount");
        }
    });

    // for (var i in asteroids) {
    //     asteroids[i].update();
    //     if (s1.isCollision(asteroids[i])) {
    //         s1.isHit = true;
    //         // console.log("BOOOOM!!!");
    //         scoreboard.incrmt("collisionCount");
    //     }
    // }

    // for (var i = 0; i < asteroids.length; i++) {
    //     asteroids[i].update();
    //     if (s1.isCollision(asteroids[i])) {
    //         s1.isHit = true;
    //         // console.log("BOOOOM!!!");
    //         scoreboard.incrmt("collisionCount");
    //     }
    // }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].update();
        if (lasers[i].isOutOfBounds()) {
            lasers.splice(i, 1);
            break;
        }
        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
                scoreboard.incrmt("hitCount");

                var newAsteroids = asteroids[j].breakup();
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                asteroids = asteroids.concat(newAsteroids);
                break;
            }
        }
    }
}


let scoreboard = {
    score: 0,
    collisionCount: 0,
    laserCount: 0,
    hitCount: 0,
    distance: 0,
    maxScore: 0,
    update: function() {
        this.score = this.calcScore();
        this.display();
        if (this.score > this.maxScore) {
            this.maxScore = this.score;
        }
    },

    incrmt: function(kval) {
        if (kval in this) {
            this[kval.toString()] += 1;
        }
        // console.log(kval.toString(), this[kval.toString()]);
    },
    display: function() {
        push(); // for style state
        fill(255, 199, 123);
        textSize(18);
        text("Collisions = " + this.collisionCount, 10, height - 11);
        text("Shots = " + this.laserCount, 150, height - 11);
        text("Hits = " + this.hitCount, 250, height - 11);
        fill(123, 199, 255);
        text("Score = " + this.score, width - 150, height - 11);
        text("Max Score = " + this.maxScore, width - 300, height - 11);
    },
    calcScore: function() {
        let hitScore = this.hitCount * 50;
        let laserScore = -this.laserCount * 2;
        let collisionScore = this.collisionCount * -4;
        return hitScore + laserScore + collisionScore;
    }
}

function keyReleased() {
    s1.setRotation(0);
    s1.boosting(false);
}

function keyPressed() {
    if (key == ' ') { // only for one player. will need another keypressed key for second player
        lasers.push(new Laser(s1));
        scoreboard.incrmt("laserCount");

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
