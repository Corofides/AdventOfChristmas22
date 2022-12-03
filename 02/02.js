/* So I overengineered this and then totally bollocksed it by reading the question wrong. The proponent is actually
the opponent and the opponent is the proponent because I'm an idiot who can't read basic english.
 */


const Utils = require('../Utils');

const PROPONENT = 0;
const OPPONENT = 1;

const ROCK = ["A", "X"];
const PAPER = ['B', 'Y'];
const SCISSOR = ['C', 'Z'];

const ROCK_VALUE = 1;
const PAPER_VALUE = 2;
const SCISSOR_VALUE = 3;

const WIN_STATE = 'w';
const LOSE_STATE = 'l';
const DRAW_STATE = 'd';

const WIN_VALUE = 6;
const DRAW_VALUE = 3;

const ROUND_OUTCOMES = [
  [DRAW_STATE, LOSE_STATE, WIN_STATE], // Proponent plays rock
  [WIN_STATE, DRAW_STATE, LOSE_STATE], // Proponent plays paper
  [LOSE_STATE, WIN_STATE, DRAW_STATE], // Proponent plays scissor
];

const calculateValueForMove = (move) => {

  if (!!ROCK.find((value) => move === value)) {
    return ROCK_VALUE;
  }

  if (!!PAPER.find((value) => move === value)) {
    return PAPER_VALUE;
  }

  if (!!SCISSOR.find((value) => move === value)) {
    return SCISSOR_VALUE;
  }

};

const calculateScores = (round) => {

  const proponentMoveValue = calculateValueForMove(round.move);
  const opponentMoveValue = calculateValueForMove(round.counter);

  //Check state of play.

  round.currentState = ROUND_OUTCOMES[proponentMoveValue - 1][opponentMoveValue - 1];
  round.proponentScore = proponentMoveValue;
  round.opponentScore = opponentMoveValue;

  if (round.currentState === WIN_STATE) {
    round.proponentScore += WIN_VALUE;
    return;
  }

  if (round.currentState === DRAW_STATE) {
    round.proponentScore += DRAW_VALUE;
    round.opponentScore += DRAW_VALUE;
    return;
  }

  round.opponentScore += WIN_VALUE;

};

const roundTemplate = {
  move: ROCK[PROPONENT], //
  counter: SCISSOR[OPPONENT],
  proponentScore: 0,
  opponentScore: 0,
  currentState: ''
};

const createRound = (proponentMove, opponentMove) => {

  const round = Object.assign({}, roundTemplate, {move: proponentMove, counter: opponentMove})
  calculateScores(round);
  return round;

};

const testGame = [
  ['A', 'Y'],
  ['B', 'X'],
  ['C', 'Z'],
];


const testRounds = testGame.map((theRound) => {
  return createRound(theRound[0], theRound[1]);
});

const testARound = (proponentMove, opponentMove, expectedState, expectedProponentScore, expectedOpponentScore) => {

  const round = createRound(proponentMove, opponentMove);

  return round.currentState === expectedState && round.proponentScore === expectedProponentScore && round.opponentScore === expectedOpponentScore;

};

const getOpponentMoveForState = (proponentMove, endState) => {

  const value = calculateValueForMove(proponentMove);
  const indexForEndState = ROUND_OUTCOMES[value -1].findIndex((curState) => {
    return curState === endState;
  });

  const opponentMoveValue = indexForEndState + 1;

  if (opponentMoveValue === ROCK_VALUE) {
    return ROCK[OPPONENT];
  }

  if (opponentMoveValue === SCISSOR_VALUE) {
    return SCISSOR[OPPONENT];
  }

  return PAPER[OPPONENT];

};

const checkOpponentState = (proponentMove, endState) => {

  const opponentMove = getOpponentMoveForState(proponentMove, endState);

  if (ROCK.find((value => {return value === opponentMove}))) {
    return "Rock";
  }

  if (PAPER.find((value => {return value === opponentMove}))) {
    return "Paper";
  }

  return "Scissor";


}


console.log("Check win for Paper", checkOpponentState(PAPER[PROPONENT], 'w')); //Rock
console.log("Check draw for Paper", checkOpponentState(PAPER[PROPONENT], 'd')); //Paper
console.log("Check lose for Paper", checkOpponentState(PAPER[PROPONENT], 'l')); // Scissors

console.log("Check win for Scissors", checkOpponentState(SCISSOR[PROPONENT], 'w')); // Paper
console.log("Check draw for Scissors", checkOpponentState(SCISSOR[PROPONENT], 'd')); //Scissors
console.log("Check lose for Scissors", checkOpponentState(SCISSOR[PROPONENT], 'l')); // Rock

console.log("Check win for Rock", checkOpponentState(ROCK[PROPONENT], 'w')); // Scissors
console.log("Check draw for Rock", checkOpponentState(ROCK[PROPONENT], 'd')); //Rock
console.log("Check lose for Rock", checkOpponentState(ROCK[PROPONENT], 'l')); // Paper

let totalScore = 0;
let totalOpponentScore = 0;

/*const processedRounds = Utils.processFile('input.txt', (data) => {

  data = data.split(' ');

  const round = createRound(data[0], data[1]);

  console.log("Round", data[0], data[1], round.opponentScore);

  totalScore += round.proponentScore;
  totalOpponentScore += round.opponentScore;

  //console.log("Turn", data);

}).then(() => {
  console.log("Fin!", totalScore, totalOpponentScore);
});*/

let totalProponentScoreForState = 0;
let totalOpponentScoreForState = 0;

//Process Rounds with State
Utils.processFile('input.txt', (data) => {

  data = data.split(' ');

  // X = LOSE
  // Y = DRAW
  // Z = WIN

  let endState = DRAW_STATE;

  if (data[1] === 'Z') {
    endState = LOSE_STATE;
  } else if (data[1] === 'X') {
    endState = WIN_STATE;
  } else if (data[1] === 'Y') {
    endState = DRAW_STATE;
  } else {
    console.log("Error State");
  }


  //console.log("State of Round", data[0], getOpponentMoveForState(data[0]), endState);

  const round = createRound(data[0],getOpponentMoveForState(data[0], endState));

  console.log("The Round", round);
  totalProponentScoreForState += round.proponentScore;
  totalOpponentScoreForState += round.opponentScore;
  //console.log("Round", round);

}).then(() => {
  console.log("Score", totalOpponentScoreForState, totalProponentScoreForState);
});

//Random Tests
/*
const testRockVsPaper = () => {

  const round = createRound(ROCK[PROPONENT], PAPER[OPPONENT]);

  if (round.currentState === "l") {
    return true;
  }

  return false;

};


//calculateScores(roundTemplate);

console.log("Rounds", testRounds);
console.log("Rock vs Paper", testARound(ROCK[PROPONENT], PAPER[OPPONENT], 'l', 1, 8));
console.log("Paper vs Rock", testARound(PAPER[PROPONENT], ROCK[OPPONENT], 'w', 8, 1));
console.log("Scissor vs Paper", testARound(SCISSOR[PROPONENT], PAPER[OPPONENT], 'w', 9, 2));
console.log("Scissor vs Scissor", testARound(SCISSOR[PROPONENT], SCISSOR[OPPONENT], 'd', 6, 6));

const svs = createRound(SCISSOR[PROPONENT], SCISSOR[OPPONENT]);
const svp = createRound(SCISSOR[PROPONENT], PAPER[OPPONENT]);

console.log ("Test SvP", svs);

*/