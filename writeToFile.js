function writeToFile() {

  const output = createWriter("output.txt");

  output.print("{");
  output.print(`\tname: "${name}",`);
  output.print(`\taltSize: {width: ${WIDTH}, height: ${HEIGHT}},`)
  output.print(`\tplayerStart: ${playerStart.getJson()},`);
  output.print('\tfloors: {');
  output.print('\t\tstatic: [');
  
  for (let floor of gameObjects.filter(obj => obj instanceof Rectangle)) {
    output.print(`\t\t\t${floor.getJson()},`)
  }
  
  output.print('\t\t],');
  output.print('\t\tmoving: [');
  output.print('\t\t],');
  
  output.print('\t},');
  
  output.print('\thazards: {');
  output.print('\t\tstatic: [');
  
  for (let hazard of gameObjects.filter(obj => obj instanceof Hazard)) {
    output.print(`\t\t\t${hazard.getJson()},`)
  }
  
  output.print('\t\t],');
  output.print('\t\tmoving: [');

  for (let mHazard of gameObjects.filter(obj => obj instanceof movingHazard)) {
    output.print(`\t\t\t${mHazard.getJson()},`)
  }

  output.print('\t\t],');
  
  output.print('\t\tguns: [');
  output.print('\t\t]');
  
  output.print('\t},');
  
  output.print('\ttargets: [');
  
  for (let endPoint of gameObjects.filter(obj => obj instanceof EndPoint)) {
    output.print(`\t\t${endPoint.getJson()},`)
  }
  
  output.print('\t]');
  output.print('}');

  output.close();
}