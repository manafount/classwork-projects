function sumWithArgs() {
  let args = Array.prototype.slice.call(arguments);
  return args.reduce((total, el) => total + el);
}
// console.log(sumWithArgs(1, 2, 3, 4)); // 10
// console.log(sumWithArgs(1, 2, 3, 4, 5)); // 15

function sumWithRest(...nums) {
  return nums.reduce((total, num) => total + num);
}
// console.log(sumWithRest(1, 2, 3, 4)); // 10
// console.log(sumWithRest(1, 2, 3, 4, 5)); // 15



// Bind with rest
Function.prototype.myBind = function(context, ...args) {
    return (...more) => {
      this.apply(context, args.concat(more));
    };
};

// Bind with arguments
Function.prototype.myBind = function(context) {
  let bindArgs = Array.from(arguments).slice(1);
  let that = this;
  return function() {
    let callArgs = Array.prototype.slice.call(arguments);
    console.log(callArgs);
    that.apply(context, bindArgs.concat(callArgs));
  };
};


class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

// markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
// markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true



function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}
console.log(sumThree(4, 20, 6)); // == 30


function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs)
      return numbers.reduce((total, el) => total + el);
    else
      return _curriedSum;
  }

  return _curriedSum;
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56


Function.prototype.curry = function(numArgs) {
  let args = [];
  let func = this;

  function _curriedFunc(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      // return func.apply(func, args);
      return func(...args);
    } else {
      return _curriedFunc;
    }
  }

  return _curriedFunc;
};

let f1 = sumThree.curry(3);
// tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
