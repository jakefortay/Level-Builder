class GameObject {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c == null ? COLORS.SOLID.BLACK : c;
    this.id = crypto.randomUUID();
  }
}

class Rectangle extends GameObject {

  constructor(x, y, w, h, c, tag, type) {
    super(x, y, c);
    this.w = w; 
    this.h = h; 
    this.tag = tag;
  }
  
  draw() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }

  getJson() {
    return `{x: ${this.x}, y: ${this.y}, w: ${this.w}, h: ${this.h}, c: ${this.c}}`;
  }
}

class movingHazard extends GameObject {

  constructor(x, y, w, h, dir, l1, l2, spd, c, tag, type){
      super(x, y, c);
      this.w = w;
      this.h = h; 
      this.dir = dir; 
      this.l1 = l1; 
      this.l2 = l2; 
      this.spd = spd; 
      this.tag = tag + " (M) "; 
  }

  draw() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    textSize(12);
    fill(COLORS.TEXT.LIGHT);
    text("MH", this.x + (this.w / 2) - 5, (this.y + (this.h / 2)));
  }

  getJson() {
    return `{x: ${this.x}, y: ${this.y}, w: ${this.w}, h: ${this.h}, dir: ${this.dir}, l1: ${this.l1}, l2: ${this.l2}, spd: ${this.spd} c: ${this.c}}`;
  }

}

class Hazard extends Rectangle {
  draw() {
    super.draw();
    textSize(12);
    fill(COLORS.TEXT.LIGHT);
    text("H", this.x + (this.w / 2) - 5, (this.y + (this.h / 2)));
  }
}



class EndPoint extends Rectangle {
  draw() {
    super.draw();
    textSize(12);
    fill(COLORS.TEXT.LIGHT);
    text("E", this.x + (this.w / 2) - 5, (this.y + (this.h / 2)));
  }
}

class StartPoint extends GameObject {
  constructor(x, y, d, c) {
    super(x, y, c);
    this.d = d;
  }
  
  draw() {
    fill(this.c);
    circle(this.x, this.y, this.d);
  }

  getJson() {
    return `{x: ${this.x}, y: ${this.y}}`;
  }
}