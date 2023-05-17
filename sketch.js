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

let colorPallete = []; 
let currentColor = "black"; 

let output;

let mode = 0; 

let name = "Test Level";

let runningWidth = 40; 
let infoDiv; 

function setup() {
  
  const WIDTH = 1600;
  const HEIGHT = 800;  

  createCanvas(WIDTH, HEIGHT + 400);

  output = createWriter("output.txt");

  floors.push(new Rectangle(0, -100, 20, height + 200));
  floors.push(new Rectangle(width - 20, -100, 20, height + 200));
  floors.push(new Rectangle(-100, 0, width + 200, 20));
  floors.push(new Rectangle(-100, height - 20, width + 200, 20));

  colorPicker = createColorPicker("red");
  colorPicker.position(width, 400);

  infoDiv = createDiv('Hello');
  infoDiv.position(1700, 100);

  setInterval(printNums, 2000);

}

function draw() {
  background(220);

  let s = printNums(); 

  infoDiv.html(s);

  for (let i in floors) {
    fill(COLORS.SOLID.BLACK);
    floors[i].draw();
  }
  
  for (let i in hazards){
    fill(COLORS.SOLID.RED)
    hazards[i].draw(); 
    fill("white");
    text("H", hazards[i].x + (hazards[i].w / 2) - 5, (hazards[i].y + (hazards[i].h / 2)))
  }
  
  for (let i in endPoints){
    fill(COLORS.SOLID.GREEN);
    endPoints[i].draw(); 
  }

  for(let i in colorPallete){
    colorPallete[i].draw(); 
    if((mouseX > colorPallete[i].x && mouseX < colorPallete[i].x + colorPallete[i].size &&
       mouseY > colorPallete[i].y && mouseY < colorPallete[i].y + colorPallete[i].size) && 
       mouseIsPressed){
        currentColor = colorPallete[i].color; 

       }


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
  text("0: FLOOR MODE    1: HAZARD MODE    2: ENDPOINT MODE    3: STARTPOINT MODE   4: DELETE MODE    5: SAVE COLOR    DEL: UNDO SHAPE    ENTER: SAVE TO FILE", 100, 15)
  
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


  fill("white");
  text("Current Color: ", width - 240, height - 5)
  fill(currentColor);
  rect(width - 150, height - 20, 60);

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
  }else if(key == '5'){
    colorPallete.push(new colorButtons(runningWidth, height - 20, colorPicker.color()));
    runningWidth += 60; 
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
  let w = endX - rectX;
  let h = endY - rectY;

  a.push(new Rectangle(snap(rectX), snap(rectY), snap(w), snap(h), currentColor));
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

  for(let i = objectList.length - 1; i >= 0; i--){

    if((mouseX > objectList[i].x && mouseX < objectList[i].x + objectList[i].w &&
       mouseY > objectList[i].y && mouseY < objectList[i].y + objectList[i].h) &&
       mouseIsPressed){
        objectList.splice(i, 1);
       }
  }
}
