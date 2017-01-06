const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, callback) {
  if (numsLeft > 0) {
    reader.question("Enter a number to sum: ", (answer) => {
      let num = parseInt(answer);
      sum += num;
      console.log(sum);
      addNumbers(sum, numsLeft-1, callback);
    });
  }else{
    callback(sum);
    reader.close();
  }
}

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));
