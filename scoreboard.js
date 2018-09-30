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
            fill(76, 199, 255,123);
            textSize(18);
            text("Collisions = " + this.collisionCount, 10, height - 11);
            text("Shots = " + this.laserCount, 150, height - 11);
            text("Hits = " + this.hitCount, 250, height - 11);
            fill(76, 199, 199,199);
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
