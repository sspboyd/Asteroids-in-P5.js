function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 18;
    this.heading = 0; // units are radians
    this.rotation = 0; // units are radians
    this.vel = createVector(10, 0);
    this.isBoosting = false;
    this.isHit = false;

    this.boosting = function(b) {
        this.isBoosting = b;
    }


    this.update = function() {
        //this.turn();
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.edges();
    }

    this.isCollision = function(asteroid) {
        if (this.pos.dist(asteroid.pos) < (this.r + asteroid.minR)) {
            return true; // i know its unnecessary but its more readable
        } else {
            return false;
        }
    }

    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    this.render = function() {
        push();
        stroke(255);
        // noFill();
        if (this.isHit) {
            fill(255, 0, 0)
        } else {
            fill(200 + random(55), random(100) + 50, 100 + random(55));
        }
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);

        var tr = this.r; // shortcut
        triangle(0, -tr, tr, tr, -tr, tr);
        fill(199, 123, 123, 11);
        // triangle(0,-tr,tr*-5, tr*-5,-tr*-5, tr*-5);
        arc(0, -tr, width * PHI, width * PHI, PI + HALF_PI - (QUARTER_PI / 4), PI + HALF_PI + (QUARTER_PI / 4));
        strokeWeight(11);
        stroke(199, 123, 199, 7);
        noFill();
        // fill(199, 123, 123, 7);
        ellipse(0, -tr * 3, this.r * 7, this.r * 11);
        pop();
    };

    this.edges = function() {
        var tp = this.pos;
        var tr = this.r;
        if (tp.x > width + tr) {
            tp.x = -tr;
        } else if (tp.x < -tr) {
            tp.x = width + tr;
        }
        if (tp.y > height + tr) {
            tp.y = -tr;
        } else if (tp.y < -tr) {
            tp.y = height + tr;
        }
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }

    this.turn = function(angle) {
        this.heading += this.rotation;
    }
}
