const Game = require("./game.js");
const View = require("./view.js");

$( () => {
  const rootEl = $('.hanoi');
  const game = new Game();
  new View(game, rootEl);
  console.log('hergerge');
});
