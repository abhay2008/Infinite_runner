var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var current_score;

var ground, bImg;
var train, tImg;
var triangle, triaImg;
var triangle_jumpImg;
var inGround;
var gameOver_sound;
var jump_sound;
var checkpoint_sound;

function preload() {
  tImg = loadImage("Train_Run.png");
  triaImg = loadAnimation("Triangle_Run.png");
  triangle_jumpImg = loadAnimation("triangle_jump.png");
  bImg = loadImage("background.jpg");

  gameOver_sound = loadSound("die.mp3");
  jump_sound = loadSound("jump.mp3");
  checkpoint_sound = loadSound("checkPoint.mp3");

}

function setup() {
  createCanvas(800, 700);

  ground = createSprite(-200, 200);
  ground.addImage(bImg);
  ground.scale = 0.5;
  ground.velocityX = -(7 + 7 * score / 50);

  inGround = createSprite(500, 530, 1000, 50);
  inGround.visible = false;

  trainsGroup = createGroup();

  triangle = createSprite(80, 450);
  triangle.addAnimation("running", triaImg);
  triangle.addAnimation("jumping", triangle_jumpImg);
  triangle.scale = 0.15;

  triangle.depth = trainsGroup.depth;
  triangle.depth = triangle.depth + 1;

  triangle.setCollider("circle", 0, 0, 300);

}

function draw() {
  background(255);

  console.log("this is " + gameState);

  fill("gold");
  strokeWeight(5);
  stroke("red");
  textSize(50);
  text("Score  :   " + score, 200, 650);

  if (gameState === PLAY) {
    score = score + 1;

    ground.visible = true;
    trainsGroup.visible = true;
    triangle.visible = true;

    if (ground.x < 150) {
      ground.x = ground.width / 4;
    }

    if (triangle.y > 450) {
      triangle.changeAnimation("running", triaImg);
    }

    if (keyDown("Space") && triangle.y > 450) {
      triangle.velocityY = -20;
      jump_sound.play();
      triangle.changeAnimation("jumping", triangle_jumpImg);
    }



    triangle.velocityY = triangle.velocityY + 0.9;

    triangle.collide(inGround);

    if (score > 0 && score % 200 === 0) {
      checkpoint_sound.play();
    }



    spawnTrains();

    if (trainsGroup.isTouching(triangle)) {
      gameState = END;
      gameOver_sound.play();
    }



  } else if (gameState === END) {
    background(0);

    ground.visible = false;
    trainsGroup.destroyEach();
    triangle.visible = false;

    triangle.collide(inGround);

    if (triangle.y > 450) {
      triangle.changeAnimation("running", triaImg);
    }

    trainsGroup.setVelocityXEach(0);

    fill("red");
    strokeWeight(16);
    stroke("cyan");
    textSize(100);
    text('GAME OVER!!', 50, 200);

    fill("purple");
    strokeWeight(10);
    stroke("lime");
    textSize(40);
    text("click on 'enter' key to play again", 100, 350);

    fill("gold");
    strokeWeight(5);
    stroke("red");
    textSize(50);
    text("Score  :   " + score, 200, 650);

    score = score + 0;


  }

  if (keyDown("ENTER")) {
    reset();
    frameCount = 0;
    score = 0;
  }
  drawSprites();
}

function spawnTrains() {
  if (frameCount % 100 === 0) {
    train = createSprite(800, 470);
    train.addImage(tImg);
    train.scale = 0.1;
    train.velocityX = -(6 + 3 * score / 100);
    train.lifetime = 300;

    train.setCollider("rectangle", 0, 0, 700, 750);

    trainsGroup.add(train);
  }


}

function reset() {
  gameState = PLAY;

}
