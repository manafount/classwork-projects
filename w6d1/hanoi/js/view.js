class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.fromTowerIdx = null;
    this.$el.on("click", "ul", this.clickTower.bind(this));


    this.setupTowers();
    this.render();
  }

  clickTower(event) {
    const clickedTowerIdx = $(event.currentTarget).index();

    if (this.fromTowerIdx === null) {
          this.fromTowerIdx = clickedTowerIdx;
    } else {
      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
        alert("Invalid Move! Try again.");
      }

      this.fromTowerIdx = null;
    }

    this.render();

    if (this.game.isWon()) {
      // Remove click handler when done.
      this.$el.off("click");
      this.$el.addClass("game-over");
      alert("You are 💩!");
    }
  }



  render() {
    const $towers = this.$el.find("ul");
    $towers.removeClass();

    if (this.fromTowerIdx !== null) {
      $towers.eq(this.fromTowerIdx).addClass("selected");
    }

    this.game.towers.forEach( (disks, towerIdx) => {
      const $disks = $towers.eq(towerIdx).children();
      $disks.removeClass();

      disks.forEach( (diskWidth, diskIdx) => {
        $disks.eq(-1 * (diskIdx + 1)).addClass(`poop-${diskWidth}`);
      });
    });
  }

  makeMove($square) {
    let currentPlayer = this.game.currentPlayer;
    let pos = $square.data("pos");
    let caption = $("figcaption");

    try {
      this.game.playMove(pos);
    }
    catch(err) {
      alert("Invalid move!");
      return;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      $(".square").off("click");

      this.$el.addClass("game-over");

      let winner = this.game.winner();

      if (winner) {
        this.$el.addClass("winner-" + winner);
        caption.append(winner + " wins!");
      }else{
        caption.append("It's a draw!");
      }
    }
  }

  setupTowers() {
    this.$el.empty();

    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      let $tower = $("<ul>");
      $tower.addClass("tower");
      $tower.data("tower", [towerIdx]);

      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
        let $disk = $("<li>");
        $disk.data("pos", [towerIdx, diskIdx]);
        $tower.append($disk);
      }
      this.$el.append($tower);
    }
  }
}

module.exports = View;
