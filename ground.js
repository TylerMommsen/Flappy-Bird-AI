class Ground {

    constructor() {
        this.x = 0;
        this.y = height - 80;
        this.speed = 5;

        this.move = function() {
            this.x -= this.speed;
        }
    }

    show(ground) {
        image(ground, this.x, this.y, 2000, 80);
    }

    update() {
        this.move();
        if (this.x <= -1000) { // reset ground to original pos when passed certain point
            this.x = 0;
        }
    }
}