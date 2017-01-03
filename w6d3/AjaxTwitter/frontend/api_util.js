const APIUtil = {
  toggleFollowUser: (context) => {
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
