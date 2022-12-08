const Utils = require("../Utils");

const forrest = []; //Array of arrays
const isVisible = [];


Utils.processFile('input.txt', (line) => {

  const individualTrees = line.split('');

  forrest.push(individualTrees);
  isVisible.push([...individualTrees.map(() => false)]);
  //Function lands
  //console.log("Line", line);

}).then(() => {

  const forrestDepth = forrest.length;
  const forrestWidth = forrest[forrest.length - 1].length;
  const totalTrees = forrestDepth * forrestWidth;

  console.log("Depth", forrestDepth);
  console.log("Width", forrestWidth);
  console.log("Total Trees", totalTrees);

  const visibility = [-1, -1, -1, -1];

  //foreach is making me lazy.
  for (let i = 0; i < totalTrees; i++) {

    let row = Math.floor((i) / forrestWidth);
    let column = i % forrestDepth;

    //If the input is a square I will murder someone.
    let updownRow = i % forrestWidth;
    let updownColumn = Math.floor((i) / forrestDepth);

    const TOP = 0;
    const RIGHT = 1;
    const BOTTOM = 2;
    const LEFT = 3;

    if (column === 0) {
      visibility[LEFT] = -1;
    }

    if (updownRow === 0) {
      visibility[TOP] = -1;
    }

    if (forrestWidth === forrestWidth - column) {
      visibility[RIGHT] = - 1;
    }

    if (forrestDepth === forrestDepth - updownRow) {
      visibility[BOTTOM] = - 1;
    }

    if (visibility[TOP] < forrest[updownRow][updownColumn]) {
      visibility[TOP] = forrest[updownRow][updownColumn];
      isVisible[updownRow][updownColumn] = true;
    }

    if (visibility[BOTTOM] < forrest[forrestDepth - (1 + updownRow)][updownColumn]) {
      visibility[BOTTOM] = forrest[forrestDepth - (1 + updownRow)][updownColumn];
      isVisible[forrestDepth - (1 + updownRow)][updownColumn] = true;
    }

    if (visibility[LEFT] < forrest[row][column]) {
      visibility[LEFT] = forrest[row][column];
      isVisible[row][column] = true;
    }

    if (visibility[RIGHT] < Number(forrest[row][forrestWidth - (1 + column)])) {
      visibility[RIGHT] = forrest[row][forrestWidth - (1 + column)];
      isVisible[row][forrestWidth - (1 + column)] = true;
    }

  }

  let total = 0;

  isVisible.forEach((visibleLine) => {

    visibleLine.forEach((visible) => {

      if (visible) {
        total++;
      }

    })

  });

  console.log("total trees visible", total);


});