const Utils = require('../Utils');

// Alcohol... check
// Avril Lavigne.. check
// Overinflated ego... check
// LET'S GO!!!

const instructions = [];
const crateStacks = [];

let index = 0; //This is just for testing purposes
//const crateStacks = [];


Utils.processFile('input.txt', (line) => {

  const checkIfCrateExists = /\[[A-Z]\]/;

  if (index >= 15) {
    //return;
  }

  index++;

  //Check if this line contains a crate, I can't be arsed so I'm just assuming no lines that are totally empty.
  if (checkIfCrateExists.test(line)) {

    //Split line by space to get parts.
    const parts = line.split(' ');

    //This is to keep track of what we should be addressing .
    let stringIndex = 0;
    let crateIndex = 0;

    parts.forEach((currentPart, curIndex) => {



      //Check this is a valid thing to check for a crate.
      if (curIndex === stringIndex) {

        //Thank fuck for extra whitespace.
        //console.log("String Index", stringIndex);
        if (crateIndex >= crateStacks.length) {
          crateStacks.push([]);
        }

        //Are we at a crate?
        if (checkIfCrateExists.test(currentPart)) {

          crateStacks[crateIndex].unshift(currentPart[1]);
          //console.log("Part", crateIndex, currentPart);
          stringIndex++;
          //stringIndex = stringIndex + 5;

        } else {
          stringIndex = stringIndex + 4;
        }

        crateIndex = crateIndex + 1;

      }
      //Piece of piss.



    });

    return;

  }

  const checkIfInstruction = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/g;
  //const matches = line.match(checkIfInstruction);

  if (line.match(checkIfInstruction)) {

    const lineMatch = checkIfInstruction.exec(line);

    //console.log("Line", line, lineMatch);

    instructions.push([lineMatch[1], lineMatch[2], lineMatch[3]])


  }

  index++;

}).then(() => {

  //console.log(instructions);

  instructions.forEach((instruction) => {

    //Get the array we actually care about.
    const currentStack = crateStacks[instruction[1] - 1];
    const removedCrates = currentStack.splice(currentStack.length - instruction[0], instruction[0]);


    //console.log("Updated Current Stack", currentStack);
    //console.log("Removed Items", removedCrates);

    //Reverse it.
    removedCrates.reverse();

    //Part 2, don't reverse it..? This seems waaay to easy.
    removedCrates.reverse();

    crateStacks[instruction[2] - 1] = crateStacks[instruction[2] - 1].concat(removedCrates);


  });

  //console.log("Our Stacks");
  console.log(crateStacks);

  let topCrates = '';

  crateStacks.forEach((stack) => {
    topCrates = topCrates + stack[stack.length - 1];
  });

  console.log(topCrates);

  //console.log("Instructions");
  //console.log(instructions);

});