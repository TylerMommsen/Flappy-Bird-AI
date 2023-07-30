class Bird {
    
    constructor(brain) {
        this.x = width / 4;
        this.y = height / 2;
        this.width = 102;
        this.height = 72;
        this.vel = 0;
        this.gravity = 1;
        this.flapPower = -17;
        this.fallRotation = -PI / 6;

        this.score = 0;
        this.fitness= 0;

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 4, 1);
        }

        this.move = function() {
            this.vel += this.gravity;
            this.y += this.vel;
        }

        this.flap = function() {
            this.vel = this.flapPower;
        }
    }

    // show bird on screen
    show(bird) {
        push();
        tint(255, 200);
        translate(this.x + this.width/2, this.y + this.height/2);
        if (this.vel < 15) {
          rotate(-PI / 6);
          this.fallRotation = -PI / 6;
        } else if (this.vel <= 25) {
          this.fallRotation += PI / 16.0;
          this.fallRotation = constrain(this.fallRotation, -PI / 6, PI / 2);
          rotate(this.fallRotation);
          // rotate(map(this.velY, 10, 25, -PI / 6, PI / 2));
        } else {
          rotate(PI / 2);
        }
        image(bird, -this.width / 2, -this.height / 2);
        pop();
    }

    // update bird movement while alive
    update() {
        this.move();
        this.score++;
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think(pipes) {
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = (pipes[i].x + pipes[i].w) - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }

        if (closest != null) {
            let inputs = [];
            inputs[0] = this.y;
            inputs[1] = this.y - (closest.topY + 1320); 
            inputs[2] = (closest.bottomY) - (this.y + this.height);
            inputs[3] = closest.x - this.x;
            inputs[4] = this.vel;
    
            let output = this.brain.predict(inputs);
            if (output[0] > 0.6) {
                this.flap();
            }
        }
    }

    // check if hit floor or ceiling
    checkCollisions() {
        if (this.y + this.height < 80 || this.y > 1170) {
            return true;
        } else {
            return false;
        }
    }
}