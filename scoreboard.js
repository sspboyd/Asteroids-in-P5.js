    let scoreboard = {
        // score: 0,
        // collisionCount: 0,
        // laserCount: 0,
        // hitCount: 0,
        // distance: 0,
        maxScore: 0, // declared here and not reset on replays
        initScore: function() {
            this.score = 0;
            this.collisionCount = 0;
            this.laserCount = 0;
            this.hitCount = 0;
            this.distance = 0;
            // this.maxScore = 0;
        },

        update: function() {
            this.score = this.calcScore();
            if (gameState.postGame) {
                this.postGameDisplay();
            } else {
                this.display();
            }
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
            fill(76, 199, 255, 123);
            textSize(18);
            text("collisions = " + this.collisionCount, 10, height - 11);
            text("shots = " + this.laserCount, 150, height - 11);
            text("hits = " + this.hitCount, 250, height - 11);
            fill(76, 199, 199, 199);
            text("score = " + this.score, width - 150, height - 11);
            text("max score = " + this.maxScore, width - 300, height - 11);
            pop();
        },
        postGameDisplay: function() {
            push(); // for style state
            fill(76, 199, 255, 123);
            textSize(18);
            text("collisions = " + this.collisionCount, width / pow(PHI, 4), height / pow(PHI, 1));
            text("shots = " + this.laserCount, width / pow(PHI, 4), height / pow(PHI, 1)+18);
            text("hits = " + this.hitCount, width / pow(PHI, 4), height / pow(PHI, 1)+36);
            fill(76, 199, 199, 199);
            text("score = " + this.score, width / pow(PHI, 1), height / pow(PHI, 1));
            text("max score = " + this.maxScore, width / pow(PHI, 1), height / pow(PHI, 1)+18);
            pop();
        },
        calcScore: function() {
            let hitScore = this.hitCount * 76;
            let laserScore = -this.laserCount * 3;
            let collisionScore = this.collisionCount * -7;
            return hitScore + laserScore + collisionScore;
        }
    }
