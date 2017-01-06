const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor($el){
    this.$el = $el;
    this.$input = this.$el.find('input[name=username]');
    this.$ul = $("ul.users");
    console.log(this.$el);
    this.$input.on('input', event => this.handleInput(event));

  }

  handleInput(event) {
    event.preventDefault();
    APIUtil.searchUsers(this.$input.val())
      .then((users) => {
        this.renderResults(users);
      }
    );
  }

  renderResults(users){
    this.$ul.empty();
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let $a = $(`<a href=\"/users/${user.id}\">${user.username}</a>`);

      let $follow = $("<button></button");
      $follow.data("user-id", user.id);
      $follow.data("initial-follow-state", user.followed ? "followed" : "unfollowed");
      new FollowToggle($follow);

      let $li = $("<li></li>");
      $li.append($a);
      $li.append($follow);

      this.$ul.append($li);
    }
  }
}

module.exports = UsersSearch;
