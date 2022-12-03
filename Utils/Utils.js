
const fs = require('fs');
const readline = require('readline');


/**
 *
 * Ug, I should probably be a good by and document stuff...
 * Erm, okay, so. This opens a file and processes it line by line applying a function
 * to each line, if no function is provided it prints out the file a line at a time. I'd add some error checking but
 * I can't be bothered.
 *
 * @param file
 * @param processFunction
 */
exports.processFile = async (file, processFunction = (data) => {console.log(data); return data;}) => {

  const filestream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {

    processFunction(line);

  }

  return;



}