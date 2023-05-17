
function printNums(){

    let s = ""; 
    let x = "";

    s += "Floors: <br>";

    for(let i in floors){
        s += i.toString() + ":&nbsp;&nbsp;&nbsp; X:" + floors[i].x.toString() + ":&nbsp;&nbsp;&nbsp; Y:" + floors[i].y.toString();
        s += ":&nbsp;&nbsp;&nbsp; W:" + floors[i].w.toString() + ":&nbsp;&nbsp;&nbsp; H:" + floors[i].h.toString() + "<br>";
    }   

    s += "<br>Hazards: <br>"

    for(let i in hazards){
        s += i.toString() + ":&nbsp;&nbsp;&nbsp; X:" + hazards[i].x.toString() + ":&nbsp;&nbsp;&nbsp; Y:" + hazards[i].y.toString() + "<br>";
    }

    return s; 

}