var monster, monster1Image, monster2Image, monster3Image;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,monsterGroup,laserGroup;
var explosionSound,laserSound,explosionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("space.png");
  monster1Image= loadImage("Monster1.png");
  monster2Image= loadImage("Monster2.png");
  monster3Image= loadImage("Monster3.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  blastImage = loadImage("blast.png");
  explosionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;


  monsterGroup = new Group();
  laserGroup = new Group();
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1000) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(monsterGroup.isTouching(p2) || monsterGroup.isTouching(p1)) {
      monsterGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(monsterGroup.isTouching(laserGroup)) {
      monsterGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    monsters();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(monsterGroup.isTouching(endline)) {
      monsterGroup.destroyEach();
      gameState = end;
    }
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(30);
    text("GAME OVER !",canvas.width/2-400,canvas.height/2);
    text("The Monsters have infected the residents of the Earth",canvas.width/2-400,canvas.height/2+100);
    text("Your final score : "+score,canvas.width/2-400,canvas.height/2+200);

    
  }

  if(score == 50){
    gameState = end;

    background(255);
    stroke("black");
    fill("black");
    textSize(40);
    text("You protected your planet from the monsters.",canvas.width/2-350,canvas.height/2);
    text("You Won !!!",canvas.width/2-70,canvas.height/2+60);

  }

  if(gameState === instruction) {
    stroke("gold");
    fill("gold");
    textFont("trebuchetMS")
    textSize(40);
    text("------MONSTER SHOOTERS------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+170);
    stroke(255);
    fill(255);
    textSize(25);
    textFont("Helvetica");
    text(" Year 2021.....",canvas.width/2-300,canvas.height/2-250);
    text(" New strain of Monsters are attacking the Earth and its residents.",canvas.width/2-300, canvas.height/2 - 210);
    text(" You are a frontline worker and fighter.",canvas.width/2-300,canvas.height/2-170);
    text(" Help and save the Earth and its residents.",canvas.width/2-300,canvas.height/2-130);
    text(" Press 's' to start game.",canvas.width/2-300,canvas.height/2+50);
    text(" Use right and left arrow keys to move.",canvas.width/2-300,canvas.height/2-50);
    text(" Press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text(" Shoot 50 monsters to protect the Earth and its residents.",canvas.width/2-300,canvas.height-350);
    
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function  monsters() {
  if(frameCount % 60 === 0) {
  
    var  monster = createSprite(Math.round(random(50,1000)),-20);
    monster.velocityY = (6 + score/10);
    monster.lifetime = 200;
    monster.scale = random(0.3,0.5);
    // monster.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: monster.addImage(monster1Image);
              monster.setCollider("circle",-80,10,160);
              break;
      case 2: monster.addImage(monster2Image);
              monster.setCollider("circle",50,0,150);
              break;
      case 3: monster.addImage(monster3Image);
              monster.setCollider("circle",0,0,170);
              default: break;
    }
    
    //console.log(monster.x);
    monsterGroup.add(monster);
  }
}