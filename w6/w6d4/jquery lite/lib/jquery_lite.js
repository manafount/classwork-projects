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

	const DOMNodeCollection = __webpack_require__(1);

	const _docReadyCallbacks = [];
	let _docReady = false;

	window.$l = arg => {
	  switch(typeof(arg)){
	    case "function":
	      return registerDocReadyCallback(arg);
	    case "string":
	      return getNodesFromDom(arg);
	    case "object":
	      if(arg instanceof HTMLElement){
	        return new DOMNodeCollection([arg]);
	      }
	  }
	};

	$l.extend = (base, ...otherObjs) => {
	  otherObjs.forEach( obj => {
	    for(let prop in obj){
	      base[prop] = obj[prop];
	    }
	  });
	  return base;
	};

	$l.ajax = options => {
	  const request = new XMLHttpRequest();
	  const defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: "GET",
	    url: "",
	    success: () => {},
	    error: () => {},
	    data: {},
	  };
	  options = $l.extend(defaults, options);
	  options.method = options.method.toUpperCase();

	  if (options.method === "GET"){
	    options.url += "?" + toQueryString(options.data);
	  }

	  request.open(options.method, options.url, true);
	  request.onload = e => {
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.response);
	    }
	  };

	  request.send(JSON.stringify(options.data));
	};

	//helper methods
	toQueryString = obj => {
	  let result = "";
	  for(let prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};

	registerDocReadyCallback = func => {
	  if(!_docReady){
	    _docReadyCallbacks.push(func);
	  } else {
	    func();
	  }
	};

	getNodesFromDom = selector => {
	  const nodes = document.querySelectorAll(selector);
	  const nodes_array = Array.from(nodes);
	  return new DOMNodeCollection(nodes_array);
	};

	document.addEventListener('DOMContentLoaded', () => {
	  _docReady = true;
	  _docReadyCallbacks.forEach( func => func() );
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(nodes) {
	    this.nodes = nodes;
	  }

	  each(cb) {
	    this.nodes.forEach(cb);
	  }

	  on(eventName, callback) {
	    this.each(node => {
	      node.addEventListener(eventName, callback);
	      const eventKey = `jqliteEvents-${eventName}`;
	      if (typeof node[eventKey] === "undefined") {
	        node[eventKey] = [];
	      }
	      node[eventKey].push(callback);
	    });
	  }

	  off(eventName) {
	    this.each(node => {
	      const eventKey = `jqliteEvents-${eventName}`;
	      if (node[eventKey]) {
	        node[eventKey].forEach(callback => {
	          node.removeEventListener(eventName, callback);
	        });
	      }
	      node[eventKey] = [];
	    });
	  }

	  html(html) {
	    if (typeof html === "string") {
	      this.each(node => node.innerHTML = html);
	    } else {
	      if (this.nodes.length > 0) {
	        return this.nodes[0].innerHTML;
	      }
	    }
	  }

	  empty() {
	    this.html('');
	  }

	  append(children) {
	    if (this.nodes.length === 0) return;

	    if (typeof children === 'object' &&
	        !(children instanceof DOMNodeCollection)) {
	      children = $l(children);
	    }

	    if (typeof children === "string") {
	      this.each(node => node.innerHTML += children);
	    } else if (children instanceof DOMNodeCollection) {
	      this.each(node => {
	        children.each(childNode => {
	          node.appendChild(childNode.cloneNode(true))
	        });
	      });
	    }
	  }

	  remove() {
	    this.each(node => node.parentNode.removeChild(node));
	  }

	  attr(key, val) {
	    if (typeof val === "string") {
	      this.each( node => node.setAttribute(key, val) );
	    } else {
	      return this.nodes[0].getAttribute(key);
	    }
	  }

	  addClass(newClass) {
	    this.each(node => node.classList.add(newClass));
	  }

	  removeClass(oldClass) {
	    this.each(node => node.classList.remove(oldClass));
	  }

	  toggleClass(toggleClass) {
	    this.each(node => node.classList.toggle(toggleClass));
	  }

	  find(selector) {
	    let foundNodes = [];
	    this.each(node => {
	      const nodeList = node.querySelectorAll(selector);
	      foundNodes = foundNodes.concat(Array.from(nodeList));
	    });
	    return new DOMNodeCollection(foundNodes);
	  }

	  children() {
	    let childNodes = [];
	    this.each(node => {
	      const childNodeList = node.children;
	      childNodes = childNodes.concat(Array.from(childNodeList));
	    });
	    return new DOMNodeCollection(childNodes);
	  }

	  parent() {
	    const parentNodes = [];
	    this.each(node => parentNodes.push(node.parentNode));
	    return new DOMNodeCollection(parentNodes);
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);