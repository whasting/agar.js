const Board = require('./board');
const Cell = require('./cell');
const HumanPlayer = require('./human_player');
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const gameElement = document.getElementById('game-canvas');
  const gameCtx = gameElement.getContext('2d');

  gameElement.width = $(window).width();
  gameElement.height = $(window).height();

  let game = new Game(gameCtx, gameElement);
  game.play();
});
