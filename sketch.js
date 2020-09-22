var PLAY;
var END;
var gameState = PLAY;
var ground;
var fox, fox_running;
var grape, grapesGroup, grape1, grape2, grape3, grape4;
var tree, treesGroup, tree1, tree2, tree3, tree4;
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score = 0;


function preload() {
  fox_running = loadAnimation("fox_running1.png", "fox_running2.png");
  tree1 = loadImage("tree1.png");
  tree2 = loadImage("tree2.png");
  tree3 = loadImage("tree3.png");
  tree4 = loadImage("tree4.png");

  grape1 = loadImage("grape1.png");
  grape2 = loadImage("grape2.png");
  grape3 = loadImage("grape3.png");
  grape4 = loadImage("grape4.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
}

function setup() {
  createCanvas(800, 600);

  treesGroup = createGroup();
  grapesGroup = createGroup();

  Fox();

  ground = createSprite(100, 550, 10000, 20);

}

function draw() {
  background(27);

  if (gameState === PLAY) {
    ground.velocityX = -4;

    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }


    console.log("helooo");



  }



  spawnTrees();
  spawnGrapes();
  drawSprites();
}

function spawnTrees() {
  if (frameCount % 250 === 0) {
    tree = createSprite(0, 490);
    tree.velocityX = 4;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        tree.addImage(tree1);
        break;

      case 2:
        tree.addImage(tree2);
        break;

      case 3:
        tree.addImage(tree3);
        break;

      case 4:
        tree.addImage(tree4);
        break;
      default:
        break;
    }

    tree.scale = 0.1;
    tree.lifetime = 500;

    fox.depth = tree.depth;
    tree.depth = tree.depth + 1;

    treesGroup.add(tree);
  }
}

function Fox() {
  fox = createSprite(700, 480);
  fox.addAnimation("running", fox_running);
  fox.scale = 0.18;

}

function spawnGrapes() {
  if (frameCount % 150 === 0) {
    grape = createSprite(0, 320);
    grape.velocityX = 4;
    var rand = Math.round(random(1, 4));

    switch (rand) {
      case 1:
        grape.addImage(grape1);
        break;

      case 2:
        grape.addImage(grape2);
        break;

      case 3:
        grape.addImage(grape3);
        break;

      case 4:
        grape.addImage(grape4);
        break;
      default:
        break;
    }

    grape.scale = 0.05;
    grape.lifetime = 500;

    grapesGroup.add(grape);
  }

}

function spawnObastacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite()


  }


}