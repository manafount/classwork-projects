
const Board = require('./board.js');

class Game {
  constructor(reader) {
    this.reader = reader;
    this.board = new Board;
  }

  run(reader, completionCallback, currentMark = "X") {
    this.promptMove( (pos) => {
      if (this.board.isEmpty(pos)){
        this.board.placeMark(pos, currentMark);
        if (this.board.won()) {
          this.board.render();
          console.log(this.board.won() + " wins!");
          completionCallback();
        }else{
          currentMark = (currentMark === "X" ? "O" : "X");
          this.run(reader, completionCallback, currentMark);
        }
      }else{
        console.log("nah bro");
        this.run(reader, completionCallback, currentMark);
      }
    });
  }

  promptMove(callback) {
    this.board.render();
    this.reader.question("Enter move (ex: 2, 0): ", (answer) => {
      let pos = answer.split(", ").map(el => parseInt(el));
      callback(pos);
    });
  }
}




module.exports = Game;
