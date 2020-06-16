let button0;
let button1;
let button2;
let button3;
let v;
let vg;
let dm;
let dmg;
let mn;
let mng;
let SCENE_W ;
let SCENE_H ;
let w=100;
let ndm;
let nv;
let song;
let scr=0;
let vl=2;
let acceleration;
let score=0;
let collisionCount = 0;
let rangfont;
let pixFont;
let regFont;
let vImag;
let manImag;
let s;
let sv;
let sd;
let slw;
let   stateChanged = false; // NEW


function preload(){
  song= loadSound('assets/coffin.mp3');
  pixFont = loadFont('assets/MetalMania-Regular.ttf'); 
  rangfont = loadFont('assets/Ranga-Bold.ttf');
  regFont = loadFont('assets/Piedra-Regular.ttf');
  vImag = loadImage("assets/v1.png");
  vscrimg=loadImage("assets/v6.png");
  manImag = loadImage("assets/man.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  SCENE_W = (w+w/2)*w;
  SCENE_H = (w+w/2)*w;
  textSize(40);
  textAlign(CENTER, CENTER);
// let fs = fullscreen();
//     fullscreen(!fs);
  scen();
  button0 = createButton(' click to start play ');
  button1 = createButton('Music');
  button2 = createButton(' click to restart ');
  button3 = createButton(' click to start newlevel ');

}
function draw() {
     dw();
}

function scen(){
  scrmn();
  scrdm();
  scrver();
}

function dw(){
  if(scr == 0){strscr();  }
  else if(scr == 1){
  clear();
   button0.remove();
   allscr();

  }
  else if(scr==2){
    camera.off();
    gameOver(); 
  }	
  else if(scr == 3){
       newlevel();
     }
}

function allscr(){
  mncamera();
  dmdraw();
  vdraw();
  noStroke();
  fill(0, 0, 0, 20);
  ellipse(mn.position.x, mn.position.y+90, 80, 30);
  drawSprite(mn);
          farm(-100,-100,SCENE_W+200, SCENE_H+200,20,'red');
  camera.off();

    vg.overlap(dmg, collectdm);
    mn.overlap(vg, collect);
    showScores(); 
    btn(button1, 400,40 , "30px", 'black', pixFont, changeBG );
         boox();
         farm(0,0,windowWidth, windowHeight,8,'rgb(0,255,0)');
    if ( ndm < nv || ndm-nv < 0 || ndm < w/2){
      scr=2;
      stateChanged = true; // NEW
    
    }
  if(ndm-nv > nv){
     clear();
     newlevel();
     }
}
 
// ------------------------------------------scrver
function strscr(){
  background(random(40,55),random(0,50),random(0,255));
  fill(255, 0,255);
  textFont(pixFont,width/20);
  image( vscrimg, width/2.5, height/12, width/6, width/6);
  fill(255, 255, 0);
  textFont(pixFont,width/9);
  text("NoViruses", width/2, height/4);
  fill(255, 205, 205);
  textFont(regFont, width/22);
  text("click to start and Press S", width/2, height/2.3);
  fill(255, 100, 205);
  textFont(rangfont,width/28.5);
  text("Looking for viruses and eliminate them by Disinfectants before they conquer the city", width/2, height-height/2.6);
  fill(50, 100, 205);
  textFont(rangfont,width/24);
  text("Win: when number of viruses less than number of heart ", width/2, height-height/3.5);
  textFont(rangfont,width/25);
  text("Game over: when  number of viruses  more than  number of homes or when heart > 0", width/2, height-height/6);
  if(keyIsPressed && key == 's'){ 
     scr=1;} 
  push();
    btn(button0, 0 ,0 ,"20px" , 'black', rangfont,changeScr);
  pop();  
}

  function gameOver() {
  button1.remove();
  vg.removeSprites();
  dmg.removeSprites();
  mn.remove();
  background(255, 33, 33);
  fill(0, 50, 50);
  textFont(pixFont, width/15);
  text("GAME OVER", width/2, height/2 - 50);

  fill(50, 100, 205);
  textFont(rangfont, width/22);
  text("Press R to restart", width/2, height/2+2*w); 
  
  if(stateChanged) {
    stateChanged = false;
    showForm();
  }

   if(keyIsPressed && key == 'r' ){
      reset();
   }  
    push();
    btn(button2, 0 ,0 ,"40px" , 'black', rangfont,reset);
    pop(); 
    if (song.isPlaying()) { 
    song.pause(); 
    } 
}

function newlevel() {
  button1.remove();
  mn.remove();
  dmg.removeSprites();
  vg.removeSprites();
  background(0, 100, 80);
  fill(255, 171, 171);
  textFont(pixFont, width/15);
  slw=w/20-3;
  text("newlevel : "+slw, width/2, height/2 - 50);

  fill(50, 0, 205);
  textFont(rangfont,width/20);
  text("Press x to continues", width/2, height/2 + w);
    push();
    btn(button3, 0 ,0 ,"40px" , 'black', rangfont,newlevel1);
    pop(); 
   if(keyIsPressed && key == 'x' ){
     newlevel1();     
     }

  if (song.isPlaying()) { 
    song.pause(); 
    } 
}


function scrver(){
  vg= new Group();
  nv=w;
  for(let i=0;i<nv;i++){
  
    v=createSprite(random(-windowWidth, SCENE_W+windowWidth), random(-windowHeight, SCENE_H+windowHeight));
   sv= v.addAnimation('normal', 'assets/v'+floor(random(1, 6))+'.png');
    v.scale = 0.5;
    v.mass=0.01;
    v.setCollider('circle', 0, 0, 80);
    vg.add(v); 
    v.setSpeed(random(0.1,0.5), random(0, 360));
   
  
  }
}
// -----------------------------------scrdom
function scrdm(){
 dmg = new Group();
  ndm=2*w;
 for (let i =0;i<ndm;i++){
  dm = createSprite(random(220, SCENE_W-220), random(220,  SCENE_H-220));
  sd= dm.addAnimation('normal',  'assets/dom'+floor(random(1, 2))+'.png');
   dm.mass=0.02;
  dmg.add(dm);
   }
}

// -----------------------------------scrman
function scrmn(){
mn =createSprite(400, 200, 50, 100);
  s= mn.addAnimation('floating', 'assets/s1.png', 'assets/s2.png' , 'assets/s3.png', 'assets/s4.png');
  // mn.mass=0.2;
  mn.setSpeed(5);

  s.offY=18;
 
}

// ------------------------------------draw
function mncamera(){
  background(220);
  mn.velocity.x = (camera.mouseX-mn.position.x)/5;
  mn.velocity.y = (camera.mouseY-mn.position.y)/5;

  if(mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 1;

  camera.position.x = mn.position.x;
  camera.position.y = mn.position.y;
// 
  if(mn.position.x < 0)
    mn.position.x = 0;
  if(mn.position.y < 0)
    mn.position.y = 0;
  if(mn.position.x > SCENE_W)
    mn.position.x = SCENE_W;
  if(mn.position.y > SCENE_H)
    mn.position.y = SCENE_H;   
}
  
// -----------------------------dmdraw
function dmdraw(){
 drawSprites(dmg);
}
// ----------------------------verdraw
function vdraw(){ 
          drawSprites(vg);
}

//   -------------------------------------
function callbackFunc() {
collisionCount= collisionCount + 1;
}
function collectdm(collector, collected)
{

  collector.animation.rewind();
  collected.remove();
      ndm -=1;

}
function collect(collector, collected)
{

  collector.animation.rewind();
  
  collected.remove();
      nv -=1;
}

// ----------------------------------------
function boox(){
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<-windowWidth) {
      s.position.x = 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if(s.position.x> windowWidth+SCENE_W) {
      s.position.x = windowWidth+SCENE_W-1;
      s.velocity.x = -abs(s.velocity.x);
    }

    if(s.position.y<-windowHeight) {
      s.position.y = 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if(s.position.y> windowHeight+SCENE_H) {
      s.position.y = windowHeight+SCENE_H-1;
      s.velocity.y = -abs(s.velocity.y);
    }
  }
}


function farm(a0,b0,a,b,strW,stCr) {
  push();
  strokeWeight(strW);
  stroke(stCr);
  noFill();
  rect(a0,b0,a, b);
  pop();
}


function reset(){
  document.location.reload(true);

}
function newlevel1(){
  
       w=w+20;
    button3.remove();
    button3 = createButton(' click to start newlevel ');
    button1 = createButton('Music');
    btn(button1, 400,40 , "30px", 'black', pixFont, changeBG );
    song.play();
  
        scen();
        scr=1;
 

}

function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function showScores() {
  textFont(regFont, 36);
  fill(255, 255, 200);
  image(vImag, 25, 43, 30, 30);
  text(nv, 95, 50);

  noStroke();
  fill(255, 110, 80);
  heart(160, 50, 20);
  text(ndm-nv, 210, 50);

  fill(255, 255, 200);
  image(manImag, 270, 43, 30, 30)
  text(ndm, 340, 50);
  
}
function changeBG() {
  if (song.isPlaying()) { 
    song.pause(); 
    } else  {
      song.play();
  }
}

function changeScr() {
  
  if(scr == 0){
    song.play();
	scr=1;
	}
}

function btn(buttond, PX ,PY, SF, Cr,Ff, f){

  buttond.position(PX, PY);
  buttond.style("font-family", Ff);
  buttond.style("color", Cr);
  buttond.style("font-size", SF);
  buttond.mousePressed(f);
  
}
