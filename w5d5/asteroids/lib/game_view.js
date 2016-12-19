const Game = require('./game.js');

function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game();
  console.log(this.game);
}
GameView.prototype.start = function() {
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;
