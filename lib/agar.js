const Board = require('./board');
const Cell = require('./cell');
const HumanPlayer = require('./human_player');
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const backgroundElement = document.getElementById('background-canvas');
  const cellElement = document.getElementById('cell-canvas');

  const backgroundCtx = backgroundElement.getContext("2d");
  const cellCtx = cellElement.getContext("2d");

  new Game(backgroundCtx, cellCtx);
});
