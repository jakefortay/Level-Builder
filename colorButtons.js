class colorButtons {

    constructor(x, y, color){
        this.color = color;
        this.x = x;
        this.y = y; 
        this.size = 20; 
    }


    draw(){
        fill(this.color);
        square(this.x, this.y, this.size);
    }


}