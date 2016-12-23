class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('.square').on("click", (e) => {
      let $square = $(e.currentTarget);
      this.makeMove($square);
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

  setupBoard() {
    const $ul = $("<ul>");
    $ul.addClass("group");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $li = $("<li>");
        $li.addClass("square");
        $li.data("pos", [rowIdx, colIdx]);
        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }
}

module.exports = View;
