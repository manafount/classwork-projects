/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UsersSearch = __webpack_require__(3);
	const TweetCompose = __webpack_require__(4);
	
	$(() => {
	  $('button.follow-toggle').each((i, el) => {
	    let toggle = new FollowToggle($(el));
	  });
	
	  $('nav.users-search').each((i, el) => {
	    let search = new UsersSearch($(el));
	  });
	
	  $('.tweet-compose').each((i, el) => {
	    let compose = new TweetCompose($(el));
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const APIUtil = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const APIUtil = {
	  toggleFollowUser: context => {
	    let meth = null;
	    (context.followState === "followed") ? meth = "DELETE" : meth = "POST";
	    return $.ajax({
	      url: `/users/${context.userID}/follow`,
	      method: meth,
	      dataType: "json"
	    });
	  },
	
	  searchUsers: (query) => {
	    return $.ajax({
	      url: "/users/search",
	      method: "GET",
	      data: { query },
	      dataType: "json"
	    });
	  },
	
	  createTweet: (content) => {
	    return $.ajax({
	      url: "/tweets",
	      method: "POST",
	      data: { content },
	      dataType: "json"
	    });
	  }
	
	};
	
	module.exports = APIUtil;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const APIUtil = __webpack_require__(2);
	const FollowToggle = __webpack_require__(1);
	
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
	    console.log(users);
	    this.$ul.empty();
	    for (let i = 0; i < users.length; i++) {
	      let user = users[i];
	      console.log(user.username);
	      let $a = $(`<a href=\"/users/${user.id}\">${user.username}</a>`);
	
	      let $follow = $("<button></button");
	      $follow.data("user-id", user.id);
	      $follow.data("initial-follow-state", user.followed ? "followed" : "unfollowed");
	      new FollowToggle($follow);
	
	      let $li = $("<li></li>");
	      console.log($a);
	      $li.append($a);
	      $li.append($follow);
	
	      this.$ul.append($li);
	    }
	  }
	}
	
	module.exports = UsersSearch;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const APIUtil = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map