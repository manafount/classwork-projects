const Game = require('./game.js');

const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const completionCallback = function() {
  reader.question("Would you like to play again? (yes/no): ", (answer) => {
    if (answer === "yes") {
      let newGame = new Game(reader, completionCallback);
      newGame.run(completionCallback);
    }else{
      console.log("Bye");
      reader.close();
    }
  });
};

let game = new Game(reader, completionCallback);
game.run(completionCallback);
