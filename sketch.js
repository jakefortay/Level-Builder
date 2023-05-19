// noprotect

const WIDTH = 1600;
const HEIGHT = 1000;  

let palletWidth; 

let mouseDown = false;
let mouseWasReleased = false;

let rectX, rectY, endX, endY;

let playerStartX = -100; 
let playerStartY = -100;

let floors = [];
let hazards = [];
let endPoints = []; 

let colorPallete = []; 
let currentColor = COLORS.SOLID.BLACK; 

let output;

let mode = 0; 

let name = "Test Level";

let runningWidth = 40; 
let runningHeight = HEIGHT + 50; 

let infoDiv; 

let gridBuffer;

function setup() {

  palletWidth = floor(WIDTH / 100) - 2;

  if (DEBUG_MODE) {
    gridBuffer = createGraphics(WIDTH, HEIGHT);
    preMakeGrid(gridBuffer);
  }

  createCanvas(WIDTH, HEIGHT + 400);

  output = createWriter("output.txt");

  floors.push(new Rectangle(0, -100, 20, HEIGHT + 125));
  floors.push(new Rectangle(WIDTH - 20, -100, 20, HEIGHT + 125));
  floors.push(new Rectangle(-100, 0, WIDTH + 200, 20));
  floors.push(new Rectangle(-100, HEIGHT - 20, WIDTH + 200, 20));

  colorPicker = createColorPicker(COLORS.SOLID.RED);
  colorPicker.position(WIDTH * 3/4 + 300, HEIGHT + 45);

  infoDiv = createDiv('Hello');
  infoDiv.position(1700, 100);

  setInterval(printNums, 2000);

}5

function draw() {
  background(220);


  let s = printNums(); 

  infoDiv.html(s);

  for (let i in floors) {
    floors[i].draw();
  }
  
  for (let i in hazards){
    hazards[i].draw(); 
    fill(COLORS.TEXT.LIGHT);
    text("H", hazards[i].x + (hazards[i].w / 2) - 5, (hazards[i].y + (hazards[i].h / 2)))
  }
  
  for (let i in endPoints){
    endPoints[i].draw();  
    fill(COLORS.TEXT.LIGHT);
    text("E", endPoints[i].x + (endPoints[i].w / 2) - 5, (endPoints[i].y + (endPoints[i].h / 2)))
  }


  
  if (mouseWasReleased) {
    if(mode == MODE.FLOORS){
      addRect(floors);
    }else if(mode == MODE.HAZARDS){
      addRect(hazards);
    }else if(mode == MODE.ENDPOINTS){
      addRect(endPoints);
    }else if(mode == MODE.PLAYER_START){
      playerStartX = snap(mouseX);
      playerStartY = snap(mouseY); 
    }else if(mode == MODE.DELETE){
      checkMouseIntersect(floors);
      checkMouseIntersect(hazards);
      checkMouseIntersect(endPoints);
    }
    
    mouseDown = false;
    mouseWasReleased = false;
  }

  if (mouseDown) {
    if(mode == MODE.FLOORS || mode == MODE.HAZARDS || mode == MODE.ENDPOINTS){
      drawRectToCursor(currentColor);
    }else if(mode == MODE.DELETE){
      drawRectToCursor(COLORS.DRAWING.GRAY)
    }
  }
  else {
    if(mode == MODE.FLOORS || mode == MODE.HAZARDS || mode == MODE.ENDPOINTS){
      drawPointAtCursor(currentColor, 10);
    }else if(mode == MODE.DELETE){
      drawPointAtCursor(COLORS.DRAWING.GRAY, 10);
    }
  }
  
  if(mode == MODE.PLAYER_START) {
    drawPointAtCursor(COLORS.DRAWING.CYAN, 10);
  }
  
  fill(COLORS.SOLID.CYAN);
  circle(playerStartX, playerStartY, 20);
  
  if (DEBUG_MODE && gridBuffer) image(gridBuffer, 0, 0, WIDTH, HEIGHT);
  
  fill(COLORS.TEXT.LIGHT);
  text("0: FLOOR MODE    1: HAZARD MODE    2: ENDPOINT MODE    3: STARTPOINT MODE   4: DELETE MODE    5: SAVE COLOR    DEL: UNDO SHAPE    ENTER: SAVE TO FILE", 100, 15)

  outputMenuElements(); 

}

function outputMenuElements(){

  fill(COLORS.TEXT.LIGHT);
  rect(0, HEIGHT, WIDTH, 20);
  rect(0, HEIGHT + 380, WIDTH, 20);
  rect(0, HEIGHT, 20, 400);
  rect(WIDTH - 20, HEIGHT, 20, 400);

  fill(180);
  rect(30, HEIGHT + 40, palletWidth * 80 - 10, 310);

  textSize(32);
  textFont('Georgia');
  fill(COLORS.SOLID.BLACK);
  text("CURRENT COLOR", WIDTH * 3/4, HEIGHT + 70);
  fill(currentColor);
  rect(WIDTH * 3/4, HEIGHT + 100, 275, 30);

  fill(COLORS.SOLID.BLACK);
  text("CURRENT MODE", WIDTH * 3/4, HEIGHT + 200);
  
  if(mode == MODE.FLOORS){
    fill(COLORS.TEXT.LIGHT);
    text("FLOORS", WIDTH * 3/4, HEIGHT + 250);
  }else if(mode == MODE.HAZARDS){
    fill(COLORS.SOLID.RED);
    text("HAZARDS", WIDTH * 3/4, HEIGHT + 250);
  }else if(mode == MODE.ENDPOINTS){
    
    fill(COLORS.SOLID.GREEN);
    text("ENDPOINTS", WIDTH * 3/4, HEIGHT + 250);
  }else if(mode == MODE.PLAYER_START){
    fill(COLORS.SOLID.CYAN);
    text("STARTPOINT", WIDTH * 3/4, HEIGHT + 250);
  }else if(mode == MODE.DELETE){
    fill(COLORS.SOLID.BROWN);
    text("DELETE", WIDTH * 3/4, HEIGHT + 250);
  }

  for(let i in colorPallete){
    colorPallete[i].draw(); 
    if((mouseX > colorPallete[i].x && mouseX < colorPallete[i].x + colorPallete[i].size &&
       mouseY > colorPallete[i].y && mouseY < colorPallete[i].y + colorPallete[i].size) && 
       mouseIsPressed){
        currentColor = colorPallete[i].color; 

       }
  }


  textSize(12);

}


function keyPressed() {
  if (keyCode === DELETE) {
    if(mode == MODE.FLOORS && floors.length > 4){
      floors.pop();
    }else if(mode == MODE.HAZARDS){
      hazards.pop(); 
    }else if(mode == MODE.ENDPOINTS){
      endPoints.pop(); 
    }else if(mode == MODE.PLAYER_START){
      playerStartX = 0; 
      playerStartY = 0; 
    }
    
    
  } else if (keyCode == ENTER) {
    writeToFile();
  }else if(key == '0'){
    mode = MODE.FLOORS;
  }else if(key == '1'){
    mode = MODE.HAZARDS;
  }else if(key == '2'){
    mode = MODE.ENDPOINTS;
  }else if(key == '3'){
    mode = MODE.PLAYER_START;
  }else if(key == '4'){
    mode = MODE.DELETE;
  }else if(key == '5' && colorPallete.length < (palletWidth * 4)){
    if(colorPallete.length % palletWidth == 0 && colorPallete.length > 0){
      runningHeight += 80; 
      runningWidth = 40; 
    }
    colorPallete.push(new colorButtons(runningWidth, runningHeight, colorPicker.color()));
    runningWidth += 80; 
    print(runningWidth)
  }
}

function drawPointAtCursor(color, size) {
  fill(color)
  circle(mouseX, mouseY, size);
}

function drawRectToCursor(color) {
  let w = mouseX - rectX;
  let h = mouseY - rectY;
  fill(color);
  rect(snap(rectX), snap(rectY), snap(w), snap(h));
}

function addRect(a) {
  let tempRectX = rectX; 
  let tempRectY = rectY; 

  if(rectX > endX){
    rectX = endX; 
    endX = tempRectX;
  }

  if(rectY > endY){
    rectY = endY; 
    endY = tempRectY;
  }

  let w = endX - rectX; 
  let h = endY - rectY; 

  if(abs(w) >= 6 && abs(h) >= 6 && rectX >= 20 && rectX <= WIDTH - 20 && rectY > 20 && rectY < HEIGHT - 20){
    a.push(new Rectangle(snap(rectX), snap(rectY), snap(w), snap(h), currentColor));
  }


}

function snap(point) {
  let delta = point % GRID_SPACING;
  return delta > GRID_SPACING/2 ? point + (GRID_SPACING - delta) : point - delta;
}

function preMakeGrid(gridBuffer) {
  fill(COLORS.DRAWING.BLACK);
  for (let i = 0; i < WIDTH; i += GRID_SPACING) {
    for (let j = 0; j < HEIGHT; j += GRID_SPACING) {
      gridBuffer.circle(i, j, 1);
    }
  }
}

function mousePressed() {
  rectX = mouseX;
  rectY = mouseY;
  mouseDown = true;


}

function mouseReleased() {
  endX = mouseX;
  endY = mouseY;
  mouseWasReleased = true;

}

function checkMouseIntersect(objs){

  for(let i = objs.length - 1; i >= 0; i--){

    let tempRectX = rectX; 
    let tempRectY = rectY; 

    if(rectX > endX){
      rectX = endX; 
      endX = tempRectX;
    }

    if(rectY > endY){
      rectY = endY; 
      endY = tempRectY;
    }

    let w = endX - rectX; 
    let h = endY - rectY; 

  
    let leftSide = objs[i].x > rectX && objs[i].x < rectX + w; 
    let rightSide = objs[i].x + objs[i].w > rectX && objs[i].x + objs[i].w < rectX + w; 
    
    let topSide = objs[i].y > rectY && objs[i].y < rectY + h; 
    let bottomSide = objs[i].y + objs[i].h > rectY && objs[i].y + objs[i].h < rectY + h; 


    if((topSide && rightSide) || (topSide && leftSide) || (bottomSide && rightSide) || (bottomSide && leftSide)){
        objs.splice(i, 1);
       }
  }
}
