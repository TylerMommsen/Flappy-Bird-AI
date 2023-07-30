const TOTALPOP = 100;
let birds = [];
let savedBirds = [];
let obstacles = [];
let timer = 100;
let score = 0;
let gen = 0;
let hasPassedPipe = false;
let gameSpeed = 1;

let bg;
let groundImg;
let birdImg;
let pipeUpImg;
let pipeDownImg;

function preload() {
    bg = loadImage('assets/bg.png');
    groundImg = loadImage('assets/ground.png');
    birdImg = loadImage('assets/bird.png');
    pipeUpImg = loadImage('assets/pipeup.png');
    pipeDownImg = loadImage('assets/pipedown.png');
}

function setup() {
    createCanvas(1000, 1320);
    for (let i = 0; i < TOTALPOP; i++) {
        birds[i] = new Bird();
    }
    ground = new Ground();
}

function draw() {
    for (let n = 0; n < gameSpeed; n++) {
        // create new pipes
        if (timer === 100) {
            obstacles.push(new Pipes());
            timer = 0;
        }
        timer++;

        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].update();
            for (let j = birds.length - 1; j >= 0; j--) {
                if (obstacles[i].collided(birds[j])) {
                    savedBirds.push(birds.splice(j, 1)[0]);
                }
            }
    
            if (obstacles[i].offScreen()) {
                obstacles.splice(i, 1);
            }
        }

        // update ground
        ground.update();

        // updates birds
        for (let i = 0; i < birds.length; i++) {
            hasPassedPipe = false;
            for (let j = 0; j < obstacles.length; j++) {
                if (obstacles[j].birdPassed(birds[i])) {
                    if (hasPassedPipe === false) {
                        score++;
                        hasPassedPipe = true;
                    }
                }
            }
            birds[i].update();
            birds[i].think(obstacles);
            if (birds[i].checkCollisions()) {
                savedBirds.push(birds.splice(i, 1)[0]);
            }

        }

        // starts next generation when current one dies
        if (birds.length === 0) {
            timer = 0;
            score = 0;
            nextGeneration();
            gen++;
            obstacles = [];
            obstacles.push(new Pipes());
        }
    }

    // all drawing stuff
    image(bg, 0, 0, 1000, 1320);

    for (let bird of birds) {
        bird.show(birdImg);
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].show(pipeUpImg, pipeDownImg);
    }

    ground.show(groundImg);

    fill(255);
    textSize(80);
    text(score, width/2, 160);
    textSize(50);
    text('Gen: '+gen, 40, 90);
    text('Speed: '+gameSpeed +'x', 40, 150);
    text('Alive: '+birds.length, 40, 210);
}

function keyPressed() {
    if (key === 'w') {
        gameSpeed *= 2;
    }
    if (key === 's') {
        gameSpeed /= 2;
    }
    if (key === 'q') {
        gameSpeed = 1;
    }
}
