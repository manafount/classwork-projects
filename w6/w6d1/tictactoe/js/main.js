const View = require("./ttt-view");// require appropriate file
const Game = require("./game");// require appropriate file

$( () => {
  let $container = $(".ttt");
  let game = new Game();
  new View(game, $container);
});
