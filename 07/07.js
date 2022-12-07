const Utils = require('../Utils');

const dir = {
  parent: false,
  contents: [],
}


const fileDescriptor = (name, size, type, parent, contents = []) => {
  return {
    type: type,
    name: name,
    size: size,
    contents: [],
    parent: parent
  }
};

const rootDirectory = fileDescriptor('/', 0, 'dir', false);
let currentDirectory = rootDirectory;

const commands = {
  cd: (param, fileDescriptor) => {

    if (param === '..') {
      return fileDescriptor.parent;
    } else if (param === '/') {
      return rootDirectory;
    } else {
      return fileDescriptor.contents.find((file) => {
        return file.name === param;
      })
    }
  },
  ls: (fileDescriptor) => {

  }
};

//Let's do a light bit of recursion.
const calculateDirectorySize = (directory) => {

  directory.contents.forEach((file) => {

    if (file.type === 'file') {
      directory.size = directory.size + Number(file.size);
      return;
    }

    calculateDirectorySize(file);
    directory.size = directory.size + file.size;

  });

};

const isValidForDeletion = (directory, fileSizeLimit) => {

  return directory.size <= fileSizeLimit;

};

const getValidDeletionDirs = (directory, fileSizeLimit, cmp = 'lte') => {

  const validDirs = [];

  if (cmp === 'lte') {

  }

  if (cmp === 'lte' && directory.size <= fileSizeLimit) {
    validDirs.push(directory);
  }

  if (cmp === 'gte' && directory.size >= fileSizeLimit) {
    validDirs.push(directory);
  }

  directory.contents.forEach((file) => {

    if (file.type === "dir") {
      //console.log("Is dir");
      validDirs.push(...getValidDeletionDirs(file, fileSizeLimit, cmp));
      //console.log(validDirs, file);
    }

  });

  return validDirs;

};

const getSmallestDirectoryGreaterThanSize = (directory, fileSizeLimit) => {

  let smallestDir = directory >= fileSizeLimit;
  const smallestChildDirs = [];



  let hasMultipleChildDirs = false

}

const instructions = [];


Utils.processFile('input.txt', (line) => {

  const lineParts = line.split(' ');

  if (lineParts[0] === '$') {

    if (lineParts[1] === 'cd') {
      currentDirectory = commands.cd(lineParts[2], currentDirectory);
    }

    return;

  }

  if (lineParts[0] === 'dir') {

    currentDirectory.contents.push(fileDescriptor(lineParts[1], 0, 'dir', currentDirectory));
    return;

  }

  currentDirectory.contents.push(fileDescriptor(lineParts[1], lineParts[0], 'file', false));

}).then(() => {


  calculateDirectorySize(rootDirectory);
  let validDeletionDirs = getValidDeletionDirs(rootDirectory, 100000, 'lte');
  let totalFileSize = 0;

  validDeletionDirs.forEach((directory) => {
    totalFileSize = directory.size + totalFileSize;
  });


  const totalSpace = 70000000;
  const totalRemainingSpace = totalSpace - rootDirectory.size;
  const neededSpace = 30000000 - totalRemainingSpace;


  //Second Part, I could create a
  validDeletionDirs = getValidDeletionDirs(rootDirectory, neededSpace, 'gte');

  let directoryToDelete = validDeletionDirs[0];

  validDeletionDirs.forEach((directory) => {

    if (directory.size <= directoryToDelete.size) {
      directoryToDelete = directory;
    }

  });

  console.log(totalFileSize);
  console.log(neededSpace, directoryToDelete.size);


});