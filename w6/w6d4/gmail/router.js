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
