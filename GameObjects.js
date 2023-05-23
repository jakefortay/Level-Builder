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