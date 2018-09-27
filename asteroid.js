// Asteroid
function Asteroid() {
    this.pos = createVector(random(width), random(height));
    // this.vel = createVector(random(-1,1),random(-1,1));
    this.vel = p5.Vector.random2D();
    this.heading = 0;
    this.rotation = 0;

    this.minR = 18;
    this.maxR = this.minR + floor(random(47));
    this.total = floor(random(7, 18));
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
        this.offset[i] = this.minR + (random() * (this.maxR));
    }

    this.update = function() {
        this.pos.add(this.vel);
        this.edges();
        this.render();
    }

    this.edges = function() {
        var tp = this.pos;
        var tr = this.maxR;
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

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255);
        // ellipse(0, 0, this.r*2);
        beginShape();
        for (var i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            // var x = this.r * cos(angle);
            // var y = this.r * sin(angle);
            var x = this.offset[i] * cos(angle);
            var y = this.offset[i] * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
}
