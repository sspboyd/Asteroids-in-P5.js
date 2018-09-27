function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 30;
    this.heading = 0; // units are radians
    this.rotation = 0; // units are radians
    this.vel = createVector(10, 0);
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
        push();
        stroke(255);
        // noFill();
        fill(200+random(55),random(100)+50,100+random(55));

        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);

        var tr = this.r; // shortcut
        triangle(0, -tr, tr, tr, -tr, tr);
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
