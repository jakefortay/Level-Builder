class Rectangle {

  constructor(x, y, w, h, c, tag){

    this.x = x;
    this.y = y;
    this.w = w; 
    this.h = h; 
    this.c = c == null ? COLORS.SOLID.BLACK : c;
    this.id = crypto.randomUUID();
    this.tag = tag;
  }
  
  draw(){

    fill(this.c);

    rect(this.x, this.y, this.w, this.h);
  }
  
  
  
}