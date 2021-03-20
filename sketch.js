var bacground,bg;
var fr_img1, fr_img2, fr_img3, fr_img4;
var fruit;
var al_img1, al_img2;
var sword_img, sword;
var fruit1_group, fruit2_group, fruit3_group, fruit4_group;
var score=0;
var alien1_group, alien2_group;
var gameState="start";
var fruit_sound;
var bomb_sound;
var gameover_img, gameover_sound;
var gameover;

function preload(){

bg=loadImage("come on.jpg");
sword_img=loadImage("sword.png");
  
//fruit images
fr_img1=loadImage("fruit1.png");
fr_img2=loadImage("fruit2.png");
fr_img3=loadImage("fruit3.png");
fr_img4=loadImage("fruit4.png");

//alien images
al_img1=loadImage("alien1.png");
al_img2=loadImage("alien2.png");
  
gameover_img=loadImage("gameover.png");
  
fruit_sound=loadSound("fruitSound.mp3");
bomb_sound=loadSound("bomb_sound.mp3");
gameover_sound=loadSound("gameover.mp3");
}

function setup(){
createCanvas(700,500);

//creating background
bacground = createSprite(350,250);
bacground.addImage(bg);
bacground.scale=0.4;
  
//sword
sword=createSprite(350,350);
sword.addImage(sword_img);
sword.scale=0.62;

//fruit groups
fruit1_group=new Group();
fruit2_group=new Group();  
fruit3_group=new Group();  
fruit4_group=new Group();  

//alien groups
alien1_group=new Group();
alien2_group=new Group();
  
//gamover
gameover=createSprite(350,250);
gameover.addImage(gameover_img);
gameover.scale=1.3;
  
}

function draw(){
background("black");

drawSprites();
  
if(gameState=="start"){

gameover.visible=false;
  
fill("white");
textSize(26);
text("Press SPACE to start the game",170,250);
  
//sword position
sword.x=350;
sword.y=350;
  
if(keyDown("space")){
gameState="play";
}
}
  
if(gameState=="play"){
  
gameover.visible=false;
  
//fruits
fruit1();
fruit2();
fruit3();  
fruit4();  
  
//aliens
alien1();
alien2();

//sword movement
sword.y=World.mouseY;
sword.x=World.mouseX;

//using sword
cutting_fruits();
cutting_aliens();

fill("white");
textSize(26);
text("Score:"+score,100,100);
}

if(gameState=="over"){

gameover.visible=true;
  
//sword position
sword.x=530;
sword.y=250;

if(keyDown("R")){
gameState="start";
score=0;
}
  
//text
fill("yellow");
textSize(26);
text("Press R to restart",255,420);  
}
  
}

function fruit1(){

var rand=Math.round(random(10,690));
  
if(frameCount%47==0){
fruit=createSprite(rand,550);
fruit.addImage(fr_img1);
fruit.velocityY=-12;
fruit.scale=0.3;
fruit1_group.add(fruit);
}
}

function fruit2(){

var rand=Math.round(random(10,690));
  
if(frameCount%55==0){
fruit=createSprite(rand,550);
fruit.addImage(fr_img2);
fruit.velocityY=-8;
fruit.scale=0.3;
fruit2_group.add(fruit);
}
}

function fruit3(){

var rand=Math.round(random(10,690));
  
if(frameCount%50==0){
fruit=createSprite(rand,550);
fruit.addImage(fr_img3);
fruit.velocityY=-10;
fruit.scale=0.3;
fruit3_group.add(fruit);
}
}

function fruit4(){

var rand=Math.round(random(10,690));
  
if(frameCount%65==0){
fruit=createSprite(rand,550);
fruit.addImage(fr_img4);
fruit.velocityY=-7;
fruit.scale=0.2;
fruit4_group.add(fruit);
}
}

function alien1(){

var rand=Math.round(random(10,690));
  
if(frameCount%120==0){
alien=createSprite(rand,550);
alien.addImage(al_img1);
alien.velocityY=-12;
alien1_group.add(alien);
if(alien.y<-1){
alien.destroy();
}
}
}

function alien2(){

var rand=Math.round(random(10,690));
  
if(frameCount%160==0){
alien=createSprite(rand,550);
alien.addImage(al_img2);
alien.velocityY=-16;
alien2_group.add(alien);
if(alien.y<-1){
alien.destroy();
}
} 
}

function cutting_fruits(){

if(sword.isTouching(fruit1_group)){
fruit1_group.destroyEach();
score=score+10;
fruit_sound.play();
}  
  
if(sword.isTouching(fruit2_group)){
fruit2_group.destroyEach();
score=score+10;
fruit_sound.play();
}  
  
if(sword.isTouching(fruit3_group)){
fruit3_group.destroyEach();
score=score+10;
fruit_sound.play();
}  
  
if(sword.isTouching(fruit4_group)){
fruit4_group.destroyEach();
score=score+10;
fruit_sound.play();
}    
}

function cutting_aliens(){

if(sword.isTouching(alien1_group)){
alien1_group.destroyEach();
score=score-200;
bomb_sound.play();
}

if(sword.isTouching(alien2_group)){
alien2_group.destroyEach();
gameover_sound.play();
fruit1_group.destroyEach();
fruit2_group.destroyEach();  
fruit3_group.destroyEach();  
fruit4_group.destroyEach();  
gameState="over";
}
}