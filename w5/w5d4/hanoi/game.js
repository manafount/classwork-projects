
class Game {
  constructor(reader, completionCallback) {
    this.reader = reader;
    this.stacks = [[1, 2, 3], [], []];
  }

  promptMove(callback) {
    this.print();
    this.reader.question("Enter your starting and ending stacks (eg. 0, 1): ", (response) => {
      let positions = response.split(', ');
      let startTowerIdx = parseInt(positions[0]);
      let endTowerIdx = parseInt(positions[1]);
      callback(startTowerIdx, endTowerIdx);
    });
  }

  isValidMove(start, end) {
    if (this.stacks[start].length === 0){
      return false;
    }else if (this.stacks[end].length === 0) {
      return true;
    }else{
      return (this.stacks[start] > this.stacks[end]);
    }
  }

  move(start, end) {
    if (this.isValidMove(start, end)) {
      this.stacks[end].push(this.stacks[start].pop());
      return true;
    }else{
      return false;
    }
  }

  print() {
    console.log(JSON.stringify(this.stacks));
  }

  isWon() {
    return this.stacks[1].length === 3 || this.stacks[2].length === 3;
  }

  run(completionCallBack) {

    this.promptMove( (start, end) => {
      if (this.move(start, end)) {
        if (!this.isWon()) {
          this.run(completionCallBack);
        } else {
          completionCallBack();
        }
      } else {
        console.log("You can't do that.");
        this.run(completionCallBack);
      }
    });
  }
}

module.exports = Game;
