// frikin' lasers!!

function Laser(ship) {

    this.pos = createVector(ship.pos.x, ship.pos.y);
    this.vel = p5.Vector.fromAngle(ship.heading);
    this.vel.mult(7);

    this.update = function() {
        this.pos.add(this.vel);
        this.render();
    }

    this.render = function() {
        push();
        stroke(255);
        strokeWeight(3);
        translate(this.pos.x, this.pos.y);
        point(0, 0);
        pop();
    }


    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        if (d < asteroid.maxR) {
            return true;
        } else {
            return false;
        }
    }

    this.isOutOfBounds = function() {
        var tp = this.pos;
        if (0 > tp.x || tp.x > width) {
            return true;
        } else if (0 > tp.y || tp.y > height) {
            return true;
        } else {
            return false;
        }
    }
}
