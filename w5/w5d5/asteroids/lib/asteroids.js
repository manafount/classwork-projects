const GameView = require('./game_view.js');

addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('game-canvas');
  let ctx = canvas.getContext('2d');

  let newGameView = new GameView(ctx);
  newGameView.start();
});
