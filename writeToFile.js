function writeToFile() {
  
  output.write("{\n");
  output.write('  name: "' + name + '",\n');
  output.write('  playerStart: {x: ' + playerStartX + ", y: " + playerStartY + "},\n");
  output.write('  floors: {\n');
  output.write('    static: [\n');
  
  for (let i in floors) {
    let s =
      "      {x: " +
      floors[i].x +
      ", y: " +
      floors[i].y +
      ", w: " +
      floors[i].w +
      ", h: " +
      floors[i].h +
      "}";
    output.write(s);
    output.write(",\n");
  }
  
  output.write('    ],\n');
  output.write('    moving: [\n');
  output.write('    ],\n');
  
  output.write('  },\n');
  
  output.write('  hazards: {\n');
  output.write('    static: [\n');
  
  for (let i in hazards) {
    let s =
      "      {x: " +
      hazards[i].x +
      ", y: " +
      hazards[i].y +
      ", w: " +
      hazards[i].w +
      ", h: " +
      hazards[i].h +
      "}";
    output.write(s);
    output.write(",\n");
  }
  
  output.write('    ],\n');
  output.write('    moving: [\n');
  output.write('    ],\n');
  
  output.write('    guns: [\n');
  output.write('    ]\n');
  
  output.write('  },\n');
  
  output.write('  targets: [\n');
  
  for (let i in endPoints) {
    let s =
      "      {x: " +
      endPoints[i].x +
      ", y: " +
      endPoints[i].y +
      ", w: " +
      endPoints[i].w +
      ", h: " +
      endPoints[i].h +
      "}";
    output.write(s);
    output.write(",\n");
  }
  
  output.write('  ]\n');
  output.write('}');
  
  
  
  
  
  
  
  
  
  
  output.close();
}