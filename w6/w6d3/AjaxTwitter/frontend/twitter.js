const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

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
