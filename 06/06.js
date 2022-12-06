const Utils = require('../Utils');

const findPositionOfDistinctSubString = (string, length, from) => {

  let index = from;
  let match = false;
  const stringBuffer = string.split('');
  const  substringBuffer = [];

  while (!match && index < stringBuffer.length) {

    substringBuffer.push(stringBuffer[index]);

    if (substringBuffer.length === length) {

      let containsDuplicate = false;

      for (let i = 0; i < substringBuffer.length - 1; i++) {

        const curChar = substringBuffer[i];

        for (let j = i + 1; j < substringBuffer.length; j++ ) {

          if (curChar === substringBuffer[j]) {
            containsDuplicate = true;
            break;
          }

          if (containsDuplicate) {
            break;
          }

        }

      }

      if (!containsDuplicate) {
        match = true;
        break;
      }

      //Remove first char.
      substringBuffer.shift();

    }

    index++;

  }

  return index + 1;

};

Utils.processFile('input.txt', (line) => {


  const positionOfStartOfPacket = findPositionOfDistinctSubString(line, 4, 0);
  const positionOfStartOfMessage = findPositionOfDistinctSubString(line, 14, positionOfStartOfPacket);

  console.log("Start of Packet", positionOfStartOfPacket);
  console.log("Start of Message", positionOfStartOfMessage);

});