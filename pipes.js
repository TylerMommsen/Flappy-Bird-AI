class Pipes {

    constructor() {
        this.x = width;
        this.w = 140;
        this.h = 980;
        this.speed = 5;
        this.spacing = 300;
        this.gapCenter = random(200, 780);
        this.topY = (this.gapCenter - this.spacing/2) - 980;
        this.bottomY = this.gapCenter + this.spacing/2;
        this.passed = false;

        this.move = function() {
            this.x -= this.speed;
        }
    }

    // shows pipes on screen
    show(pipeUpImg, pipeDownImg) {
        image(pipeDownImg, this.x, this.topY, this.w, this.h);
        image(pipeUpImg, this.x, this.bottomY, this.w, this.h);
    }

    // updates pipes movement
    update() {
        this.move();
    }

    // checks collision with pipes and birds
    collided(bird) {
        if ((bird.y < this.topY + 980) || (bird.y > this.bottomY - 80)) {
            if ((bird.x < this.x + this.w) && (bird.x + bird.width > this.x)) {
                return true;
            }
        }
        return false;
    }

    // increments score when bird passes pipe
    birdPassed(bird) {
        if (bird.x + bird.width > this.x + this.w/2 && bird.x + bird.width < this.x + this.w && this.passed === false) {
            this.passed = true;
            return true;
        }
        return false;
    }

    // removes pipe when offscreen
    offScreen() {
        if (this.x < -200) {
            return true;
        } else {
            return false;
        }
    }
}