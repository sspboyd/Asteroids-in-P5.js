// Asteroid
function Asteroid(parentAsteroid) {
    if (parentAsteroid) {
        this.pos = parentAsteroid.pos.copy();
        this.parentAsteroid = parentAsteroid;
    } else {
        this.pos = createVector(random(width), random(height));
    }
    // this.vel = createVector(random(-1,1),random(-1,1));
    this.vel = p5.Vector.random2D();
    this.heading = 0;
    this.rotation = random(-QUARTER_PI / 47, QUARTER_PI / 47);

    if (parentAsteroid) {
        this.minR = parentAsteroid.minR * (1 / PHI);
        this.maxR = parentAsteroid.maxR * (1 / PHI);
    } else {
        this.minR = 29;
        this.maxR = this.minR + floor(random(47));
    }
    this.total = floor(random(7, 11));
    this.offset = [];

    for (var i = 0; i < this.total; i++) {
        this.offset[i] = this.minR + (random() * (this.maxR));
    }

    this.rotate = function() {
        this.heading += this.rotation;
    }

    this.setRotation = function(angle) {
        this.rotation = angle;
    }
    this.update = function() {
        this.pos.add(this.vel);
        // this.setRotation();
        this.rotate();
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
        rotate(this.heading);
        noFill();
        stroke(255);
        // ellipse(0,0,this.minR*2, this.minR*2);
        // ellipse(0,0,this.maxR*2, this.maxR*2);
        fill(255, 29);
        // ellipse(0, 0, this.r*2);

        beginShape();

        this.offset.forEach(function(ofst, i, arr) {
            var angle = map(i, 0, arr.length, 0, TWO_PI);
            var x = ofst * cos(angle);
            var y = ofst * sin(angle);
            vertex(x, y);

        });
        // for (var i = 0; i < this.total; i++) {
        //     var angle = map(i, 0, this.total, 0, TWO_PI);
        //     // var x = this.r * cos(angle);
        //     // var y = this.r * sin(angle);
        //     var x = this.offset[i] * cos(angle);
        //     var y = this.offset[i] * sin(angle);
        //     vertex(x, y);
        // }
        endShape(CLOSE);
        pop();
    }

    this.breakup = function() {
        var newA = [];
        if (this.minR > 11) {
            newA[0] = new Asteroid(this);
            newA[1] = new Asteroid(this);
        }
        return newA;
    }
}
