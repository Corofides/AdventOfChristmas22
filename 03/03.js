const Utils = require('../Utils');
const rucksacks = [];


const calcPriority = (letter) => {

  const charCode = letter.charCodeAt(0);
  let priority = charCode - 64;

  if (priority > 26) {
    priority = priority - 6;
  }

  priority = priority + 26;
  priority = priority % 52;

  if (priority === 0) {
    priority = 52;
  }

  //console.log("Char Code", charCode, priority, letter);


  return priority;



};

calcPriority('Z');
calcPriority("z");


//Part A
/*
Utils.processFile('input.txt', (data) => {

  const items = data.split('');

  if (items.length % 2 === 1) {
    console.log("Odd");
  }

  //console.log("Length", items.length);

  const midPoint = items.length / 2;

  const theRucksack = [
    items.slice(0, midPoint),
    items.slice(midPoint, items.length)
  ];

  rucksacks.push(theRucksack);

  //console.log("Rucksack", data.split(''));

}).then(() => {

  let totalPriority = 0;

  rucksacks.forEach((rucksack) => {

    const duplicatedItem =  rucksack[0].find((item) => {
      return rucksack[1].includes(item);
    });

    const priority = calcPriority(duplicatedItem);
    totalPriority += priority;
    //console.log("Duplicate", duplicatedItem);

  });

  console.log("total priority", totalPriority);
  //console.log("Rucksacks", rucksacks);

});
*/

const groups = [];

/* Part B */
Utils.processFile('input.txt', (data) => {

  console.log(groups.length % 3);

  if (groups.length === 0 || groups[groups.length - 1].length % 3 === 0) {
    groups.push([]);
  }

  const items = data.split('');

  groups[groups.length -1].push(items);
  //rucksacks.push(items);

  //console.log("Rucksack", data.split(''));

}).then(() => {

  let totalPriority = 0;

  groups.forEach((group) => {

    const duplicatedAcrossGroup = group[0].find((item) => {

      //console.log("Item", item);

      for(let i = 1; i < group.length; i++) {

        if (!group[i].includes(item)) {
          return false;
        }

      }

      return true;


    });

    totalPriority = totalPriority + calcPriority(duplicatedAcrossGroup);

    console.log("Duplicated Across Group", duplicatedAcrossGroup);

  });

  console.log("total priority", totalPriority);

  //console.log("Groups", groups);

});
