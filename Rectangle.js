class Rectangle {

  constructor(x, y, w, h, c){

    this.x = x;
    this.y = y;
    this.w = w; 
    this.h = h; 
    this.c = c; 
  
  }
  
  draw(){
    if(this.c == null){
      this.c = "black";
    }

    fill(this.c);

    rect(this.x, this.y, this.w, this.h);
  }
  
  
  
}