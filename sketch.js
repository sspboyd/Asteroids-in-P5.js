    var s1;
    var asteroids;
    var lasers = [];
    const PHI = 1.6180339;

    let gameState = {
        highScore: 0,
        numAsteroids: 11,
        // pregame: true, //ready for new game to begin
        // activeGame: false, //
        // postGame: false,
        initGame: function() {
            this.pregame = true;
            this.activeGame = false;
            this.postgame = false;
            scoreboard.initScore();
            s1 = new Ship();
            asteroids = [];
            for (var i = 0; i < this.numAsteroids; i++) {
                asteroids.push(new Asteroid());
            }
        }
    };


    function setup() {
        createCanvas(windowWidth - 20, windowHeight - 20);
        gameState.initGame();
    }

    function draw() {
        background(4, 7, 18);

        if (gameState.pregame) {
            asteroids.forEach(function(ast) {
                ast.update();
            });
            scoreboard.update();

            textSize(72);
            fill(255, 199);
            text("asteroids", width / pow(PHI, 4), height / PHI);
            textSize(24);
            fill(123, 199);
            text("left, right and up arrows to move, Spacebar to shoot\nyou can't die, just try to get points\npress 'enter' to begin.", width / pow(PHI, 4), height / PHI + 72);
        } else if (gameState.activeGame) {
            if (asteroids.length < 1) {
                gameState.pregame = false;
                gameState.activeGame = false;
                gameState.postGame = true;
            }
            scoreboard.update();
            s1.turn();
            s1.update();
            s1.render();
            s1.isHit = false;

            asteroids.forEach(function(ast) {
                ast.update();
                if (s1.isCollision(ast)) {
                    s1.isHit = true;
                    scoreboard.incrmt("collisionCount");
                }
            });

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
        } else if (gameState.postGame) {
            fill(255, 123, 199, 76);
            textSize(48);
            text("game over...", width / pow(PHI, 4), height / pow(PHI, 2));
            textSize(24);
            text("press 'enter' to restart the game", width / pow(PHI, 4), height / pow(PHI, PHI));
            scoreboard.update();

        }
    }

    function keyReleased() {
        s1.setRotation(0);
        s1.boosting(false);
    }

    function keyPressed() {
        if (keyCode === 13) { // only for one player. will need another keypressed key for second player
            if (gameState.pregame) {
                gameState.pregame = false;
                gameState.activeGame = true;
                gameState.postGame = false;

            } else if (gameState.postGame) {
                gameState.pregame = true;
                gameState.activeGame = false;
                gameState.postGame = false;

                gameState.initGame();
            }
        }

        if (key == 'R') {
            gameState.pregame = false;
            gameState.activeGame = false;
            gameState.postGame = true;
        }


        if (gameState.activeGame) {
            if (key == ' ') { // only for one player. will need another keypressed key for second player
                lasers.push(new Laser(s1));
                scoreboard.incrmt("laserCount");
            }

            if (keyCode == RIGHT_ARROW) {
                s1.setRotation(0.09);
            } else if (keyCode == LEFT_ARROW) {
                s1.setRotation(-0.09);

            } else if (keyCode == UP_ARROW) {
                s1.boosting(true);
                // s1.boosting(1);

            } else if (keyCode == DOWN_ARROW) {
                s1.boosting(false);
                // s1.boosting(-1);
            }
            // add WASD controls too, maybe enable two player mode?
        }
    }
