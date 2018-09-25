function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 10;
    this.heading = HALF_PI;
    this.rotation = 0;


    this.render = function() {
        var tr = this.r;
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        triangle(0, -tr, tr, tr, -tr, tr);
    };

    this.setRotation = function(a) {
        this.rotation = a;
    }

    this.turn = function(angle) {
        this.heading += this.rotation;
    }
}

var s1;

function setup() {
    createCanvas(200, 200);
    s1 = new Ship();

}

function draw() {
    background(47);
    s1.render();
    // s1.turn(TWO_PI / 6);

}

function keyReleased() {
    s1.setRotation(0);
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        s1.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        s1.setRotation(-0.1);
    }
}
