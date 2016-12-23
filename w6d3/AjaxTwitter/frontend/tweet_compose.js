const APIUtil = require('./api_util.js');

class TweetCompose {

  constructor($el) {
    this.$el = $el;
    this.$input = $("textarea");
    this.$el.on("submit", (event) => {
      this.submitTweet(event);
    });


    this.$input.on("input", (event) =>{
      let total = this.$input.val().length;
      $(".chars-left").text(`${140-total} characters left.`);
    });

    $('.add-mentioned-user').on("click", (event) => {
      this.addMentionedUser();
    });
  }

  clearInput(){
    this.$input.val("");
  }

  submitTweet(event) {
    event.preventDefault();
    let content = this.$el.serializeJSON();
    this.$el.find(":input").prop("disabled", true);
    APIUtil.createTweet(content)
      .then(() => {
        this.handleSuccess();
      });
  }
  // this.$el.data("tweets-ul", "#feed");

  addMentionedUser() {
    let $mentionedUser = this.$el.find("script").html();

    this.$el.find(".mentioned-users").append($mentionedUser);
    $('.remove-mentioned-user').on("click", (event) => {
      console.log("worked");
      this.removeMentionedUser(event);
    });
    return false;
  }

  removeMentionedUser(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    let target = $(event.currentTarget);
    target.parent().remove();

    return false;
  }

  handleSuccess() {
    this.clearInput();
    this.$el.find(":input").prop("disabled", false);

  }
}

module.exports = TweetCompose;
