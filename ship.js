function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 10;
    this.heading = 0; // units are radians
    this.rotation = 0; // units are radians
    this.vel = createVector(1, 0);
    this.isBoosting = false;

    this.boosting = function(b) {
        this.isBoosting = b;
    }


    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.edges();
    }


    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    this.render = function() {
        stroke(255);
        noFill();

        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);

        var tr = this.r; // shortcut
        triangle(0, -tr, tr, tr, -tr, tr);
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
