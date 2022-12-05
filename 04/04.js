const Utils = require('../Utils');
const cleaningPairs = [];


Utils.processFile('input.txt', (data) => {

  cleaningPairs.push(data.split(','));
  cleaningPairs[cleaningPairs.length - 1] = cleaningPairs[cleaningPairs.length - 1].map((sections) => {

    return sections.split('-').map((section) => {

      return Number(section);

    })

  });

  console.log("Line", data)

}).then(() => {

  const cleanedSections = [100000000, -100000000]; //Set limits to something stupid.


  let totalOverlappedPairs = 0;
  let totalOverlaps = 0;

  const sectionsChecked = [];

  const checkIfConflictBetweenPairs = (pairA, pairB) => {

    return ((pairA[0] >= pairB[0] && pairA[1] <= pairB[1]) || (
        pairB[0] >= pairA[0] && pairB[1] <= pairA[1])
    );

  };

  const checkIfOverlapExists = (rangeA, rangeB) => {

    //First check to see if the first range is bigger than the second.
    if (rangeA[0] <= rangeB[0] && rangeA[1] >= rangeB[1]) {
      return true;
    }

    if (isNumberInRange(rangeA[0], rangeB) || isNumberInRange(rangeA[1], rangeB)) {
      return true;
    }


    return false;

    // Lowest section  A is bigger than lowest section B



  };

  const isNumberInRange = (number, range) => {

    return number >= range[0] && number <= range[1]

  }

  const checkIfHistoricConflict = (section, sectionsChecked) => {

    let noConflict = true;

    for (let i = 0; i < sectionsChecked.length; i++) {

      console.log("Check Section", i);

      const hasConflict = checkIfConflictBetweenPairs(section,sectionsChecked[i]);
      if (hasConflict) {
        console.log("Has Conflict");
        noConflict = false;
        break;
      }

    }

    return !noConflict;

  };

  const contains = cleaningPairs.map((pair, index) => {

    /*

    let hasPrimaryConflict = checkIfHistoricConflict(pair[0], sectionsChecked);
    let hasSecondaryConflict = checkIfHistoricConflict(pair[1], sectionsChecked);

    if (hasPrimaryConflict || hasSecondaryConflict) {
      totalOverlaps++
    }

    sectionsChecked.push(pair[0]);
    sectionsChecked.push(pair[1]);
    */


    const overlapExists =
      checkIfOverlapExists(pair[0], pair[1]) || checkIfOverlapExists(pair[1], pair[0]);

    if (overlapExists) {
      totalOverlaps++;
      //totalOverlappedPairs++;
    }

    /*const contains = checkIfConflictBetweenPairs(pair[0], pair[1]);

    if (contains) {
      totalOverlappedPairs++;
    }*/

    return pair;

  });


  console.log("Sections", sectionsChecked);
  console.log("Total Overlaps", totalOverlaps);

});