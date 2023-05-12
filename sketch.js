// noprotect

let lastPressed = 0;

let mouseWasPressed = false;
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
    fill("black");
    floors[i].draw();
  }
  
  for (let i in hazards){
    fill("red")
    hazards[i].draw(); 
  }
  
  for (let i in endPoints){
    fill("green");
    endPoints[i].draw(); 
  }
  

  if (mouseWasPressed && mouseWasReleased) {
    if(mode == 0){
      addRect(floors);
    }else if(mode == 1){
      addRect(hazards);
    }else if(mode == 2){
      addRect(endPoints);
    }else if(mode == 3){
      playerStartX = mouseX;
      playerStartY = mouseY; 
    }
    
    mouseWasPressed = false;
    mouseWasReleased = false;
  }
  
  fill("cyan");
  circle(playerStartX, playerStartY, 20);
  
  fill("white");
  text("0: FLOOR MODE    1: HAZARD MODE    2: ENDPOINT MODE    3: STARTPOINT MODE    DEL: UNDO SHAPE    ENTER: SAVE TO FILE", 100, 15)
  
  if(mode == 0){
    fill("white");
    text("NOW DRAWING: FLOORS", width - 250, 15);
  }else if(mode == 1){
    
    fill("red");
    text("NOW DRAWING: HAZARDS", width - 250, 15);
  }else if(mode == 2){
    
    fill("green");
    text("NOW DRAWING: ENDPOINTS", width - 250, 15);
  }else if(mode == 3){
    
    fill("cyan");
    text("NOW DRAWING: STARTPOINT", width - 250, 15);
  }
  
  
  
}

function keyPressed() {
  if (keyCode === DELETE) {
    if(mode == 0 && floors.length > 4){
      floors.pop();
    }else if(mode == 1){
      hazards.pop(); 
    }else if(mode == 2){
      endPoints.pop(); 
    }else if(mode == 3){
      playerStartX = 0; 
      playerStartY = 0; 
    }
    
    
  } else if (keyCode == ENTER) {
    writeToFile();
  }else if(key == '0'){
    mode = 0; 
  }else if(key == '1'){
    mode = 1; 
  }else if(key == '2'){
    mode = 2; 
  }else if(key == '3'){
    mode = 3; 
  }
}

function addRect(a) {
  let w = endX - rectX;
  let h = endY - rectY;

  a.push(new Rectangle(rectX, rectY, w, h));
}



function mousePressed() {
  rectX = mouseX;
  rectY = mouseY;
  mouseWasPressed = true;
}

function mouseReleased() {
  endX = mouseX;
  endY = mouseY;
  mouseWasReleased = true;
}
