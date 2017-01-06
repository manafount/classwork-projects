const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el){
    this.$el = $el;
    this.userID = $el.data("user-id");
    this.followState = $el.data("initial-follow-state");
    this.disabled = false;

    this.$el.on("click", (event) => this.handleClick(event));

    this.render();
  }

  render(){
    if(this.followState === "followed"){

      this.$el.text("unfollow!");
    } else {
      this.$el.text("follow!");
    }

    if(this.disabled) {
      this.$el.prop("disabled", true);
      (this.$el.followState === "followed") ? this.$el.text("unfollowing...") : this.$el.text("following...");
    }else {
      this.$el.prop("disabled", false);
    }
  }

  handleClick(event){
    event.preventDefault();
    this.disabled = true;
    this.render();
    APIUtil.toggleFollowUser(this)
      .then(() => {
        (this.followState === "followed") ? this.followState = "unfollowed" : this.followState = "followed";
        this.disabled = false;
        this.render();
      });
  }
}

module.exports = FollowToggle;
