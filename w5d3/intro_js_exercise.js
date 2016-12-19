Array.prototype.uniq = function () {
  let result = [];
  this.forEach(function (el) {
    if ((result.includes(el)) === false) {
      result.push(el);
    }
  });
  return result;
};

// console.log([1, 2, 1, 3, 3].uniq());

Array.prototype.two_sum = function () {
  let result = [];
  const dupArr = this;
  this.forEach( function (el, idx) {
    dupArr.forEach( function (el2, idx2) {
      if ((idx < idx2) && (el + el2 === 0)) {
        result.push([idx, idx2]);
      }
    });
  });
  return result;
};

// console.log([-1, 0, 2, -2, 1].two_sum());

Array.prototype.my_transpose = function() {
  let result = new Array(this[0].length);
  for (let i = 0; i < this.length; i++){
    result[i] = new Array(this.length);
  }
  this.forEach( function (el, idx, array) {
    array.forEach (function (el2, idx2) {
      result[idx][idx2] = array[idx2][idx];
    });
  });
  return result;
};

// console.log([[0, 1, 2], [3, 4, 5], [6, 7, 8]].my_transpose());

Array.prototype.my_each = function(func) {
  for (let i=0; i<this.length; i++){
    func(this[i], i);
  }
};

// let integers = [1, 2, 3, 4];
// integers.my_each(function(el){
//   console.log(el);
// });

Array.prototype.my_map = function(func) {
  let result = [];
  this.my_each(function(el){
    result.push(func(el));
  });
  return result;
};

let integer = [1, 2, 3, 4];

// console.log(integers.my_map(function(el){
//   return el * el;
// }));

Array.prototype.my_inject = function(func) {
  let firstVal = this.shift();
  this.my_each(function(el){
    firstVal = func(firstVal, el);
  });
  return firstVal;
};

// console.log(integers.my_inject(function(acum, el){
//   return acum + el;
// }));

function factors (num) {
  let result = [];
  for (let i = 1; i <= num; i++){
    if (num % i === 0) { result.push(i); }
  }
  return result;
}

// console.log(factors(10));

Array.prototype.bubble_sort = function (){
  let sorted = true;
  do {
    for (let idx = 0; idx < this.length; idx++){
      if (idx !== this.length - 1 && this[idx] > this[idx + 1]){
        let temp = this[idx];
        this[idx] = this[idx + 1];
        this[idx + 1] = temp;
        sorted = false;
        break;
      }
    sorted = true;
    }
  } while (sorted !== true);

  return this;
};

// console.log([1,2,3,9,1,0,2,10,4].bubble_sort());

function substrings (str) {
  let results = [];
  for (let i = 0; i <= str.length; i++ ) {
    for (let j = i+1; j <= str.length; j++) {
      let substring = str.substring(i, j);
      if (results.includes(substring) === false) {
        results.push(substring);
      }
    }
  }
  return results;
}

// console.log(substrings("cat"));

function range (start, end) {
  if (end < start) {
    return [];
  }else{
    return [start] + range(start + 1, end);
  }
}

// console.log(range(1,5));

function recursive_sum (array) {
  if (array.length < 1) {
    return 0;
  }else{
    return array.shift() + recursive_sum(array);
  }
}
// console.log(recursive_sum([1,2,3,4,5,6]));

function iterative_sum (array) {
  return array.reduce(function(a,b){
    return a + b;
  });
}

// console.log(iterative_sum([1,2,3,4,5,6]));

function exp_one (b, n) {
  if ( n < 1 ){
    return 1;
  }
  return b * exp_one(b, n-1);
}

// console.log(exp_one(2, 4));

function exp_two (b, n) {
  if (n < 1) {
    return 1;
  }else if (n === 1){
    return b;
  }

  if (n % 2 === 0) {
    return exp_two(b, n / 2) * exp_two(b, n / 2);
  }else{
    return b * (exp_two(b, (n-1) / 2) * exp_two(b, (n-1) / 2));
  }
}

// console.log(exp_two(2, 5));

function fibonacci (n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    let prevFib = fibonacci(n - 1);
    prevFib.push(prevFib[prevFib.length - 1] + prevFib[prevFib.length - 2]);
    return prevFib;
  }
}

// console.log(fibonacci(5));

function bsearch (array, target) {
  if (array.length === 0) {
    return null;
  }else {
    let midpoint = Math.floor(array.length / 2);
    if (array[midpoint] === target) {
      return midpoint;
    }else if (array[midpoint] > target) {
      return bsearch(array.slice(0, midpoint), target);
    }else {
      if (bsearch(array.slice(midpoint + 1, array.length), target) === null) {
        return null;
      } else {
        return midpoint + 1 + bsearch(array.slice(midpoint + 1, array.length), target);
      }
    }
  }
}

// console.log(bsearch([1, 2, 3], 1));
// console.log(bsearch([2, 3, 4, 5], 3));
// console.log(bsearch([2, 4, 6, 8, 10], 6));
// console.log(bsearch([1, 3, 4, 5, 9], 5));
// console.log(bsearch([1, 2, 3, 4, 5, 6], 6) );
// console.log(bsearch([1, 2, 3, 4, 5, 6], 0));
//console.log(bsearch([1, 2, 3, 4, 5, 7], 6));

function make_changes(amount, coins) {
  let subResult = [];
  let result = [];
  let remainingAmount = amount;
  if (coins.length === 0) {
    return result;
  }
  coins.forEach (function (coin){
    while (coin <= remainingAmount) {
      remainingAmount -= coin;
      subResult.push(coin);
    }
  });
  coins.shift();
  result.push(subResult);
  let bestCombo = null;
  result = result.concat(make_changes(amount, coins));
  result.forEach((sub) => {
    if ((bestCombo === null || sub.length < bestCombo.length) && (typeof sub === "object")){
      // console.log(sub);
      // console.log(bestCombo);
      // console.log(result);
      bestCombo = sub;
    }
  });
  return [bestCombo];
}

console.log(make_changes(22, [10, 7, 1]));
