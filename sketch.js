var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkeyrunning;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup,obstacleGroup;
var score=0
var survivalTime = 0;
var invisibleGround;
function preload(){
  
  monkey_stuck = loadAnimation("sprite_0.png");
  monkeyrunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(500, 400);
  
  //for making mokey and also to add functions to it
  monkey = createSprite(80,315,0,0);
  monkey.addAnimation("moving",monkeyrunning);
  monkey.addAnimation("stucked",monkey_stuck);
  monkey.scale=0.1;
  console.log(monkey.y);
  //for making and adding functions to ground
  ground = createSprite(250,350,490,10);
  ground = velocityx = -4;
  ground.x = ground.width/2;
  //for making invisible ground
   invisibleGround = createSprite(400,350,900,10);
   invisibleGround.visible = false;
  //for declaring group  
  obstacleGroup = new Group();
  bananaGroup = new Group();

   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
   
  
}


function draw() {
background(180);
  
  if(gameState === PLAY){
    //for making monkey looks on ground  
    monkey.collide(invisibleGround);
    //for making monkey jump
    if(keyDown("space") && monkey.y >= 310 ){
      monkey.velocityY = -15;
    }
    //to make gravity for monkey
     monkey.velocityY = monkey.velocityY + 0.8;
    stroke("red");
    textSize(20);
    fill("red");
    text("score: "+score,200,50);
    
    stroke("white");
    textSize(20);
    fill("black");
    SurvivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time:"+ SurvivalTime,200,80);
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score+1;
    }
     //
     if(monkey.isTouching(obstacleGroup)){
      gameState = END;  
    }
    
  }
  else if (gameState === END){
    
    monkey.velocityY = 0;
    //change the monkey animation
      monkey.changeAnimation("stucked", monkey_stuck);
    //showing score
    stroke("red");
    textSize(20);
    fill("red");
    text("score: "+score,200,50);
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);    
    
  }
  
  spawnObstacles();
  spawnbanana();
  
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 160 === 0){
   var obstacle = createSprite(500,315,450,450);
   obstacle.velocityX = -6
   obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
   
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
       case 2: obstacle.addImage(obstacleImage);
              break;
        default : break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1 + 0.06 + 0.001;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
   obstacleGroup.add(obstacle); 
   
 }
}

function spawnbanana(){
 if (frameCount % 152 === 0){
   var banana = createSprite(450,180,10,40);
   banana.velocityX = -5;
   
   
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: banana.addImage(bananaImage);
              break;
       case 2: banana.addImage(bananaImage);
              break;
        default : break;
    }
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.09;
    banana.lifetime = 300;
   
   //add each obstacle to the group
   bananaGroup.add(banana); 
   
 }
}





