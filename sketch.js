// noprotect

let lastPressed = 0;

let mouseDown = false;
let mouseWasReleased = false;

let rectX, rectY, endX, endY;

let playerStartX = -100; 
let playerStartY = -100;

let floors = [];
let hazards = [];
let endPoints = []; 

let output;

let mode = 0; 

let name = "Test Level";

function setup() {
  createCanvas(1600, 800);

  output = createWriter("output.txt");

  floors.push(new Rectangle(0, -100, 20, height + 200));
  floors.push(new Rectangle(width - 20, -100, 20, height + 200));
  floors.push(new Rectangle(-100, 0, width + 200, 20));
  floors.push(new Rectangle(-100, height - 20, width + 200, 20));
}

function draw() {
  background(220);

  for (let i in floors) {
    fill(COLORS.SOLID.BLACK);
    floors[i].draw();
  }
  
  for (let i in hazards){
    fill(COLORS.SOLID.RED)
    hazards[i].draw(); 
  }
  
  for (let i in endPoints){
    fill(COLORS.SOLID.GREEN);
    endPoints[i].draw(); 
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
    }
    
    mouseDown = false;
    mouseWasReleased = false;
  }

  if (mouseDown) {
    if(mode == MODE.FLOORS){
      drawRectToCursor(COLORS.DRAWING.BLACK);
    }else if(mode == MODE.HAZARDS){
      drawRectToCursor(COLORS.DRAWING.RED);
    }else if(mode == MODE.ENDPOINTS){
      drawRectToCursor(COLORS.DRAWING.GREEN);
    }
  }
  else {
    if(mode == MODE.FLOORS){
      drawPointAtCursor(COLORS.DRAWING.BLACK, 10);
    }else if(mode == MODE.HAZARDS){
      drawPointAtCursor(COLORS.DRAWING.RED, 10);
    }else if(mode == MODE.ENDPOINTS){
      drawPointAtCursor(COLORS.DRAWING.GREEN, 10);
    }
  }
  
  if(mode == MODE.PLAYER_START) {
    drawPointAtCursor(COLORS.DRAWING.CYAN, 10);
  }
  
  fill(COLORS.SOLID.CYAN);
  circle(playerStartX, playerStartY, 20);
  
  fill(COLORS.TEXT.LIGHT);
  text("0: FLOOR MODE    1: HAZARD MODE    2: ENDPOINT MODE    3: STARTPOINT MODE   4: DELETE MODE    DEL: UNDO SHAPE    ENTER: SAVE TO FILE", 100, 15)
  
  if(mode == MODE.FLOORS){
    fill(COLORS.TEXT.LIGHT);
    text("NOW DRAWING: FLOORS", width - 250, 15);
  }else if(mode == MODE.HAZARDS){
    
    fill(COLORS.SOLID.RED);
    text("NOW DRAWING: HAZARDS", width - 250, 15);
  }else if(mode == MODE.ENDPOINTS){
    
    fill(COLORS.SOLID.GREEN);
    text("NOW DRAWING: ENDPOINTS", width - 250, 15);
  }else if(mode == MODE.PLAYER_START){
    
    fill(COLORS.SOLID.CYAN);
    text("NOW DRAWING: STARTPOINT", width - 250, 15);
  }else if(mode == MODE.DELETE){
    text("CLICK TO DELETE", width - 250, 15);
    checkMouseIntersect(floors);
    checkMouseIntersect(hazards);
    checkMouseIntersect(endPoints);
  }
  
  
  if (DEBUG_MODE) drawGrid();
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
  let w = endX - rectX;
  let h = endY - rectY;

  a.push(new Rectangle(snap(rectX), snap(rectY), snap(w), snap(h)));
}

function snap(point) {
  let delta = point % GRID_SPACING;
  return delta > GRID_SPACING/2 ? point + (GRID_SPACING - delta) : point - delta;
}

function drawGrid() {
  for (let i = 0; i < width; i += GRID_SPACING) {
    for (let j = 0; j < height; j += GRID_SPACING) {
      fill(COLORS.DRAWING.BLACK);
      circle(i, j, 1);
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

function checkMouseIntersect(objectList){

  for(let i in objectList){

    if(mouseX > objectList[i].x && mouseX < objectList[i].x + objectList[i].w &&
       mouseY > objectList[i].y && mouseY < objectList[i].y + objectList[i].h &&
       mouseIsPressed){
        objectList.splice(i, 1);

       }



  }


}
