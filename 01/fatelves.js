const fs = require('fs');
const readline = require('readline');


async function getFatElves() {

  const filestream = fs.createReadStream('fatelves.txt');
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });

  let i = 0;
  let currentElf = {
    santaId: 1,
    totalCalories: 0
  };
  const fatelves = [currentElf];

  for await (const line of rl) {

    i++;

    if (line === "") {
      currentElf = Object.assign({}, currentElf);
      currentElf.santaId += 1;
      currentElf.totalCalories = 0;

      fatelves[currentElf.santaId - 1] = currentElf;
      continue;
    }

    const currentElfId = currentElf.santaId - 1;
    fatelves[currentElfId].totalCalories += Number(line);


  }

  fatelves.sort(({totalCalories: totalCaloriesA}, {totalCalories: totalCaloriesB}) => {

    //I'm lazy shoot me.
    return totalCaloriesB - totalCaloriesA;

  });

  return fatelves;

  //console.log("Fat Elves", fatelves);

}

function getTotalCaloriesForXElves(elves, totalElves) {

  //console.log("Elves", elves);

  let totalOfTopXElves = 0;
  for (let i = 0; i < totalElves; i++) {
    totalOfTopXElves += Number(elves[i].totalCalories);
  }

  return totalOfTopXElves

}


const fatElves = getFatElves();

fatElves.then((fatElves) => {

  //Get the calorie count of fattest elf.
  console.log("Calorie Count of Fattest Elf", fatElves[0].santaId, fatElves[0].totalCalories);
  console.log("Total Calories of top 3", getTotalCaloriesForXElves(fatElves, 3));

});
