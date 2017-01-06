Function.prototype.myBind = function(context, ...args) {

  return (...args2) => this.apply(context, args.concat(args2));
};

function curriedSum(numArgs) {
  let numbers = [];
  
}
