let Router = require("./router.js");
let Inbox = require("./inbox.js");
let Compose = require("./compose.js");
let Sent = require("./sent.js");
// console.log("it works!");

let routes = {
  compose: Compose,
  inbox: Inbox,
  sent: Sent
};

document.addEventListener("DOMContentLoaded", function(event) {
  window.location.hash = "#inbox";
  let navs = Array.from(document.querySelectorAll(".sidebar-nav li"));
  let content = document.querySelector(".content");

  let router = new Router(content, routes);
  router.start();

  navs.forEach(nav => {
    nav.addEventListener("click", () => {
      let loc = nav.innerText.toLowerCase();
      location.hash = loc;
    });
  });
});
