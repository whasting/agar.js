const Board = require('./board');
const Cell = require('./cell');
const HumanPlayer = require('./human_player');
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const gameElement = document.getElementById('game-canvas');
  const gameCtx = gameElement.getContext('2d');

  gameElement.width = $(window).width();
  gameElement.height = $(window).height();

  let board = new Board(8000, 8000);
  board.generate(75);
  board.draw(gameCtx, 2500, 2500);

  let game;

  $(window).resize(() => {
    gameElement.width = $(window).width();
    gameElement.height = $(window).height();
    if (board) {
      board.draw(gameCtx, 2500, 2500);
    }
    if (game) {
      game.updatePlayerCoords();
    }
  });

  // document.getElementById('win-button').addEventListener('click', () => {
  //   document.getElementById('win').style.display = 'none';
  //   game = new Game(gameCtx, gameElement);
  //   game.play();
  // });
  //
  // document.getElementById('lose-button').addEventListener('click', () => {
  //   document.getElementById('lose').style.display = 'none';
  //   game = new Game(gameCtx, gameElement);
  //   game.play();
  // });

  document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-menu').style.display = "none";
    game = new Game(gameCtx, gameElement);
    game.play();
    board = null;
  });


});
