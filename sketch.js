var PLAY = 1;
var END = 0;
var gameState = PLAY;

var thiefImg  ,  cone , box , backGroundImg ;
var score = 0;
var gameover , restart ;

function preload(){
  backGroundImg = loadImage("roadImg.jpg");
  thiefImg = loadImage("man.png");
  coneImg = loadImage("cone2.png");
  boxImg = loadImage("Box1.png");
  gameoverImg = loadImage("GameOver.png");
  restartImg = loadImage("restart.jpg");
 
}

function setup() {
  createCanvas(400,600);
  bg = createSprite(200,300,400,600);
  bg.addImage(backGroundImg);
  bg.scale = 1.3;

  thief = createSprite(200, 500, 0, 0);
  thief.addImage(thiefImg);
  thief.scale = 0.1;

  gameover = createSprite(300,270,10,50);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.4;
  gameover.visible = false;

  restart = createSprite(300,250,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.3;


  coneGroups = createGroup();
  boxGroups = createGroup();

  bg.velocityY = 1.5;

}

function draw() {
  background(0); 

  

  if(gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
    thief.x = mouseX ;
   //bg.velocityY = 1.5;
  if(bg.y>300 ){
    bg.y = 270;
  }
   spawnCone();
  spawnBox();

   if(boxGroups.isTouching(thief)){
      score += 2 ;
      boxGroups.destroyEach();
    }
   
    if(coneGroups.isTouching(thief)){
      bg.velocityY = 0 ;
      boxGroups.setVelocityXEach(0);
      coneGroups.setVelocityXEach(0);
      coneGroups.destroyEach();
      boxGroups.destroyEach();
      gameover.visible = true;
      
      boxGroups.setLifetimeEach(-1);
      coneGroups.setLifetimeEach(-1);

     
      textSize(20);
      text("Score: "+ score,80,25);
     

      if(thief.isTouching(coneGroups)){
        gameState = END;
      }
    }

    else if (gameState === END) {
      gameover.visible = true;
      restart.visible = true;
      score += 0;
      bg.velocityY = 0;
      thief.velocityX = 0;

      if(mousePressedOver(restart)){
        restart();
      }
       }
    }
  }
       
 
  
  
 


function spawnCone(){
  if(frameCount % 160 === 0){
    cone = createSprite(0,-10,50,50);
    cone.x = Math.round(random(10,350));
    coneGroups.add(cone);
    cone.addImage(coneImg);
    cone.scale = 0.1;
    cone.velocityY = 2;
  }
}

function spawnBox(){
  if(frameCount % 160 === 0){
    box = createSprite(100,80,20,20);
    box.x = Math.round(random(50,400));
    boxGroups.add(box);
    box.addImage(boxImg);
    box.scale = 0.1;
    box.velocityY = 3;
  }
}