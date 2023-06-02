// noprotect

const WIDTH = 1600;
const HEIGHT = 1000;  

let mouseDown = false;
let mouseWasReleased = false;

let rectX, rectY, endX, endY;

let playerStart;

let gameObjects = [];

let currentColor = COLORS.SOLID.BLACK;

let mode = MODE.FLOORS; 

let name = "Test Level";

let gridBuffer;

function setup() {

  if (DEBUG_MODE) {
    gridBuffer = createGraphics(WIDTH, HEIGHT);
    preMakeGrid(gridBuffer);
  }

  createCanvas(WIDTH, HEIGHT);

  createBoundingWalls();

  playerStart = new StartPoint(50, HEIGHT-50, 20, COLORS.SOLID.CYAN);
}

function draw() {
  background(220);

  for (let object of gameObjects) {
    object.draw();
  }

  if (mouseWasReleased) {
    if(mode == MODE.FLOORS){
      addFloor();
    }else if(mode == MODE.HAZARDS){
      addHazard();
    }else if(mode == MODE.ENDPOINTS){
      addEndPoint();
    }else if(mode == MODE.PLAYER_START){
      playerStart.x = snap(mouseX);
      playerStart.y = snap(mouseY);
    }else if(mode == MODE.DELETE){
      checkMouseIntersect(gameObjects);
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
  
  playerStart.draw();
  
  if (DEBUG_MODE && gridBuffer) image(gridBuffer, 0, 0, WIDTH, HEIGHT);
  

  textSize(12);
  fill(COLORS.TEXT.LIGHT);
  text("0: FLOOR MODE    1: HAZARD MODE    2: ENDPOINT MODE    3: STARTPOINT MODE   4: DELETE MODE    DEL: UNDO SHAPE    ENTER: SAVE TO FILE", 100, 15)

  outputMenuElements(); 

}

function createBoundingWalls() {
  addRectToLevel(new Rectangle(0, -100, 20, HEIGHT + 100, COLORS.SOLID.BLACK, "Left Wall"));
  addRectToLevel(new Rectangle(WIDTH - 20, -100, 20, HEIGHT + 100, COLORS.SOLID.BLACK, "Right Wall"));
  addRectToLevel(new Rectangle(-100, 0, WIDTH + 200, 20, COLORS.SOLID.BLACK, "Ceiling"));
  addRectToLevel(new Rectangle(-100, HEIGHT - 20, WIDTH + 200, 20, COLORS.SOLID.BLACK, "Floor"));
}

function outputMenuElements() {
  
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
}


function keyPressed() {
  if (keyCode === DELETE) {
    removeShapeFromDomList(gameObjects[gameObjects.length-1].id);
  } else if (keyCode == ENTER) {
    writeToFile();
  } else if (key == '0') {
    mode = MODE.FLOORS;
  } else if (key == '1') {
    mode = MODE.HAZARDS;
  } else if (key == '2') {
    mode = MODE.ENDPOINTS;
  } else if (key == '3') {
    mode = MODE.PLAYER_START;
  } else if (key == '4') {
    mode = MODE.DELETE;
  }
}

function drawPointAtCursor(color, size) {
  fill(color)
  circle(snap(mouseX), snap(mouseY), size);
}

function drawRectToCursor(color) {
  let w = mouseX - rectX;
  let h = mouseY - rectY;

  fill(color);

  rect(snap(rectX), snap(rectY), snap(w), snap(h));

  if (mode === MODE.DELETE) {
    return;
  }

  textSize(20);
  textFont('Georgia')
  fill("purple")

  if(mouseY > rectY){
    text(abs(snap(w)), rectX + (w / 2) - 20, rectY + h + GRID_SPACING + 30);
  }else{
    text(abs(snap(w)), rectX + (w / 2) - 20, mouseY - GRID_SPACING - 30);
  }

  if(mouseX > rectX){
    text(abs(snap(h)), rectX + (w) + 30, rectY + h / 2);
  }else{
    text(abs(snap(h)), mouseX - 50, rectY + h / 2);
  }  
}

function shouldDrawRect() {
  let tempRectX = rectX; 
  let tempRectY = rectY; 
  let w = endX - rectX; 
  let h = endY - rectY; 

  if (rectX > endX) {
    rectX = endX; 
    endX = tempRectX;
  }

  if (rectY > endY) {
    rectY = endY; 
    endY = tempRectY;
  }

  if (abs(w) >= 6 && abs(h) >= 6 &&
      rectX >= 0 && rectX <= WIDTH &&
      rectY > 0 && rectY < HEIGHT &&
      endX >= 0 && endX <= WIDTH &&
      endY >= 0 && endY <= HEIGHT) {
    return true;
  }

  return false;
}

function addFloor() {
  if (!shouldDrawRect()) { return; }
  let w = endX - rectX; 
  let h = endY - rectY; 
  addRectToLevel(new Rectangle(snap(rectX), snap(rectY), snap(w), snap(h), currentColor, `Shape ${gameObjects.length}`));
}

function addHazard() {
  if (!shouldDrawRect()) { return; }
  let w = endX - rectX; 
  let h = endY - rectY; 
  addRectToLevel(new Hazard(snap(rectX), snap(rectY), snap(w), snap(h), currentColor, `Shape ${gameObjects.length}`));
}

function addEndPoint() {
  if (!shouldDrawRect()) { return; }
  let w = endX - rectX; 
  let h = endY - rectY; 
  addRectToLevel(new EndPoint(snap(rectX), snap(rectY), snap(w), snap(h), currentColor, `Shape ${gameObjects.length}`));
}

function addRectToLevel(rect) {
  gameObjects.push(rect);
  addShapeToDomList(rect);
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


    if((topSide && rightSide) || (topSide && leftSide) || (bottomSide && rightSide) || (bottomSide && leftSide)) {
        removeShapeFromDomList(objs[i].id);
    }
  }
}
