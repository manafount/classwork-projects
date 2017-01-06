/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let Router = __webpack_require__(1);
	let Inbox = __webpack_require__(2);
	let Compose = __webpack_require__(3);
	let Sent = __webpack_require__(4);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {

	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    this.render();

	    window.addEventListener("hashchange", () => {
	      this.render();
	    });
	  }

	  activeRoute() {
	    let hash = window.location.hash.slice(1);
	    return this.routes[hash];
	  }

	  render() {
	    let component = this.activeRoute();
	    if (component === undefined) {
	      this.node.innerHTML = "";
	    }else{
	      this.node.innerHTML = "";
	      this.node.appendChild(component.render());
	    }
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(5);

	module.exports = {
	  renderMessage(message) {
	    let messageEl = document.createElement("li");
	    messageEl.className = "message";
	    messageEl.innerHTML =`
	    <span class='from'>${message.from}</span>
	    <span class="subject">${message.subject}</span> -
	    <span class="body">${message.body}</span>
	    `;
	    return messageEl;
	  },

	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getInboxMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(5);

	module.exports = {
	  renderForm() {
	    let currentMessage = MessageStore.getMessageDraft();
	    let html = `
	    <p class="new-message-header">New Message</p>
	    <form class="compose-form">
	    <input
	      placeholder='Recipient'
	      name='to'
	      type="text"
	      value='${currentMessage.to}'>
	    <input
	      placeholder='Subject'
	      name='subject'
	      type="text"
	      value='${currentMessage.subject}'>
	    <textarea
	      name='body'
	      rows='20'>${currentMessage.body}</textarea>
	    <button type="submit" class="btn btn-primary submit-message">Send</button>
	    </form>
	    `;
	    return html;
	  },
	  render() {
	    let container = document.createElement("div");
	    container.className = "new-message";
	    container.innerHTML = this.renderForm();
	    container.addEventListener('change', e => {
	      let target = e.target;
	      MessageStore.updateDraftField(target.name, target.value);
	    });

	    container.addEventListener('submit', e => {
	      e.preventDefault();
	      MessageStore.sendDraft();
	      location.hash = "inbox";
	    });

	    return container;
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(5);

	module.exports = {
	  renderMessage(message) {
	    let messageEl = document.createElement("li");
	    messageEl.className = "message";
	    messageEl.innerHTML = `
	    <span class="from">To: ${message.to}</span>
	    <span class="subject">${message.subject}</span> -
	    <span class="body">${message.body}
	    `;
	    return messageEl;
	  },
	  
	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getSentMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	const user = "bigpapa@gmail.com";

	class Message {
	  constructor(from = user, to = "", subject = "", body = "") {
	    this.from = from;
	    this.to = to;
	    this.subject = subject;
	    this.body = body;
	  }
	}

	let messages = JSON.parse(localStorage.getItem('messages'));
	let messageDraft = new Message();

	if(!messages) {
	  messages = {
	    sent: [
	      {to: "hope@mail.com", subject: "cat", body: "flufflebutt"},
	      {to: "kevin@mail.com", subject: "candy", body: "seriously lemme get some"}
	    ],

	    inbox: [
	      {from: "yongpark@mail.com", subject: "spooky alien", body: "ayyy lmao"},
	      {from: "carsonjudge@mail.com", subject: "we're pairs today", body: "pyscheee it's a solo day"}
	    ]
	  };
	}

	const MessageStore = {
	  getInboxMessages() {
	    return messages.inbox.slice();
	  },

	  getSentMessages() {
	    return messages.sent.slice();
	  },

	  getMessageDraft() {
	    return messageDraft;
	  },

	  sendDraft() {
	    messages.sent.push(messageDraft);
	    messageDraft = new Message();
	    localStorage.setItem('messages', JSON.stringify(messages));
	  },
	  
	  updateDraftField(field, value) {
	    messageDraft[field] = value;
	  }
	};

	module.exports = MessageStore;


/***/ }
/******/ ]);